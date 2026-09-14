/* Olivier Gaillard — interactions */

(function () {
  "use strict";

  /* Progressive enhancement : les reveals ne masquent le contenu que si le JS tourne */
  document.documentElement.classList.add("js");

  /* ---------- Header au scroll ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".mobile-menu");

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Vidéo : respect du mouvement réduit ---------- */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach(function (v) {
      v.pause();
      v.removeAttribute("autoplay");
    });
  }

  /* ---------- Léger parallax hero ---------- */
  var heroImg = document.querySelector(".hero-media img");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (heroImg && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight) {
            heroImg.style.transform = "scale(1.02) translateY(" + y * 0.18 + "px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Formulaire de contact → mail ---------- */
  var form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nom = form.nom.value.trim();
      var email = form.email.value.trim();
      var objectif = form.objectif.value;
      var message = form.message.value.trim();

      var sujet = "Contact site — " + nom + " (" + objectif + ")";
      var corps =
        "Nom : " + nom + "\n" +
        "Email : " + email + "\n" +
        "Objectif : " + objectif + "\n\n" +
        "Message :\n" + message + "\n";

      window.location.href =
        "mailto:contact@oliviergaillard.fr" +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);
    });
  }
})();
