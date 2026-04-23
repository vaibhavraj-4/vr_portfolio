/* ============================================================================
   particles-config.js — responsive & battery-aware
   Same visual style as before (white dots + linked lines on dark bg)
   but: fewer particles on phones, slower speed, respects prefers-reduced-motion.
   ============================================================================ */

(function () {
  "use strict";

  // Wait for particlesJS to be available
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    if (typeof particlesJS === "undefined") {
      console.warn("particles.js not loaded");
      return;
    }

    // Feature detection
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    var isSmallPhone = window.matchMedia("(max-width: 480px)").matches;
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Particle count tiers
    var particleCount = 80; // desktop default
    var speed = 6;
    var linkDistance = 150;

    if (isMobile) {
      particleCount = 40; // half as many on mobile
      speed = 3; // slower = calmer + battery-friendly
      linkDistance = 120;
    }
    if (isSmallPhone) {
      particleCount = 25; // even fewer on small phones
      speed = 2;
      linkDistance = 100;
    }
    if (prefersReducedMotion) {
      particleCount = 20;
      speed = 0; // essentially static
    }

    particlesJS("particles-js", {
      particles: {
        number: {
          value: particleCount,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 5 },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: linkDistance,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: speed > 0,
          speed: speed,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          // Disable hover on touch devices (causes weird jumpy behavior)
          onhover: {
            enable: !isMobile,
            mode: "repulse",
          },
          // Disable click-to-push on mobile (would add particles on every tap)
          onclick: {
            enable: !isMobile,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: { distance: 400, line_linked: { opacity: 1 } },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: { distance: 200, duration: 0.4 },
          push: { particles_nb: 4 },
          remove: { particles_nb: 2 },
        },
      },
      retina_detect: true,
    });

    // Pause particles when tab is hidden (saves battery dramatically)
    document.addEventListener("visibilitychange", function () {
      var pJS = window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;
      if (!pJS) return;
      if (document.hidden) {
        pJS.particles.move.enable = false;
      } else if (!prefersReducedMotion) {
        pJS.particles.move.enable = true;
      }
    });
  });
})();
