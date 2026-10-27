/* ============================================================================
   HERO 3D CENTERPIECE
   An art-directed "precision-engineered" sculpture: a faceted metallic core
   inside a slowly rotating wireframe shell, with orbiting shards. A metaphor
   for structure brought to a complex problem.

   Engineering notes:
   - Three.js (UMD r128) is lazy-loaded; a static SVG fallback shows if WebGL
     or the library is unavailable.
   - Respects prefers-reduced-motion (renders one static frame, no loop).
   - Pauses rendering when the tab is hidden or the canvas is off-screen.
   - Disposes geometries/materials/renderer on teardown; no leaked RAF.
   ============================================================================ */
(function () {
  "use strict";

  var THREE_SRC = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  var canvas = document.getElementById("scene");
  var fallbackEl = document.getElementById("sceneFallback");
  if (!canvas) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function showFallback() {
    if (fallbackEl) fallbackEl.classList.add("show");
    canvas.style.display = "none";
  }

  function webglOK() {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  }

  if (!webglOK()) { showFallback(); return; }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // Lazy-load: only pull Three.js once the hero canvas is near the viewport.
  function whenVisible(cb) {
    if (!("IntersectionObserver" in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (e) { return e.isIntersecting; })) {
        io.disconnect(); cb();
      }
    }, { rootMargin: "200px" });
    io.observe(canvas);
  }

  whenVisible(function () {
    loadScript(THREE_SRC).then(init).catch(showFallback);
  });

  function init() {
    if (!window.THREE) { showFallback(); return; }
    var THREE = window.THREE;

    var wrap = canvas.parentElement;
    var W = wrap.clientWidth, H = wrap.clientHeight;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 0, 7.4);

    var group = new THREE.Group();
    scene.add(group);

    var ACCENT = 0x4f8cff, SILVER = 0xc7ced8;

    // --- faceted metallic core -------------------------------------------
    var coreGeo = new THREE.IcosahedronGeometry(1.7, 0);
    var coreMat = new THREE.MeshStandardMaterial({
      color: 0x20262f, metalness: 0.95, roughness: 0.28,
      flatShading: true, emissive: 0x0a0e14, emissiveIntensity: 0.6,
    });
    var core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // --- glowing edge overlay on the core --------------------------------
    var edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreGeo),
      new THREE.LineBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.55 })
    );
    group.add(edges);

    // --- rotating wireframe shell ----------------------------------------
    var shellGeo = new THREE.IcosahedronGeometry(2.7, 1);
    var shell = new THREE.LineSegments(
      new THREE.WireframeGeometry(shellGeo),
      new THREE.LineBasicMaterial({ color: SILVER, transparent: true, opacity: 0.12 })
    );
    group.add(shell);

    // --- orbiting shards --------------------------------------------------
    var shards = new THREE.Group();
    var shardGeo = new THREE.OctahedronGeometry(0.16, 0);
    var shardMat = new THREE.MeshStandardMaterial({
      color: ACCENT, metalness: 0.9, roughness: 0.2,
      emissive: ACCENT, emissiveIntensity: 0.5,
    });
    var N = 7, shardList = [];
    for (var i = 0; i < N; i++) {
      var m = new THREE.Mesh(shardGeo, shardMat);
      var a = (i / N) * Math.PI * 2;
      var r = 3.1 + (i % 3) * 0.25;
      m.userData = { a: a, r: r, y: (i % 2 ? 1 : -1) * (0.3 + 0.5 * Math.random()), s: 0.5 + Math.random() };
      shards.add(m); shardList.push(m);
    }
    group.add(shards);

    // --- lighting (electric blue key + silver rim) -----------------------
    scene.add(new THREE.AmbientLight(0x1a2230, 0.6));
    var key = new THREE.PointLight(ACCENT, 1.5, 40); key.position.set(5, 5, 6); scene.add(key);
    var rim = new THREE.PointLight(SILVER, 0.8, 40); rim.position.set(-6, -3, 2); scene.add(rim);
    var fill = new THREE.DirectionalLight(0x9db4e0, 0.4); fill.position.set(0, 3, 5); scene.add(fill);

    group.rotation.x = 0.35;

    // --- pointer parallax -------------------------------------------------
    var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    function onMove(e) {
      var pt = e.touches ? e.touches[0] : e;
      var cx = (pt.clientX / window.innerWidth) * 2 - 1;
      var cy = (pt.clientY / window.innerHeight) * 2 - 1;
      target.x = cy * 0.25; target.y = cx * 0.4;
    }
    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    // --- resize -----------------------------------------------------------
    function resize() {
      W = wrap.clientWidth; H = wrap.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
    }
    var ro = ("ResizeObserver" in window) ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(wrap); else window.addEventListener("resize", resize);

    // --- render loop ------------------------------------------------------
    var raf = 0, running = false, clock = new THREE.Clock();

    function frame() {
      var dt = clock.getDelta();
      var el = clock.elapsedTime;
      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;

      group.rotation.y += dt * 0.18;
      shell.rotation.y -= dt * 0.1;
      shell.rotation.x += dt * 0.04;
      group.rotation.x = 0.35 + cur.x;
      group.position.x = cur.y * 0.4;

      shardList.forEach(function (m, idx) {
        var a = m.userData.a + el * 0.3 * m.userData.s;
        m.position.set(Math.cos(a) * m.userData.r, m.userData.y + Math.sin(el + idx) * 0.15,
          Math.sin(a) * m.userData.r);
        m.rotation.x += dt; m.rotation.y += dt * 1.3;
      });

      // subtle light breathing
      key.intensity = 1.5 + Math.sin(el * 0.8) * 0.3;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    }

    function start() { if (!running) { running = true; clock.start(); raf = requestAnimationFrame(frame); } }
    function stop() { running = false; cancelAnimationFrame(raf); }

    if (reduceMotion) {
      // one static, composed frame — no animation loop
      renderer.render(scene, camera);
    } else {
      // pause when off-screen or tab hidden
      var vis = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.05 });
      vis.observe(canvas);
      document.addEventListener("visibilitychange", function () {
        document.hidden ? stop() : (isOnScreen() && start());
      });
      function isOnScreen() {
        var r = canvas.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight;
      }
      start();
    }

    // --- teardown (guards against leaks if ever re-initialised) -----------
    function dispose() {
      stop();
      window.removeEventListener("pointermove", onMove);
      if (ro) ro.disconnect();
      [coreGeo, shardGeo, shellGeo].forEach(function (g) { g.dispose && g.dispose(); });
      [coreMat, shardMat].forEach(function (m) { m.dispose && m.dispose(); });
      edges.geometry.dispose(); shell.geometry.dispose();
      renderer.dispose();
    }
    window.addEventListener("beforeunload", dispose);
  }
})();
