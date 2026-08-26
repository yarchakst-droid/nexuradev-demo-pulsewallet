"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createCardBackTexture, createCardFrontTexture } from "@/components/hero/cardTexture";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const CARD_WIDTH = 3.2;
const CARD_HEIGHT = 2.02;
const CARD_DEPTH = 0.055;
const CARD_RADIUS = 0.15; // matches the 48px corner radius baked into the 1024x646 canvas textures

// A real rounded-rectangle outline (not a plain box) — this is what makes the
// card's silhouette actually rounded instead of faked via a transparent PNG
// corner, which only looks right dead-on and shows a sharp black box corner
// poking through the moment the card rotates off-axis.
function roundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const w = width / 2;
  const h = height / 2;
  const r = radius;
  const shape = new THREE.Shape();
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.absarc(w - r, -h + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(w, h - r);
  shape.absarc(w - r, h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-w + r, h);
  shape.absarc(-w + r, h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-w, -h + r);
  shape.absarc(-w + r, -h + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function Card() {
  const group = useRef<THREE.Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const dragRotY = useRef(0.4);
  const targetTiltX = useRef(0);
  const targetTiltZ = useRef(0);
  const currentTiltX = useRef(0);
  const currentTiltZ = useRef(0);
  const idleAngle = useRef(0);

  const [frontTex, backTex] = useMemo(() => [createCardFrontTexture(), createCardBackTexture()], []);

  // The card is one watertight geometry — a side rim plus a front and back
  // cap, merged into a single BufferGeometry with three material groups —
  // rather than three separately-positioned meshes. Three adjacent meshes
  // that only *look* seamless (their edges lined up in world space, not
  // actually welded) are exactly the setup that produces shimmer/z-fighting
  // at glancing angles: sub-pixel depth differences between two objects'
  // triangles at a shared boundary are unavoidable even when they're
  // positioned "correctly". Merging into one mesh removes the seam
  // altogether — there's no second object left to fight with.
  const cardGeometry = useMemo(() => {
    const shape = roundedRectShape(CARD_WIDTH, CARD_HEIGHT, CARD_RADIUS);

    const capGeo = new THREE.ShapeGeometry(shape, 24);
    // ShapeGeometry's auto-generated UVs are a raw copy of the shape's local
    // XY coordinates, not normalized to 0..1 — for a shape centered at the
    // origin (as roundedRectShape is) that means most UVs land outside
    // [0,1] entirely. With the texture's default clamp-to-edge wrapping,
    // only the sliver where U/V happen to fall inside [0,1] shows real
    // texture content; everything else clamps to a smeared edge-pixel bar
    // (the black margins on both sides seen before this remap). Rebuilding
    // UVs from the shape's actual bounding box makes the texture cover the
    // full face edge-to-edge.
    const pos = capGeo.attributes.position;
    const uv = capGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      uv.setXY(i, (pos.getX(i) + CARD_WIDTH / 2) / CARD_WIDTH, (pos.getY(i) + CARD_HEIGHT / 2) / CARD_HEIGHT);
    }
    uv.needsUpdate = true;

    // mergeGeometries requires every input to consistently have (or lack)
    // an index buffer — ShapeGeometry is indexed, ExtrudeGeometry isn't, so
    // left as-is the merge below throws. Expanding the cap to match the
    // rim's non-indexed form (after the UV fix, so the expansion carries
    // the corrected UVs) makes them compatible.
    const capGeoFlat = capGeo.toNonIndexed();
    capGeo.dispose();

    const frontGeo = capGeoFlat.clone().translate(0, 0, CARD_DEPTH / 2);
    // Rotating (not mirroring the UVs) is what makes the back face read in
    // normal left-to-right order once the card is physically turned around,
    // matching how createCardBackTexture() was drawn.
    const backGeo = capGeoFlat.clone().rotateY(Math.PI).translate(0, 0, -CARD_DEPTH / 2);

    const rimGeoFull = new THREE.ExtrudeGeometry(shape, { depth: CARD_DEPTH, bevelEnabled: false, steps: 1, curveSegments: 24 });
    rimGeoFull.translate(0, 0, -CARD_DEPTH / 2);
    // Keep only the side-wall faces. Note: mergeGeometries (below) ignores
    // a geometry's own .groups entirely — it always takes the WHOLE
    // attribute buffer of every input as one opaque block. Filtering via
    // clearGroups()/addGroup() here would do nothing to what actually gets
    // merged, so the extrude's own front/back cap triangles would still
    // ride along, sitting exactly where the dedicated frontGeo/backGeo caps
    // already are — real, physical overlapping geometry, not just a
    // metadata mismatch. That's what the flicker/z-fighting actually was:
    // two differently-colored materials (edge vs. front/back) both trying
    // to render the same triangles. The only way to actually drop them is
    // to slice the side-wall vertex range out into a standalone geometry
    // before merging.
    const sides = rimGeoFull.groups.find((g) => g.materialIndex === 1)!;
    const rimGeo = new THREE.BufferGeometry();
    for (const name of ["position", "normal", "uv"] as const) {
      const attr = rimGeoFull.attributes[name];
      const itemSize = attr.itemSize;
      const sliced = attr.array.slice(sides.start * itemSize, (sides.start + sides.count) * itemSize);
      rimGeo.setAttribute(name, new THREE.BufferAttribute(sliced, itemSize));
    }
    rimGeoFull.dispose();

    // Merge order fixes the material-group order used below: 0 = rim/edge,
    // 1 = front, 2 = back.
    const merged = mergeGeometries([rimGeo, frontGeo, backGeo], true)!;
    capGeoFlat.dispose();
    frontGeo.dispose();
    backGeo.dispose();
    rimGeo.dispose();
    return merged;
  }, []);

  const edgeMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#121022", metalness: 0.6, roughness: 0.35 }),
    [],
  );
  const frontMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: frontTex, metalness: 0.25, roughness: 0.45 }),
    [frontTex],
  );
  const backMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({ map: backTex, metalness: 0.25, roughness: 0.45 }),
    [backTex],
  );
  // Order must match the merge order in cardGeometry: rim, front, back.
  const materials = useMemo(
    () => [edgeMaterial, frontMaterial, backMaterial],
    [edgeMaterial, frontMaterial, backMaterial],
  );

  function handlePointerDown(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation();
    (e.target as Element).setPointerCapture?.(e.pointerId);
    dragging.current = true;
    lastX.current = e.clientX;
  }

  function handlePointerMove(e: ThreeEvent<PointerEvent>) {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    dragRotY.current += dx * 0.012;
  }

  function handlePointerUp(e: ThreeEvent<PointerEvent>) {
    dragging.current = false;
    idleAngle.current = dragRotY.current;
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  }

  useFrame((state, delta) => {
    if (!group.current) return;

    if (!dragging.current) {
      idleAngle.current += delta * 0.18;
      dragRotY.current = idleAngle.current;
    }

    targetTiltX.current = state.pointer.y * -0.16;
    targetTiltZ.current = state.pointer.x * 0.09;
    currentTiltX.current = lerp(currentTiltX.current, targetTiltX.current, 1 - Math.pow(0.001, delta));
    currentTiltZ.current = lerp(currentTiltZ.current, targetTiltZ.current, 1 - Math.pow(0.001, delta));

    group.current.rotation.y = dragRotY.current;
    group.current.rotation.x = currentTiltX.current;
    group.current.rotation.z = currentTiltZ.current;
  });

  return (
    <group
      ref={group}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    >
      <mesh geometry={cardGeometry} material={materials} castShadow receiveShadow />
    </group>
  );
}

export default function CardScene() {
  return (
    <Canvas
      // Pulled back slightly (and a touch wider FOV) versus a tight fit so the
      // card's idle spin and pointer-driven tilt both have margin before any
      // corner reaches the frustum edge — a card sized to just barely fit
      // face-on will clip the instant it rotates or tilts even a little.
      camera={{ position: [0, 0, 6.1], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.8]}
      className="cursor-grab active:cursor-grabbing"
    >
      {/*
        Manual studio-style lighting instead of drei's <Environment>: that
        component's PMREM/HDRI processing crashed the WebGL context under
        headless/software rendering during testing (and it's a network fetch
        besides). A few well-placed lights give a comparable premium "product
        shot" look on the metallic card without either risk.
      */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, 3]} intensity={0.5} color="#6d5ef8" />
      <pointLight position={[-3, 3, 4]} intensity={12} color="#8b7dff" />
      <pointLight position={[3, -2.5, 3]} intensity={8} color="#34d399" />
      <Card />
    </Canvas>
  );
}
