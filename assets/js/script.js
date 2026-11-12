/* ==========================================================================
   POSHANA — site behaviour
   Plain JavaScript, no dependencies beyond Bootstrap's bundle.
   ========================================================================== */
(function () {
  "use strict";

  // Flag that JS is running so CSS can safely hide .reveal elements.
  document.documentElement.classList.add("js");

  document.addEventListener("DOMContentLoaded", function () {
    initHeader();
    initActiveNav();
    initSmoothScroll();
    initReveal();
    initBackToTop();
    initImageFallbacks();
    initForms();
    setYear();
  });

  /* Sticky header gains a shadow once the page scrolls ------------------- */
  function initHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Highlight the nav link for the current page / visible section -------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".navbar .nav-link"));
    var page = location.pathname.split("/").pop() || "index.html";

    // Page-level match (links without a hash).
    links.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (href.indexOf("#") === -1 && href === page) setActive(link);
    });

    // Section-level match on the homepage.
    if (page !== "index.html" || !("IntersectionObserver" in window)) return;
    var sectionLinks = links.filter(function (l) {
      var h = l.getAttribute("href") || "";
      return h.indexOf("#") > -1 && (h.indexOf("index.html") === 0 || h.charAt(0) === "#");
    });
    var map = {};
    sectionLinks.forEach(function (l) {
      var id = l.getAttribute("href").split("#")[1];
      if (document.getElementById(id)) map[id] = l;
    });
    var homeLink = links.filter(function (l) { return l.getAttribute("href") === "index.html"; })[0];

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) setActive(map[entry.target.id]);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { observer.observe(document.getElementById(id)); });

    var top = document.getElementById("top");
    if (top && homeLink) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setActive(homeLink);
      }, { rootMargin: "-45% 0px -50% 0px" }).observe(top);
    }

    function setActive(link) {
      links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  }

  /* Smooth scroll for same-page anchors; closes the mobile menu ---------- */
  function initSmoothScroll() {
    var collapseEl = document.getElementById("mainNav");

    document.addEventListener("click", function (e) {
      var link = e.target.closest("a[href]");
      if (!link) return;

      var href = link.getAttribute("href");
      var hashIndex = href.indexOf("#");
      if (hashIndex === -1) return closeMenu(link);

      var path = href.slice(0, hashIndex);
      var id = href.slice(hashIndex + 1);
      var current = location.pathname.split("/").pop() || "index.html";
      var samePage = path === "" || path === current;
      if (!samePage || !id) return closeMenu(link);

      var target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      closeMenu(link);
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
      history.pushState(null, "", "#" + id);
    });

    function closeMenu(link) {
      if (!collapseEl || !link.closest("#mainNav")) return;
      if (collapseEl.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    }
  }

  /* Fade-up on scroll ----------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* Back-to-top button ---------------------------------------------------- */
  function initBackToTop() {
    var btn = document.querySelector(".back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  }

  /* If a photo fails to load, show a soft sage tile instead of a broken icon */
  function initImageFallbacks() {
    document.querySelectorAll("img").forEach(function (img) {
      var fail = function () {
        img.classList.add("is-broken");
        if (img.parentElement) img.parentElement.classList.add("img-fallback");
      };
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
      else img.addEventListener("error", fail, { once: true });
    });
  }

  /* Front-end form validation (no backend is connected yet) -------------- */
  function initForms() {
    document.querySelectorAll("form.needs-validation").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          var firstInvalid = form.querySelector(":invalid");
          if (firstInvalid) firstInvalid.focus();
          return;
        }
        form.classList.remove("was-validated");
        var success = form.querySelector(".form-success");
        if (success) {
          success.classList.add("show");
          success.focus();
        }
        form.reset();
      });
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
})();
