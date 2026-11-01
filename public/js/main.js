/* Olivier Gaillard, interactions */

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
      // Le bandeau est inséré après ce script : on le cherche au moment de l'ouverture
      var consent = document.getElementById("consent");
      if (consent) consent.inert = open;
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

  /* ---------- Avis : boucle de défilement ---------- */
  /* La seconde copie ne sert que la boucle visuelle : clonée en JS (source HTML
     propre pour le SEO) et masquée des lecteurs d'écran. En mouvement réduit,
     pas de copie : la rangée devient scrollable manuellement (voir CSS). */
  var avisTrack = document.getElementById("avisTrack");
  var avisList = document.getElementById("avisList");
  var avisToggle = document.querySelector(".avis-toggle");
  var motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setAvisPaused(paused) {
    if (!avisTrack || !avisToggle) return;
    avisTrack.classList.toggle("is-paused", paused);
    avisToggle.classList.toggle("is-paused", paused);
    avisToggle.setAttribute("aria-pressed", paused ? "true" : "false");
    avisToggle.setAttribute(
      "aria-label",
      paused ? "Relancer le défilement des avis" : "Mettre le défilement des avis en pause"
    );
    var label = avisToggle.querySelector(".avis-toggle-text");
    if (label) label.textContent = paused ? "Lecture" : "Pause";
  }

  function syncAvis() {
    if (!avisTrack || !avisList) return;
    var clone = document.getElementById("avisListClone");
    var viewport = avisTrack.parentElement;
    if (motionMq.matches) {
      if (clone) clone.remove();
      setAvisPaused(false);
      if (viewport) viewport.setAttribute("tabindex", "0");
    } else {
      if (!clone) {
        clone = avisList.cloneNode(true);
        clone.id = "avisListClone";
        clone.setAttribute("aria-hidden", "true");
        // Pas inert : « Lire l'avis complet » doit rester cliquable à la souris
        clone.querySelectorAll("button").forEach(function (b) { b.tabIndex = -1; });
        avisTrack.appendChild(clone);
      }
      if (viewport) viewport.removeAttribute("tabindex");
    }
  }

  if (avisTrack && avisList) {
    if (avisToggle) {
      avisToggle.addEventListener("click", function () {
        setAvisPaused(!avisTrack.classList.contains("is-paused"));
      });
    }
    syncAvis();
    motionMq.addEventListener("change", syncAvis);
  }

  /* ---------- Avis : lecture complète d'un avis long ---------- */
  var avisDialog = document.getElementById("avisDialog");

  if (avisTrack && avisDialog) {
    var avisDialogBody = avisDialog.querySelector(".avis-dialog-body");

    avisTrack.addEventListener("click", function (e) {
      var more = e.target.closest(".avis-more");
      if (!more) return;
      var card = more.closest(".avis-card");
      // Une carte du clone renvoie à sa jumelle de la liste d'origine
      var source = avisList.children[Array.prototype.indexOf.call(card.parentElement.children, card)];
      avisDialogBody.innerHTML = "";
      ["avis-quote", "avis-author", "avis-meta"].forEach(function (cls) {
        avisDialogBody.appendChild(source.querySelector("." + cls).cloneNode(true));
      });
      avisDialogBody.querySelector(".avis-author").id = "avisDialogAuteur";
      avisDialog.showModal();
    });

    avisDialog.querySelector(".avis-dialog-close").addEventListener("click", function () {
      avisDialog.close();
    });
    // Clic sur le voile : fermeture
    avisDialog.addEventListener("click", function (e) {
      if (e.target === avisDialog) avisDialog.close();
    });
  }

  /* ---------- Vidéo : bouton pause, lecture auto seulement sur grand écran ---------- */
  /* Pas de lecture automatique (poster seul, rien n'est téléchargé) en mouvement
     réduit, en économie de données ou sous 768 px de large. Le bouton reste
     utilisable pour lancer la vidéo à la demande. */
  var video = document.querySelector(".page-hero-media video");
  var toggle = document.querySelector(".video-toggle");

  function syncToggle() {
    if (!video || !toggle) return;
    var paused = video.paused;
    toggle.setAttribute("aria-label", paused ? "Lire la vidéo" : "Mettre la vidéo en pause");
    toggle.classList.toggle("is-paused", paused);
  }

  function playVideo() {
    var p = video.play();
    if (p && p.catch) p.catch(syncToggle);
  }

  if (video) {
    video.addEventListener("play", syncToggle);
    video.addEventListener("pause", syncToggle);
    if (toggle) {
      toggle.addEventListener("click", function () {
        if (video.paused) playVideo(); else video.pause();
      });
    }
    var conn = navigator.connection;
    var noAutoplay =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(prefers-reduced-data: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches ||
      !!(conn && conn.saveData);
    if (video.hasAttribute("data-autoplay") && !noAutoplay) playVideo();
    syncToggle();
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
