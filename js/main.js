/* Shakhawat Hossain — portfolio interactions
   Sticky nav, mobile menu, scroll progress, reveal-on-scroll, count-up.
   Everything degrades gracefully: content is visible even if this never runs. */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var hdr = document.getElementById("hdr");
  var prog = document.getElementById("progress");

  /* ----- sticky nav state + scroll progress ----- */
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (hdr) hdr.classList.toggle("scrolled", y > 12);
    if (prog) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- mobile menu toggle ----- */
  var toggle = document.querySelector(".nav-toggle");
  var navRight = document.getElementById("nav-right");
  if (toggle && hdr) {
    toggle.addEventListener("click", function () {
      var open = hdr.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    if (navRight) {
      navRight.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          hdr.classList.remove("nav-open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ----- reveal on scroll (staggered within a container row) ----- */
  var reveal = document.querySelectorAll("[data-reveal]");
  function doReveal(el) {
    var sibs = Array.prototype.slice.call(
      el.parentElement.querySelectorAll(":scope > [data-reveal]")
    );
    var i = Math.max(0, sibs.indexOf(el));
    el.style.transitionDelay = i * 80 + "ms";
    el.classList.add("in");
  }
  if (reduce || !("IntersectionObserver" in window)) {
    reveal.forEach(function (e) { e.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { doReveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    reveal.forEach(function (e) { io.observe(e); });
    // reveal anything already in view immediately (robust if the tab loads in the background)
    reveal.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) { doReveal(el); io.unobserve(el); }
    });
  }

  /* ----- count-up for stats ----- */
  function setFinal(el) {
    var t = (+el.dataset.count).toLocaleString();
    var s = el.dataset.suffix || "";
    if (el.querySelector("span")) el.innerHTML = "<span>" + t + "</span>" + s;
    else el.textContent = t + s;
  }
  function countUp(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || "";
    var span = el.querySelector("span");
    if (reduce) { setFinal(el); return; }
    var dur = 1100, t0 = performance.now();
    (function tick(now) {
      var p = Math.min(1, (now - t0) / dur);
      var val = Math.round((1 - Math.pow(1 - p, 3)) * target);
      var text = val.toLocaleString();
      if (span) el.innerHTML = "<span>" + text + "</span>" + suffix;
      else el.textContent = text + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !en.target.dataset.done) {
          en.target.dataset.done = "1";
          countUp(en.target);
          setTimeout(setFinal.bind(null, en.target), 1600);
          cio.unobserve(en.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
    counters.forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0 && !c.dataset.done) {
        c.dataset.done = "1"; countUp(c); setTimeout(setFinal.bind(null, c), 1600); cio.unobserve(c);
      }
    });
  } else {
    counters.forEach(setFinal);
  }

  // update footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
