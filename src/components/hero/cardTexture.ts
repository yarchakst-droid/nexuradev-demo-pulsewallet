import * as THREE from "three";

const W = 1024;
const H = 646;

// The card's geometry (see CardScene.tsx) is already a real rounded-rect
// silhouette, so this clip isn't load-bearing for the corners anymore — it's
// kept because every face is still a plain rectangular canvas, and clipping
// to the same rounded-rect keeps the drawn content from bleeding past the
// mesh's curved edge at the pixel level.
function baseGradient(ctx: CanvasRenderingContext2D) {
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0b0a18");
  g.addColorStop(0.55, "#151233");
  g.addColorStop(1, "#1d1948");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // soft diagonal sheen
  const sheen = ctx.createLinearGradient(0, 0, W, H * 0.6);
  sheen.addColorStop(0, "rgba(255,255,255,0.07)");
  sheen.addColorStop(0.4, "rgba(255,255,255,0)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, W, H);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawLogo(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = "#8b7dff";
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(10, 0);
  ctx.lineTo(15, -13);
  ctx.lineTo(24, 20);
  ctx.lineTo(29, 0);
  ctx.lineTo(46, 0);
  ctx.stroke();
  ctx.restore();
}

function drawWordmark(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#f3f4f8";
  ctx.font = "600 30px 'Plus Jakarta Sans', 'Segoe UI', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("PulseWallet", x, y);
}

function drawChip(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const w = 92;
  const h = 68;
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, "#f2d998");
  g.addColorStop(1, "#c9a24f");
  ctx.fillStyle = g;
  roundRect(ctx, x, y, w, h, 10);
  ctx.fill();

  ctx.strokeStyle = "rgba(20,15,0,0.35)";
  ctx.lineWidth = 1.5;
  for (const fx of [x + w * 0.33, x + w * 0.66]) {
    ctx.beginPath();
    ctx.moveTo(fx, y + 6);
    ctx.lineTo(fx, y + h - 6);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(x + 6, y + h * 0.5);
  ctx.lineTo(x + w - 6, y + h * 0.5);
  ctx.stroke();
  roundRect(ctx, x + w * 0.22, y + h * 0.28, w * 0.56, h * 0.44, 5);
  ctx.stroke();
}

function drawContactless(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (const r of [14, 22, 30]) {
    ctx.beginPath();
    ctx.arc(x, y, r, -0.75, 0.75);
    ctx.stroke();
  }
}

function drawNumber(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = "#eceefc";
  ctx.font = "500 42px 'IBM Plex Mono', monospace";
  ctx.textBaseline = "middle";
  ctx.fillText("••••  ••••  ••••  4821", x, y);
}

function drawSmallLabel(ctx: CanvasRenderingContext2D, label: string, value: string, x: number, y: number) {
  ctx.fillStyle = "rgba(243,244,248,0.45)";
  ctx.font = "500 15px 'Plus Jakarta Sans', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
  ctx.fillStyle = "#f3f4f8";
  ctx.font = "600 22px 'IBM Plex Mono', monospace";
  ctx.fillText(value, x, y + 30);
}

function drawNetworkMark(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.globalCompositeOperation = "screen";
  ctx.fillStyle = "rgba(139,125,255,0.85)";
  ctx.beginPath();
  ctx.arc(x, y, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(52,211,153,0.75)";
  ctx.beginPath();
  ctx.arc(x + 28, y, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

export function createCardFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  roundRect(ctx, 0, 0, W, H, 48);
  ctx.clip();

  baseGradient(ctx);
  drawLogo(ctx, 56, 66, 1);
  drawWordmark(ctx, 116, 66);
  drawChip(ctx, 56, 210);
  drawContactless(ctx, 200, 244);
  drawNumber(ctx, 56, 380);
  drawSmallLabel(ctx, "CARDHOLDER", "ALEX MORGAN", 56, 500);
  drawSmallLabel(ctx, "EXPIRES", "09/29", 420, 500);
  drawNetworkMark(ctx, 880, 540);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}

export function createCardBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.save();
  roundRect(ctx, 0, 0, W, H, 48);
  ctx.clip();

  baseGradient(ctx);

  ctx.fillStyle = "#0a0912";
  ctx.fillRect(0, 70, W, 96);

  const panelX = 56;
  const panelY = 220;
  const panelW = 560;
  const panelH = 64;
  ctx.fillStyle = "rgba(243,244,248,0.9)";
  roundRect(ctx, panelX, panelY, panelW, panelH, 6);
  ctx.fill();
  ctx.fillStyle = "rgba(10,9,18,0.55)";
  ctx.font = "italic 500 24px 'Plus Jakarta Sans', sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("Authorized signature", panelX + 18, panelY + panelH / 2);

  const cvvX = panelX + panelW + 24;
  ctx.fillStyle = "rgba(243,244,248,0.9)";
  roundRect(ctx, cvvX, panelY, 80, panelH, 6);
  ctx.fill();
  ctx.fillStyle = "#0a0912";
  ctx.font = "600 26px 'IBM Plex Mono', monospace";
  ctx.textAlign = "center";
  ctx.fillText("•••", cvvX + 40, panelY + panelH / 2 + 2);
  ctx.textAlign = "left";

  ctx.fillStyle = "rgba(243,244,248,0.35)";
  ctx.font = "400 15px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("PulseWallet Financial Technologies Inc. - a demo card for a demo product.", 56, 340);
  ctx.fillText("This card does not process real transactions.", 56, 364);

  drawLogo(ctx, 56, 560, 0.8);
  ctx.fillStyle = "rgba(243,244,248,0.5)";
  ctx.font = "600 22px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText("PulseWallet", 108, 560);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  return texture;
}
