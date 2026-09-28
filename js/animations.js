/* ==========================================================================
   Portfolio — animations.js
   Scroll reveals (IntersectionObserver), staggered children, stat count-up,
   timeline draw, subtle pointer parallax, magnetic buttons, custom cursor.
   Everything degrades gracefully and respects prefers-reduced-motion.
   ========================================================================== */

(function () {
    "use strict";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");

    /* ---------- Reveal on scroll ---------- */
    function initReveals() {
        const targets = document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-scale, .skill-group"
        );

        if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
            targets.forEach((el) => el.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
        );

        targets.forEach((el) => observer.observe(el));
    }

    /* ---------- Stagger indices ---------- */
    function initStagger() {
        document.querySelectorAll(".skill-group__tags").forEach((group) => {
            Array.from(group.children).forEach((tag, i) => {
                tag.style.setProperty("--i", i);
            });
        });
        document.querySelectorAll(".mobile-menu__link").forEach((link, i) => {
            link.style.setProperty("--i", i);
        });
    }

    /* ---------- Stat count-up ---------- */
    function countUp(el) {
        const target = parseInt(el.dataset.count, 10);
        if (Number.isNaN(target) || prefersReducedMotion.matches) return;
        const duration = 900;
        const start = performance.now();

        function frame(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(eased * target)).padStart(2, "0");
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function initCountUp() {
        const stats = document.querySelectorAll(".stat__value[data-count]");
        if (!stats.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        countUp(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.6 }
        );
        stats.forEach((el) => observer.observe(el));
    }

    /* ---------- Timeline ---------- */
    function initTimeline() {
        const timeline = document.getElementById("timeline");
        if (!timeline || !("IntersectionObserver" in window)) return;

        const lineObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        timeline.classList.add("is-drawn");
                        lineObserver.unobserve(timeline);
                    }
                });
            },
            { threshold: 0.1 }
        );
        lineObserver.observe(timeline);

        const nodeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle("is-active", entry.isIntersecting);
                });
            },
            { threshold: 0.6 }
        );
        timeline.querySelectorAll(".timeline__item").forEach((item) => nodeObserver.observe(item));
    }

    /* ---------- Pointer parallax (hero) ---------- */
    function initParallax() {
        if (prefersReducedMotion.matches || !finePointer.matches) return;

        const layer = document.querySelector(".hero");
        const items = document.querySelectorAll("[data-parallax]");
        if (!layer || !items.length) return;

        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;
        let ticking = false;

        layer.addEventListener("pointermove", (event) => {
            const rect = layer.getBoundingClientRect();
            // normalized to -0.5 … 0.5 around the hero centre
            targetX = event.clientX / rect.width - 0.5;
            targetY = event.clientY / rect.height - 0.5;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        layer.addEventListener("pointerleave", () => {
            targetX = 0;
            targetY = 0;
        }, { passive: true });

        function update() {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;
            items.forEach((item) => {
                const strength = parseFloat(item.dataset.parallax) || 6;
                item.style.transform =
                    "translate3d(" + (currentX * strength).toFixed(2) + "px, " +
                    (currentY * strength).toFixed(2) + "px, 0)";
            });
            const settled =
                Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;
            if (settled && targetX === 0 && targetY === 0) {
                items.forEach((item) => (item.style.transform = ""));
                ticking = false;
            } else {
                requestAnimationFrame(update);
            }
        }
    }

    /* ---------- Magnetic buttons ---------- */
    function initMagnetic() {
        if (prefersReducedMotion.matches || !finePointer.matches) return;

        document.querySelectorAll("[data-magnetic]").forEach((el) => {
            el.addEventListener("pointermove", (event) => {
                const rect = el.getBoundingClientRect();
                const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
                const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
                el.style.translate = (x * 5).toFixed(1) + "px " + (y * 4).toFixed(1) + "px";
            }, { passive: true });

            el.addEventListener("pointerleave", () => {
                el.style.translate = "0px 0px";
            }, { passive: true });
        });
    }

    /* ---------- Custom cursor (subtle, desktop only) ----------
       A small trailing ring that complements — never replaces — the
       native cursor, which stays fully usable at all times. */
    function initCursor() {
        if (prefersReducedMotion.matches || !finePointer.matches) return;

        const ring = document.createElement("div");
        ring.className = "cursor-ring";
        ring.setAttribute("aria-hidden", "true");
        document.body.appendChild(ring);

        let targetX = -100;
        let targetY = -100;
        let x = -100;
        let y = -100;
        let scale = 1;
        let targetScale = 1;
        let visible = false;

        document.addEventListener("pointermove", (event) => {
            targetX = event.clientX;
            targetY = event.clientY;
            if (!visible) {
                visible = true;
                ring.style.opacity = "1";
            }
            const interactive = event.target.closest("a, button, input, textarea, [data-magnetic]");
            targetScale = interactive ? 1.7 : 1;
        }, { passive: true });

        document.addEventListener("pointerleave", () => {
            visible = false;
            ring.style.opacity = "0";
        });

        (function loop() {
            x += (targetX - x) * 0.18;
            y += (targetY - y) * 0.18;
            scale += (targetScale - scale) * 0.15;
            ring.style.transform =
                "translate(" + x.toFixed(1) + "px, " + y.toFixed(1) + "px) translate(-50%, -50%) " +
                "scale(" + scale.toFixed(2) + ")";
            requestAnimationFrame(loop);
        })();
    }

    function initAnimations() {
        initStagger();
        initReveals();
        initCountUp();
        initTimeline();
        initParallax();
        initMagnetic();
        initCursor();
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.initAnimations = initAnimations;
})();
