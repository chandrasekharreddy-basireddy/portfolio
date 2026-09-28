/* ==========================================================================
   Portfolio — filters.js
   Project category filtering. Buttons use aria-pressed; no page reload.
   ========================================================================== */

(function () {
    "use strict";

    function initFilters() {
        const buttons = document.querySelectorAll(".filter-btn");
        const grid = document.getElementById("projects-grid");
        if (!buttons.length || !grid) return;

        const cards = () => Array.from(grid.querySelectorAll(".project-card"));
        const emptyState = () => document.getElementById("projects-empty");

        function applyFilter(category) {
            let visibleCount = 0;

            cards().forEach((card) => {
                const matches = category === "all" || card.dataset.category === category;
                card.classList.toggle("is-hidden", !matches);
                if (matches) {
                    visibleCount++;
                    // restart the entrance animation for a smooth re-reveal
                    card.style.animation = "none";
                    void card.offsetWidth; /* reflow */
                    card.style.animation = "";
                }
            });

            const empty = emptyState();
            if (empty) empty.classList.toggle("is-visible", visibleCount === 0);
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const isActive = button.classList.contains("is-active");
                if (isActive) return;

                buttons.forEach((b) => {
                    const active = b === button;
                    b.classList.toggle("is-active", active);
                    b.setAttribute("aria-pressed", String(active));
                });

                applyFilter(button.dataset.filter);
            });
        });
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.initFilters = initFilters;
})();
