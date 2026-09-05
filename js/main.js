/* ============================================================
   1 Solutions — shared behaviour
   - mobile nav toggle
   - lead form -> WhatsApp hand-off (no backend)
   - testimonial slider
   - FAQ accordion
   ============================================================ */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "916291413559"; // 1 Solutions WhatsApp

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("is-open");
    });
  }

  /* ---------- Lead form -> WhatsApp ---------- */
  var forms = document.querySelectorAll("form[data-wa-form]");
  Array.prototype.forEach.call(forms, function (form) {
    var fields = {
      name: form.querySelector('[name="name"]'),
      phone: form.querySelector('[name="phone"]'),
      email: form.querySelector('[name="email"]'),
      service: form.querySelector('[name="service"]')
    };
    var honey = form.querySelector('[name="company"]'); // honeypot

    function setError(input, on) {
      var wrap = input.closest(".field");
      if (wrap) wrap.classList.toggle("field--invalid", !!on);
    }

    function validate() {
      var ok = true;
      if (!fields.name.value.trim()) { setError(fields.name, true); ok = false; } else setError(fields.name, false);

      var digits = fields.phone.value.replace(/\D/g, "");
      if (digits.length !== 10) { setError(fields.phone, true); ok = false; } else setError(fields.phone, false);

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim());
      if (!emailOk) { setError(fields.email, true); ok = false; } else setError(fields.email, false);

      if (!fields.service.value) { setError(fields.service, true); ok = false; } else setError(fields.service, false);

      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (honey && honey.value) return; // bot
      if (!validate()) {
        var firstBad = form.querySelector(".field--invalid input, .field--invalid select");
        if (firstBad) firstBad.focus();
        return;
      }

      var msg =
        "Hi 1 Solutions, I'd like a free consultation.\n" +
        "Name: " + fields.name.value.trim() + "\n" +
        "Phone: +91 " + fields.phone.value.replace(/\D/g, "") + "\n" +
        "Email: " + fields.email.value.trim() + "\n" +
        "Service: " + fields.service.value;

      var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
      window.open(url, "_blank", "noopener");

      var done = form.querySelector(".form-done");
      if (done) done.hidden = false;
      form.reset();
    });

    // clear error as the user types
    Object.keys(fields).forEach(function (k) {
      fields[k].addEventListener("input", function () { setError(fields[k], false); });
      fields[k].addEventListener("change", function () { setError(fields[k], false); });
    });
  });

  /* ---------- Pre-select a service (from services page cards) ---------- */
  var params = new URLSearchParams(window.location.search);
  var preset = params.get("service");
  if (preset) {
    var sel = document.querySelector('form[data-wa-form] [name="service"]');
    if (sel) {
      Array.prototype.forEach.call(sel.options, function (o) {
        if (o.value.toLowerCase() === preset.toLowerCase()) sel.value = o.value;
      });
    }
  }

  /* ---------- Testimonial slider ---------- */
  var track = document.getElementById("tst-track");
  if (track) {
    var items = track.children.length;
    var idx = 0;
    var prev = document.querySelector('[data-tst="prev"]');
    var next = document.querySelector('[data-tst="next"]');
    var dotsWrap = document.getElementById("tst-dots");
    var dots = [];
    var timer;

    if (dotsWrap) {
      for (var i = 0; i < items; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Go to testimonial " + (i + 1));
        (function (n) { dot.addEventListener("click", function () { go(n); }); })(i);
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    function render() {
      track.style.transform = "translateX(" + (-idx * 100) + "%)";
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === idx); });
    }
    function go(n) { idx = (n + items) % items; render(); }
    function start() { timer = setInterval(function () { go(idx + 1); }, 6000); }
    function stop() { clearInterval(timer); }

    if (next) next.addEventListener("click", function () { go(idx + 1); });
    if (prev) prev.addEventListener("click", function () { go(idx - 1); });
    render();

    var slider = track.closest(".tst-slider");
    if (slider) {
      slider.addEventListener("mouseenter", stop);
      slider.addEventListener("mouseleave", start);
    }
    start();
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  Array.prototype.forEach.call(faqItems, function (item) {
    var q = item.querySelector(".faq-q");
    var a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", function () {
      var open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", open ? "true" : "false");
      a.style.maxHeight = open ? a.scrollHeight + "px" : null;
    });
  });

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
