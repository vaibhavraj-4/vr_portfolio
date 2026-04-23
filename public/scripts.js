/* ============================================================================
   scripts.js — Single-page portfolio
   Handles: scroll-spy nav, mobile drawer, typed.js intro, image zoom modal,
   back-to-top button, social-sidebar fade on scroll, AOS init.
   ============================================================================ */

(function () {
  "use strict";

  // ---- Run once DOM is ready ----
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    initAOS();
    initTyped();
    initMobileNav();
    initScrollSpy();
    initBackToTop();
    initSocialSidebar();
    initModal();
    initHeaderShadow();
    consoleSignature();
  });

  /* ----------------------------------------------------------------------
     1. AOS (Animate On Scroll)
     ---------------------------------------------------------------------- */
  function initAOS() {
    window.addEventListener("load", function () {
      if (typeof AOS !== "undefined") {
        AOS.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 60,
          disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
      }
    });
  }

  /* ----------------------------------------------------------------------
     2. Typed.js rotating intro
     ---------------------------------------------------------------------- */
  function initTyped() {
    if (typeof Typed === "undefined") return;
    var target = document.getElementById("typed-output");
    if (!target) return;

    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      target.textContent = "AI/ML Engineer @ ATH Infosystems";
      return;
    }

    new Typed("#typed-output", {
      strings: [
        "Hello! I'm Vaibhav Raj.",
        "AI/ML Engineer @ ATH Infosystems.",
        "Currently shipping SINTRA analytics.",
        "I build production data systems.",
      ],
      typeSpeed: 55,
      backSpeed: 25,
      backDelay: 1400,
      startDelay: 300,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ----------------------------------------------------------------------
     3. Mobile drawer toggle
     ---------------------------------------------------------------------- */
  function initMobileNav() {
    var toggle = document.getElementById("navToggle");
    var drawer = document.getElementById("mobileDrawer");
    if (!toggle || !drawer) return;

    function closeDrawer() {
      drawer.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      var isOpen = drawer.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      drawer.setAttribute("aria-hidden", String(!isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close drawer when any link inside it is clicked
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });

    // Close on ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        closeDrawer();
      }
    });
  }

  /* ----------------------------------------------------------------------
     4. Scroll-spy: highlight the nav link for the section currently in view
     ---------------------------------------------------------------------- */
  function initScrollSpy() {
    var sections = document.querySelectorAll(
      "section[id]"
    );
    var navLinks = document.querySelectorAll("[data-nav]");
    if (!sections.length || !navLinks.length) return;

    function setActive(id) {
      navLinks.forEach(function (link) {
        if (link.getAttribute("data-nav") === id) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }

    // IntersectionObserver: whichever section is most in view wins
    var observer = new IntersectionObserver(
      function (entries) {
        // Find the entry with highest intersection ratio that's intersecting
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });

        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px", // require section to be near viewport center
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach(function (s) {
      observer.observe(s);
    });

    // Update URL hash when a nav link is clicked (smooth scroll handled by CSS)
    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setActive(link.getAttribute("data-nav"));
      });
    });
  }

  /* ----------------------------------------------------------------------
     5. Back-to-top button
     ---------------------------------------------------------------------- */
  function initBackToTop() {
    var btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > window.innerHeight * 0.8) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ----------------------------------------------------------------------
     6. Social sidebar: fade out when user scrolls past hero
     ---------------------------------------------------------------------- */
  function initSocialSidebar() {
    var sidebar = document.querySelector(".social-sidebar");
    var hero = document.getElementById("hero");
    if (!sidebar || !hero) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            sidebar.classList.remove("hidden");
          } else {
            sidebar.classList.add("hidden");
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(hero);

    // Smooth transition
    sidebar.style.transition = "opacity 0.4s ease";
  }

  /* ----------------------------------------------------------------------
     7. Image zoom modal — ESC, click-outside, focus management
     ---------------------------------------------------------------------- */
  function initModal() {
    var modal = document.getElementById("myModal");
    if (!modal) return;

    var modalImg = document.getElementById("modalImage");
    var modalCaption = document.getElementById("modal-caption");
    var closeBtn = modal.querySelector(".close");
    var lastFocus = null;

    function openModal(src, caption) {
      lastFocus = document.activeElement;
      modalImg.src = src;
      modalImg.alt = caption || "Enlarged image";
      if (modalCaption) modalCaption.textContent = caption || "";
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      setTimeout(function () {
        modalImg.src = "";
        if (modalCaption) modalCaption.textContent = "";
      }, 300);
      if (lastFocus) lastFocus.focus();
    }

    // Wire up every .zoomable image
    document.querySelectorAll(".zoomable").forEach(function (img) {
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", "Enlarge image");

      img.addEventListener("click", function () {
        openModal(this.src, this.alt);
      });
      img.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(this.src, this.alt);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });
  }

  /* ----------------------------------------------------------------------
     8. Header shadow — subtle elevation cue on scroll
     ---------------------------------------------------------------------- */
  function initHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 30) {
          header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.25)";
        } else {
          header.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.15)";
        }
      },
      { passive: true }
    );
  }

  /* ----------------------------------------------------------------------
     9. Console signature
     ---------------------------------------------------------------------- */
  function consoleSignature() {
    if (window.console && console.log) {
      console.log(
        "%c Vaibhav Raj — AI/ML Engineer ",
        "background: #000; color: #f9f1e9; padding: 6px 12px; font-size: 14px;"
      );
      console.log(
        "%c Like what you see? Let's talk → vaibhavraj4149@gmail.com ",
        "color: #888; font-size: 12px;"
      );
    }
  }
})();
