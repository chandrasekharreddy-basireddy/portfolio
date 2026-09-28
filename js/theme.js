/* ==========================================================================
   Portfolio — theme.js
   Dark/light toggle, localStorage persistence, system preference.
   ========================================================================== */

(function () {
    "use strict";

    const STORAGE_KEY = "csr-theme";
    const root = document.documentElement;
    const toggle = document.getElementById("theme-toggle");

    function applyTheme(theme) {
        root.dataset.theme = theme;
        if (toggle) {
            const isLight = theme === "light";
            toggle.setAttribute("aria-pressed", String(isLight));
            toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
        }
    }

    function initTheme() {
        if (!toggle) return;

        applyTheme(root.dataset.theme || "dark");

        toggle.addEventListener("click", () => {
            const next = root.dataset.theme === "dark" ? "light" : "dark";
            applyTheme(next);
            try {
                localStorage.setItem(STORAGE_KEY, next);
            } catch (e) { /* storage unavailable — theme still applies for this visit */ }
        });

        // Follow OS-level changes only while the user hasn't made an explicit choice
        const media = window.matchMedia("(prefers-color-scheme: light)");
        media.addEventListener("change", (event) => {
            let saved = null;
            try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
            if (!saved) applyTheme(event.matches ? "light" : "dark");
        });
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.initTheme = initTheme;
})();
