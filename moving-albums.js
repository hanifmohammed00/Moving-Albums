// tilt-hover.js — CSS-only cursor-tracked 3D tilt on Spotify's playlist/album
// cards. No Three.js/WebGL, no dependencies — just perspective transforms,
// throttled to requestAnimationFrame.
(function () {
  function boot() {
    if (
      !window.Spicetify ||
      !Spicetify.Platform ||
      !(document.querySelector("#main") || document.querySelector(".Root__main-view"))
    ) {
      setTimeout(boot, 60);
      return;
    }
    main();
  }

  function main() {
    const MAX_TILT = 16; // degrees
    // Spotify has changed its card class names across versions — try
    // several known selector patterns rather than betting on one.
    const CARD_SELECTOR = [
      ".main-card-card",
      "[data-testid='card-click-handler']",
      "[data-encore-id='card']",
      ".main-gridContainer-gridContainer [role='button']",
    ].join(",");
    let pending = false, lastEvent = null;

    document.body.addEventListener(
      "mousemove",
      (e) => {
        lastEvent = e;
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          handleMove(lastEvent);
        });
      },
      { passive: true }
    );

    function handleMove(e) {
      const card = e.target.closest(CARD_SELECTOR);
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.zIndex = "50";
      card.style.position = card.style.position || "relative";
      card.style.transform = `perspective(500px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) scale(1.08)`;
      card.style.boxShadow = "0 12px 30px rgba(205,245,100,0.45)";
      card.style.transition = "transform 0.05s linear, box-shadow 0.15s ease";
    }

    document.body.addEventListener("mouseout", (e) => {
      const card = e.target.closest(CARD_SELECTOR);
      if (!card) return;
      const to = e.relatedTarget;
      if (to && card.contains(to)) return;
      card.style.transform = "";
      card.style.boxShadow = "";
      card.style.transition = "transform 0.35s ease, box-shadow 0.35s ease";
    });
  }

  boot();
})();
