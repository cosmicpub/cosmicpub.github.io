// assets/tool-engine.js
(function () {
  // Read tool config from a <script type="application/json" id="tool-config"> block
  function getConfig() {
    const el = document.getElementById("tool-config");
    if (!el) throw new Error("Missing tool config block (#tool-config).");
    try {
      return JSON.parse(el.textContent.trim());
    } catch (e) {
      throw new Error("Tool config JSON is invalid.");
    }
  }

  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Optional: allow URL params like ?min=1&max=50 for number tool later
  function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    const v = params.get(name);
    return v === null ? null : v;
  }

  window.ToolEngine = {
    init: function () {
      const cfg = getConfig();

      // Fill page text
      document.title = cfg.seoTitle || cfg.title || "Decide For Me";
      setText("toolH2", cfg.title || "");
      setText("toolDesc", cfg.description || "");
      setText("btnText", cfg.buttonText || "Decide");

      // Optional hint
      setText("hint", cfg.hint || "");

      // Store config
      window.__TOOL_CFG__ = cfg;
    },

    run: function () {
      const cfg = window.__TOOL_CFG__ || getConfig();

      // Tool types:
      // - "picker": pick random item from options
      // - "coin": heads/tails
      // - "number": random number range (default 1-100) with optional params ?min=?max=
      const type = cfg.type || "picker";

      let result = "";

      if (type === "coin") {
        result = pickRandom(["HEADS", "TAILS"]);
      } else if (type === "number") {
        let min = Number(cfg.min ?? 1);
        let max = Number(cfg.max ?? 100);

        // allow override via URL params
        const qMin = getParam("min");
        const qMax = getParam("max");
        if (qMin !== null) min = Number(qMin);
        if (qMax !== null) max = Number(qMax);

        if (!Number.isFinite(min) || !Number.isFinite(max) || max < min) {
          result = "Invalid range";
        } else {
          result = Math.floor(Math.random() * (max - min + 1)) + min;
        }
      } else {
        const options = Array.isArray(cfg.options) ? cfg.options : [];
        if (!options.length) result = "No options set";
        else result = pickRandom(options);
      }

      setText("result", String(result));
    },
  };
})();
