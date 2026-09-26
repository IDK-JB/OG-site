/* Olivier Gaillard · interactions */

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
    var main = document.querySelector("main");
    var footer = document.querySelector(".site-footer");

    function setMenu(open, returnFocus) {
      menu.classList.toggle("open", open);
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      document.body.style.overflow = open ? "hidden" : "";
      // Menu fermé : inaccessible au clavier. Ouvert : le reste de la page l'est.
      menu.inert = !open;
      if (main) main.inert = open;
      if (footer) footer.inert = open;
      if (open) {
        var first = menu.querySelector("a");
        if (first) first.focus();
      } else if (returnFocus) {
        burger.focus();
      }
    }

    burger.addEventListener("click", function () {
      setMenu(!menu.classList.contains("open"), true);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false, false); });
    });

    document.addEventListener("keydown", function (e) {
      if (!menu.classList.contains("open")) return;
      if (e.key === "Escape") { setMenu(false, true); return; }
      // Focus piégé entre le bouton et les liens du menu
      if (e.key === "Tab") {
        var items = [burger].concat(Array.prototype.slice.call(menu.querySelectorAll("a")));
        var firstEl = items[0], lastEl = items.slice(-1)[0];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    });

    // Retour en desktop menu ouvert : on referme proprement
    window.matchMedia("(min-width: 1021px)").addEventListener("change", function (mq) {
      if (mq.matches && menu.classList.contains("open")) setMenu(false, false);
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

  /* ---------- Vidéo : bouton pause + respect du mouvement réduit ---------- */
  var video = document.querySelector(".page-hero-media video");
  var toggle = document.querySelector(".video-toggle");

  function setPaused(paused) {
    if (!video) return;
    if (paused) video.pause(); else video.play();
    if (toggle) {
      toggle.setAttribute("aria-label", paused ? "Lire la vidéo" : "Mettre la vidéo en pause");
      toggle.classList.toggle("is-paused", paused);
    }
  }

  if (video && toggle) {
    toggle.addEventListener("click", function () { setPaused(!video.paused); });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach(function (v) {
      v.removeAttribute("autoplay");
    });
    setPaused(true);
  }

  /* ---------- Formulaire de contact : validation accessible puis messagerie ---------- */
  var form = document.getElementById("contactForm");

  if (form) {
    var status = document.getElementById("form-status");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    var rules = {
      nom: function (v) { return v ? "" : "Indiquez votre nom et prénom."; },
      email: function (v) {
        if (!v) return "Indiquez votre adresse email.";
        return emailRe.test(v) ? "" : "Adresse email invalide, par exemple : julie.martin@gmail.com";
      },
      message: function (v) { return v ? "" : "Écrivez votre message."; },
    };

    function check(name) {
      var field = form.elements[name];
      var msg = rules[name](field.value.trim());
      var err = document.getElementById(name + "-error");
      err.textContent = msg;
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
      return !msg;
    }

    // Après une première erreur, le champ se revalide pendant la frappe
    Object.keys(rules).forEach(function (name) {
      form.elements[name].addEventListener("input", function () {
        if (this.getAttribute("aria-invalid") === "true") check(name);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var invalid = Object.keys(rules).filter(function (name) { return !check(name); });

      if (invalid.length) {
        status.textContent = invalid.length === 1
          ? "1 champ à corriger."
          : invalid.length + " champs à corriger.";
        form.elements[invalid[0]].focus();
        return;
      }

      var nom = form.elements.nom.value.trim();
      var sujet = "Contact site · " + nom;
      var corps =
        "Nom : " + nom + "\n" +
        "Email : " + form.elements.email.value.trim() + "\n\n" +
        "Message :\n" + form.elements.message.value.trim() + "\n";

      status.textContent = "Votre messagerie s'ouvre avec le message prêt à partir.";
      window.location.href =
        "mailto:contact@oliviergaillard.fr" +
        "?subject=" + encodeURIComponent(sujet) +
        "&body=" + encodeURIComponent(corps);
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
})();
