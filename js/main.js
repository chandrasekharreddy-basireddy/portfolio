/* ==========================================================================
   Portfolio — main.js
   Application startup. Personal info is configured in ONE place here.
   Text that lives directly in index.html (name, headings, about copy)
   should be edited there; links and email live in portfolioConfig.
   ========================================================================== */

(function () {
    "use strict";

    const portfolioConfig = {
        name: "Chandra Sekhar Reddy",
        role: "Computer Science Student & Creator",
        university: "Sai University",
        email: "srinivasabasireddy06@gmail.com",
        github: "https://github.com/chandrasekharreddy-basireddy",
        linkedin: "https://www.linkedin.com/in/chandra-sekhar-reddy-basireddy-5733a2385",
        resumePath: "assets/resume.pdf"
    };

    /* ---------- Footer year ---------- */
    function initFooterYear() {
        const el = document.getElementById("footer-year");
        if (el) el.textContent = String(new Date().getFullYear());
    }

    /* ---------- Back to top ---------- */
    function initBackToTop() {
        const button = document.getElementById("back-to-top");
        if (!button) return;

        const toggle = () => {
            const show = window.scrollY > window.innerHeight * 0.6;
            button.hidden = !show;
            requestAnimationFrame(() => button.classList.toggle("is-visible", show));
        };

        window.addEventListener("scroll", toggle, { passive: true });
        toggle();

        button.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: prefersSmooth() ? "smooth" : "auto" });
        });
    }

    function prefersSmooth() {
        return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    /* ---------- Boot ---------- */
    document.addEventListener("DOMContentLoaded", () => {
        const app = window.Portfolio;

        app.initTheme();
        app.initNavigation();
        app.renderProjects();
        app.initFilters();
        app.initContactForm();
        app.initAnimations();

        initFooterYear();
        initBackToTop();
    });
})();
