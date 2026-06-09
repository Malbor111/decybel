/* =========================================================================
   Mix i Master — wspólny JS
   - mobilna nawigacja (hamburger)
   - animacje wejścia (IntersectionObserver + prefers-reduced-motion)
   - podświetlanie aktywnej pozycji w spisie treści (scroll spy)
   Brak zewnętrznych bibliotek. Wszystko progressive-enhancement:
   strona działa również z wyłączonym JS.
   ========================================================================= */
(function () {
  "use strict";

  /* ---- 1. Mobilna nawigacja ------------------------------------------ */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.getAttribute("data-open") === "true";
      links.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    // Zamknij menu po kliknięciu w link (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    // Zamknij menu klawiszem Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.getAttribute("data-open") === "true") {
        links.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---- 2. Animacje wejścia -------------------------------------------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealables = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    // Bez animacji — od razu pokaż wszystko
    revealables.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- 3. Scroll spy dla spisu treści (TOC) --------------------------- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    var headings = [];

    tocLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var heading = document.getElementById(id);
      if (heading) {
        map[id] = link;
        headings.push(heading);
      }
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove("is-active"); });
          var active = map[entry.target.id];
          if (active) { active.classList.add("is-active"); }
        }
      });
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

    headings.forEach(function (h) { spy.observe(h); });
  }

  /* ---- 4. Rok w stopce (gdyby trzeba było aktualizować) --------------- */
  // Stałe © 2026 zgodnie ze specyfikacją; pozostawiamy statycznie w HTML.

  /* ---- 5. Interaktywny editorial preview -------------------------------- */
  var compactCards = document.querySelectorAll('.card--compact');

  compactCards.forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.card__more') || e.target.closest('.card__link')) {
        window.location.href = card.dataset.href;
        return;
      }

      e.preventDefault();

      var img   = card.dataset.img;
      var webp  = card.dataset.webp;
      var alt   = card.dataset.alt;
      var tag   = card.dataset.tag;
      var time  = card.dataset.time;
      var title = card.dataset.title;
      var desc  = card.dataset.desc;
      var href  = card.dataset.href;

      var featImg    = document.getElementById('featured-img');
      var featSource = document.getElementById('featured-source');
      if (featImg)    { featImg.src = img; featImg.alt = alt; }
      if (featSource) { featSource.srcset = webp || ''; }

      var elTag   = document.getElementById('featured-tag');
      var elTime  = document.getElementById('featured-time');
      var elTitle = document.getElementById('featured-title');
      var elDesc  = document.getElementById('featured-desc');
      var elLinkT = document.getElementById('featured-link-title');
      var elLinkM = document.getElementById('featured-link-more');

      if (elTag)   elTag.textContent   = tag;
      if (elTime)  elTime.textContent  = time;
      if (elTitle) elTitle.textContent = title;
      if (elDesc)  elDesc.textContent  = desc;
      if (elLinkT) elLinkT.href        = href;
      if (elLinkM) elLinkM.href        = href;

      compactCards.forEach(function(c) { c.classList.remove('card--active'); });
      card.classList.add('card--active');

      var featured = document.querySelector('.card--featured');
      if (featured) {
        featured.classList.add('featured--updating');
        setTimeout(function() { featured.classList.remove('featured--updating'); }, 300);
      }
    });
  });

  /* ---- 6. Animacja VU-metra na canvasie -------------------------------- */
  var vuCanvas = document.getElementById("vu-canvas");
  if (vuCanvas && vuCanvas.getContext) {
    var ctx = vuCanvas.getContext("2d");
    var BAR_COUNT = 40;
    var SEG_COUNT = 20;       // segmentów na słupek
    var SEG_GAP   = 1;        // px przerwa między segmentami
    var TICK_MS   = 220;      // co ile ms zmiana wartości
    var PEAK_FALL_MS = 500;   // co ile ms peak opada o 1 seg

    // Kolory segmentów wg progu (od dołu)
    var COL_GREEN  = "#4DCC6A";
    var COL_YELLOW = "#F5C518";
    var COL_RED    = "#E05C5C";
    var COL_PEAK   = "rgba(255,255,255,0.5)";
    var COL_BG     = "#0D1117";

    var GREEN_END  = Math.round(SEG_COUNT * 0.60); // segmenty 0..12 = zielone
    var YELLOW_END = Math.round(SEG_COUNT * 0.85); // segmenty 13..17 = żółte

    // Stan słupków
    var levels = [];   // aktualna wysokość w segmentach (0..SEG_COUNT)
    var peaks  = [];   // peak marker w segmentach
    var i;
    for (i = 0; i < BAR_COUNT; i++) {
      levels[i] = Math.floor(Math.random() * SEG_COUNT);
      peaks[i]  = levels[i];
    }

    function segColor(seg) {
      if (seg < GREEN_END)  return COL_GREEN;
      if (seg < YELLOW_END) return COL_YELLOW;
      return COL_RED;
    }

    function draw() {
      var W = vuCanvas.width;
      var H = vuCanvas.height;

      // Przelicz canvas na rzeczywistą szerokość elementu (CSS width: 100%)
      var dpr = window.devicePixelRatio || 1;
      var cssW = vuCanvas.offsetWidth;
      var cssH = vuCanvas.offsetHeight;
      if (cssW > 0 && (vuCanvas.width !== Math.round(cssW * dpr) || vuCanvas.height !== Math.round(cssH * dpr))) {
        vuCanvas.width  = Math.round(cssW * dpr);
        vuCanvas.height = Math.round(cssH * dpr);
        ctx.scale(dpr, dpr);
        W = cssW;
        H = cssH;
      } else {
        W = vuCanvas.width  / dpr;
        H = vuCanvas.height / dpr;
      }

      ctx.fillStyle = COL_BG;
      ctx.fillRect(0, 0, W, H);

      var totalGap = (BAR_COUNT - 1) * 2;  // 2px przerwa między słupkami
      var barW = (W - totalGap) / BAR_COUNT;
      var segH = (H - (SEG_COUNT - 1) * SEG_GAP) / SEG_COUNT;

      for (var b = 0; b < BAR_COUNT; b++) {
        var x = b * (barW + 2);
        var lit = levels[b];

        for (var s = 0; s < SEG_COUNT; s++) {
          // s=0 to dół, s=SEG_COUNT-1 to góra
          var y = H - (s + 1) * segH - s * SEG_GAP;

          if (s < lit) {
            ctx.fillStyle = segColor(s);
          } else {
            // ciemna wersja koloru
            ctx.fillStyle = "rgba(255,255,255,0.04)";
          }
          ctx.fillRect(x, y, barW, segH);
        }

        // Peak marker
        var pk = peaks[b];
        if (pk > 0 && pk < SEG_COUNT) {
          var py = H - (pk + 1) * segH - pk * SEG_GAP;
          ctx.fillStyle = COL_PEAK;
          ctx.fillRect(x, py, barW, 1);
        }
      }
    }

    // Aktualizacja wartości co TICK_MS
    setInterval(function () {
      for (var b = 0; b < BAR_COUNT; b++) {
        // tylko 35% słupków dostaje nową wartość, reszta trzyma poprzednią
        if (Math.random() > 0.35) continue;
        levels[b] = Math.floor(Math.random() * SEG_COUNT);
        if (levels[b] > peaks[b]) {
          peaks[b] = levels[b];
        }
      }
      draw();
    }, TICK_MS);

    // Opadanie peak markera co PEAK_FALL_MS
    setInterval(function () {
      for (var b = 0; b < BAR_COUNT; b++) {
        if (peaks[b] > 0) peaks[b]--;
      }
    }, PEAK_FALL_MS);

    // Pierwsze rysowanie
    draw();

    // Przerysuj po resize (canvas musi odświeżyć wymiary)
    window.addEventListener("resize", draw);
  }

  /* ---- 7. Animowane spektrum jako separator ----------------------------- */
  (function () {
    var canvases = document.querySelectorAll(".spectrum-canvas");
    if (!canvases.length) return;

    var BAR_COUNT = 72;
    var now = performance.now();

    // Parametry dla każdego słupka: faza, prędkość, amplituda, szerokość, kolor
    var bars = [];
    for (var i = 0; i < BAR_COUNT; i++) {
      var t = i / BAR_COUNT; // 0..1 — pozycja w paśmie
      // Bas: 0..0.25, Mid: 0.25..0.65, Hi: 0.65..1
      var isBas = t < 0.25;
      var isMid = t >= 0.25 && t < 0.65;
      bars.push({
        phase:  Math.random() * Math.PI * 2,
        speed:  isBas ? (0.4 + Math.random() * 0.5) : isMid ? (0.8 + Math.random() * 0.8) : (1.4 + Math.random() * 1.6),
        amp:    isBas ? (0.5 + Math.random() * 0.4) : isMid ? (0.35 + Math.random() * 0.45) : (0.15 + Math.random() * 0.35),
        base:   isBas ? (0.2 + Math.random() * 0.15) : isMid ? (0.1 + Math.random() * 0.12) : (0.04 + Math.random() * 0.08),
        color:  isBas ? "#E05C5C" : isMid ? "#F5C518" : "#4DCC6A",
        width:  isBas ? 1.4 : isMid ? 1.0 : 0.7
      });
    }

    function drawSpectrum(canvas, ts) {
      var dpr = window.devicePixelRatio || 1;
      var cssW = canvas.offsetWidth;
      var cssH = canvas.offsetHeight || 60;
      if (cssW === 0) return;

      if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
        canvas.width  = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
      }

      var ctx = canvas._ctx || (canvas._ctx = canvas.getContext("2d"));
      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, cssW, cssH);

      var slotW = cssW / BAR_COUNT;
      var t = ts / 1000;

      for (var i = 0; i < BAR_COUNT; i++) {
        var b = bars[i];
        var val = b.base + b.amp * (0.5 + 0.5 * Math.sin(t * b.speed + b.phase));
        val = Math.min(1, Math.max(0, val));
        var barH = val * cssH;
        var x = i * slotW + (slotW - b.width) / 2;

        // Gradient pionowy: ciemniejszy u góry
        var grad = ctx.createLinearGradient(0, cssH - barH, 0, cssH);
        grad.addColorStop(0, b.color + "99"); // ~60% opacity u góry
        grad.addColorStop(1, b.color + "CC"); // ~80% opacity u dołu
        ctx.fillStyle = grad;
        ctx.fillRect(x, cssH - barH, b.width, barH);
      }

      ctx.restore();
    }

    function animateSpectrums(ts) {
      canvases.forEach(function (c) { drawSpectrum(c, ts); });
      requestAnimationFrame(animateSpectrums);
    }

    requestAnimationFrame(animateSpectrums);
  }());

  /* ---- 8. Peak meter L/R w artykułach ---------------------------------- */
  (function () {
    var barL  = document.getElementById("pm-left");
    var barR  = document.getElementById("pm-right");
    var pkL   = document.getElementById("pm-peak-left");
    var pkR   = document.getElementById("pm-peak-right");
    if (!barL || !barR) return;

    var peakL = 0, peakR = 0;
    var peakFallL = 0, peakFallR = 0;
    var PEAK_HOLD = 60; // klatek przed opadaniem

    function lerp(a, b, t) { return a + (b - a) * t; }

    var curL = 0.4, curR = 0.38;

    function animateMeter(ts) {
      var t = ts / 1000;

      // Sinusoidy + losowe transjenty
      var baseL = 0.3 + 0.28 * (0.5 + 0.5 * Math.sin(t * 0.7 + 0.0));
      var baseR = 0.3 + 0.28 * (0.5 + 0.5 * Math.sin(t * 0.65 + 1.1));

      // Losowy peak co ~3s
      if (Math.random() < 0.008) { baseL = 0.82 + Math.random() * 0.15; }
      if (Math.random() < 0.008) { baseR = 0.82 + Math.random() * 0.15; }

      curL = lerp(curL, baseL, 0.18);
      curR = lerp(curR, baseR, 0.16);

      var pctL = Math.min(1, curL) * 100;
      var pctR = Math.min(1, curR) * 100;

      barL.style.width = pctL + "%";
      barR.style.width = pctR + "%";

      // Peak hold
      if (curL >= peakL) { peakL = curL; peakFallL = PEAK_HOLD; }
      else if (peakFallL > 0) { peakFallL--; }
      else { peakL = Math.max(0, peakL - 0.004); }

      if (curR >= peakR) { peakR = curR; peakFallR = PEAK_HOLD; }
      else if (peakFallR > 0) { peakFallR--; }
      else { peakR = Math.max(0, peakR - 0.004); }

      pkL.style.left = Math.min(peakL * 100, 98) + "%";
      pkR.style.left = Math.min(peakR * 100, 98) + "%";

      requestAnimationFrame(animateMeter);
    }

    requestAnimationFrame(animateMeter);
  }());

})();
