/* ==========================================================================
   Portfolio — projects.js
   Project data + rendering. Cards are built from the array below.
   To add a project: add an object here. Set github/demo to null when a
   link doesn't exist — the matching button is hidden automatically.
   ========================================================================== */

(function () {
    "use strict";

    const projects = [
        {
            id: 1,
            title: "Portfolio in 3D",
            category: "Development",
            description:
                "My portfolio, except you walk through it. A scroll-driven Three.js world with " +
                "seasons, animals and a character that actually animates — built to learn how " +
                "3D on the web works.",
            image: "assets/images/project-1.svg",
            technologies: ["JavaScript", "Three.js", "WebGL"],
            github: "https://github.com/chandrasekharreddy-basireddy/portfolio-3d",
            demo: null,
            featured: true
        },
        {
            id: 2,
            title: "Survival School",
            category: "Development",
            description:
                "Started as exam practice and quietly became a whole learning platform — timed " +
                "quizzes the server actually grades, points and badges, real certificates, chat " +
                "and analytics for instructors.",
            image: "assets/images/project-2.svg",
            technologies: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis"],
            github: "https://github.com/chandrasekharreddy-basireddy/survivalschool",
            demo: "https://survivalschool.vercel.app",
            featured: false
        },
        {
            id: 3,
            title: "Signal-Lite",
            category: "Development",
            description:
                "I wanted to understand how real chat systems work, so I built one carefully: " +
                "phone/OTP login, rotating refresh tokens, WebSocket fan-out over Redis. No AI " +
                "features, on purpose.",
            image: "assets/images/project-3.svg",
            technologies: ["Python", "FastAPI", "WebSocket", "Redis", "PostgreSQL"],
            github: "https://github.com/chandrasekharreddy-basireddy/Runnerup--chat",
            demo: "https://runnerup-chat.vercel.app",
            featured: false
        },
        {
            id: 4,
            title: "SaiU V2 — Student OS",
            category: "Development",
            description:
                "Our campus timetable made no sense, so this app makes sense of it — live data, " +
                "conflict detection, calendar export, and it works offline when the wifi " +
                "doesn't.",
            image: "assets/images/project-4.svg",
            technologies: ["JavaScript", "PWA", "Node.js", "GitHub Actions"],
            github: "https://github.com/chandrasekharreddy-basireddy/SaiU-V2",
            demo: null,
            featured: false
        },
        {
            id: 5,
            title: "This Portfolio",
            category: "Design",
            description:
                "The site you're on right now. One HTML page, some CSS, some JavaScript — no " +
                "frameworks, no build step, and every line written to be read.",
            image: "assets/images/project-5.svg",
            technologies: ["HTML", "CSS", "JavaScript"],
            github: "https://github.com/chandrasekharreddy-basireddy/portfolio",
            demo: "https://chandrasekharreddy-basireddy.github.io/portfolio/",
            featured: false
        }
    ];

    const svgIcon = {
        github:
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.69 1.25 3.34.95.11-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .3.2.67.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
        external:
            '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7m0 0H8m9 0v9"/></svg>',
        folder:
            '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>'
    };

    function createProjectCard(project, index) {
        const article = document.createElement("article");
        article.className = "project-card" + (project.featured ? " project-card--featured" : "");
        article.dataset.category = project.category;
        article.style.animationDelay = (index * 90) + "ms";

        /* --- media --- */
        const media = document.createElement("div");
        media.className = "project-card__media";

        const img = document.createElement("img");
        img.src = project.image;
        img.alt = "Preview of the " + project.title + " project";
        img.loading = "lazy";
        img.width = 800;
        img.height = 500;
        // If the image can't load, keep a styled background — never a broken icon
        img.addEventListener("error", () => media.classList.add("is-fallback"), { once: true });
        media.appendChild(img);

        const number = document.createElement("span");
        number.className = "project-card__number";
        number.textContent = String(index + 1).padStart(2, "0");
        media.appendChild(number);

        if (project.featured) {
            const badge = document.createElement("span");
            badge.className = "project-card__badge";
            badge.textContent = "Featured";
            article.appendChild(badge);
        }

        /* --- hover overlay (desktop enhancement) --- */
        const overlay = document.createElement("div");
        overlay.className = "project-card__overlay";
        if (project.github) {
            const a = document.createElement("a");
            a.href = project.github;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.innerHTML = svgIcon.github + "<span>View Source</span>";
            overlay.appendChild(a);
        }
        if (project.demo) {
            const a = document.createElement("a");
            a.href = project.demo;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.innerHTML = svgIcon.external + "<span>View Project</span>";
            overlay.appendChild(a);
        }
        if (overlay.childElementCount > 0) media.appendChild(overlay);

        /* --- body --- */
        const body = document.createElement("div");
        body.className = "project-card__body";

        const category = document.createElement("p");
        category.className = "project-card__category";
        category.textContent = project.category;
        body.appendChild(category);

        const title = document.createElement("h3");
        title.className = "project-card__title";
        title.textContent = project.title;
        body.appendChild(title);

        const desc = document.createElement("p");
        desc.className = "project-card__desc";
        desc.textContent = project.description;
        body.appendChild(desc);

        const tech = document.createElement("ul");
        tech.className = "project-card__tech";
        project.technologies.forEach((t) => {
            const li = document.createElement("li");
            li.textContent = t;
            tech.appendChild(li);
        });
        body.appendChild(tech);

        // Card-body links: always visible, so mobile users never depend on hover
        if (project.github || project.demo) {
            const links = document.createElement("div");
            links.className = "project-card__links";
            if (project.github) {
                const a = document.createElement("a");
                a.className = "project-card__link";
                a.href = project.github;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = svgIcon.github + "<span>Source</span>";
                links.appendChild(a);
            }
            if (project.demo) {
                const a = document.createElement("a");
                a.className = "project-card__link";
                a.href = project.demo;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.innerHTML = svgIcon.external + "<span>Live demo</span>";
                links.appendChild(a);
            }
            body.appendChild(links);
        }

        article.appendChild(media);
        article.appendChild(body);
        return article;
    }

    function renderProjects() {
        const grid = document.getElementById("projects-grid");
        if (!grid) return;

        const fragment = document.createDocumentFragment();
        projects.forEach((project, index) => {
            fragment.appendChild(createProjectCard(project, index));
        });

        // Intentional empty state for filtered views with no matches
        const empty = document.createElement("div");
        empty.className = "projects-empty";
        empty.id = "projects-empty";
        empty.setAttribute("aria-live", "polite");
        empty.innerHTML =
            '<div class="projects-empty__icon">' + svgIcon.folder + "</div>" +
            '<h3 class="projects-empty__title">No projects in this category yet</h3>' +
            '<p class="projects-empty__text">New work is added here as it ships — try another category.</p>';

        grid.appendChild(fragment);
        grid.appendChild(empty);
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.renderProjects = renderProjects;
})();
