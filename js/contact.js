/* ==========================================================================
   Portfolio — contact.js
   Client-side validation + mailto submission.
   There is no backend: on successful validation we open the visitor's
   email client with the message pre-filled. No fake success states.
   ========================================================================== */

(function () {
    "use strict";

    // Configure the destination address here (single place).
    const CONTACT_EMAIL = "srinivasabasireddy06@gmail.com";

    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const MIN_MESSAGE_LENGTH = 20;

    const validators = {
        name: (value) => {
            if (!value.trim()) return "Please enter your name.";
            if (value.trim().length < 2) return "Your name needs at least 2 characters.";
            return "";
        },
        email: (value) => {
            if (!value.trim()) return "Please enter your email address.";
            if (!EMAIL_PATTERN.test(value.trim())) return "Please enter a valid email address.";
            return "";
        },
        subject: (value) => {
            if (!value.trim()) return "Please enter a subject.";
            if (value.trim().length < 3) return "Your subject needs at least 3 characters.";
            return "";
        },
        message: (value) => {
            if (!value.trim()) return "Please enter a message.";
            if (value.trim().length < MIN_MESSAGE_LENGTH) {
                return "Your message needs at least " + MIN_MESSAGE_LENGTH + " characters.";
            }
            return "";
        }
    };

    function setError(input, message) {
        const error = document.getElementById(input.id + "-error");
        input.classList.toggle("is-invalid", Boolean(message));
        input.classList.toggle("is-valid", !message && input.value.trim().length > 0);
        input.setAttribute("aria-invalid", message ? "true" : "false");
        if (error) {
            error.textContent = message;
            error.hidden = !message;
        }
    }

    function validateField(input) {
        const validator = validators[input.name];
        if (!validator) return true;
        const message = validator(input.value);
        setError(input, message);
        return !message;
    }

    function initContactForm() {
        const form = document.getElementById("contact-form");
        if (!form) return;

        const fields = Array.from(form.querySelectorAll(".field__input"));

        // Validate on blur, re-validate live once the user is correcting
        fields.forEach((input) => {
            input.addEventListener("blur", () => validateField(input));
            input.addEventListener("input", () => {
                if (input.classList.contains("is-invalid")) validateField(input);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let allValid = true;
            let firstInvalid = null;
            fields.forEach((input) => {
                const valid = validateField(input);
                if (!valid && !firstInvalid) firstInvalid = input;
                allValid = allValid && valid;
            });

            if (!allValid) {
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Build a mailto: link from the validated values
            const data = new FormData(form);
            const subject = "Portfolio contact: " + String(data.get("subject") || "").trim();
            const body =
                "Name: " + String(data.get("name") || "").trim() +
                "\nEmail: " + String(data.get("email") || "").trim() +
                "\n\n" + String(data.get("message") || "").trim();

            window.location.href =
                "mailto:" + CONTACT_EMAIL +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            const note = document.getElementById("form-note");
            if (note) {
                note.textContent =
                    "Your email client should open with this message ready to send. " +
                    "If it didn't, you can email me directly at " + CONTACT_EMAIL + ".";
            }
        });
    }

    window.Portfolio = window.Portfolio || {};
    window.Portfolio.initContactForm = initContactForm;
})();
