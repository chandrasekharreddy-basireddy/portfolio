/* ==========================================================================
   Portfolio — navigation.js
   Sticky header state, hamburger + mobile menu, active section tracking.
   ========================================================================== */

(function () {
    "use strict";

    const header = document.getElementById("site-header");
    const navToggle = document.getElementById("nav-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll(".mobile-menu__link") : [];
    let menuOpen = false;
    let lastFocused = null;

    /* ---------- Sticky header state ---------- */
    function onScroll() {
        const scrolled = window.scrollY > 24;
        header.classList.toggle("is-scrolled", scrolled);
    }

    /* ---------- Mobile menu ---------- */
    function openMenu() {
        menuOpen = true;
        mobileMenu.hidden = false;
        requestAnimationFrame(() => mobileMenu.classList.add("is-open"));
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close navigation menu");
        document.body.style.overflow = "hidden";
        lastFocused = document.activeElement;
        if (mobileLinks.length) mobileLinks[0].focus();
    }

    function closeMenu(restoreFocus) {
        if (!menuOpen) return;
        menuOpen = false;
        mobileMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation menu");
        document.body.style.overflow = "";
        // wait for the fade-out transition before hiding from assistive tech
        window.setTimeout(() => {
            if (!menuOpen) mobileMenu.hidden = true;
        }, 320);
        if (restoreFocus) {
            if (lastFocused === navToggle) navToggle.focus();
            else if (lastFocused && lastFocused.focus) lastFocused.focus();
        }
    }

    function initNavigation() {
        if (!header || !navToggle || !mobileMenu) return;

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        navToggle.addEventListener("click", () => {
            menuOpen ? closeMenu(true) : openMenu();
        });

        // Close when a menu item is chosen
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => closeMenu(false));
        });

        // Escape closes the menu from anywhere
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menuOpen) {
                closeMenu(true);
            }
        });

        // Keep keyboard focus inside the open menu + toggle (simple trap)
        document.addEventListener("keydown", (event) => {
            if (!menuOpen || event.key !== "Tab") return;
            const focusables = [navToggle, ...mobileLinks];
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        // If the viewport grows past the mobile menu, tidy up
        window.matchMedia("(min-width: 1024px)").addEventListener("change", (event) => {
            if (event.matches) closeMenu(false);
        });

        initActiveSection();
    }

    /* ---------- Active section tracking ---------- */
    function initActiveSection() {
        const sections = document.querySelectorAll("main section[id]");
        const navLinks = document.querySelectorAll("[data-section]");

        function setActive(id) {
            navLinks.forEach((link) => {
                link.classList.toggle("is-active", link.dataset.section === id);
            });
        }

        if (!("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.initNavigation = initNavigation;
})();
