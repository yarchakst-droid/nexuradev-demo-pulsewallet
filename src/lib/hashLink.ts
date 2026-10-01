import type { MouseEvent } from "react";

/**
 * next/link only re-triggers its scroll-to-hash behavior when the target
 * hash differs from the current URL, so clicking the same in-page anchor
 * twice in a row (e.g. after scrolling away and back) does nothing on the
 * second click. Scroll manually instead, on every click.
 */
export function scrollToHash(id: string) {
  return (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };
}
