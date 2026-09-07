document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuIcon = document.querySelector(".menu");
    const navContainer = document.querySelector(".nav-container");

    if (menuIcon && navContainer) {

        menuIcon.addEventListener("click", () => {

            navContainer.classList.toggle("mobile-menu");

        });


        navContainer.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                const targetId = link.getAttribute("href");

                const target = document.querySelector(targetId);

                if (target) {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

                navContainer.classList.remove("mobile-menu");

            });

        });

    }


    /* ================= SEARCH ================= */

    const searchIcon = document.querySelector(".search-icon");

    const searchBox = document.querySelector(".search-box");

    const searchInput = document.getElementById("searchInput");

    const searchButton = document.getElementById("searchButton");


    if (searchIcon && searchBox) {

        searchIcon.addEventListener("click", () => {

            searchBox.classList.toggle("active");

            if (searchBox.classList.contains("active")) {

                searchInput.focus();

            }

        });

    }


    function performSearch() {

        const query = searchInput.value.trim().toLowerCase();


        if (!query) {

            alert("Please enter something to search for.");

            searchInput.focus();

            return;

        }


        const sections = document.querySelectorAll(
            ".home, .about, .courses, .gallery, .contact"
        );


        let foundSection = null;


        for (const section of sections) {

            const sectionText = section.innerText.toLowerCase();

            if (sectionText.includes(query)) {

                foundSection = section;

                break;

            }

        }


        if (foundSection) {

            sections.forEach(section => {

                section.classList.remove("search-highlight");

            });


            searchBox.classList.remove("active");


            foundSection.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });


            setTimeout(() => {

                foundSection.classList.add("search-highlight");

            }, 400);


            setTimeout(() => {

                foundSection.classList.remove("search-highlight");

            }, 2500);

        }


        else {

            alert(
                `❌ No results found for "${searchInput.value.trim()}".`
            );

        }

    }


    if (searchButton) {

        searchButton.addEventListener("click", performSearch);

    }


    if (searchInput) {

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                event.preventDefault();

                performSearch();

            }

        });

    }


    /* ================= IMAGE POPUP ================= */

    const galleryImages =
        document.querySelectorAll(".gallery-image");


    const profileImage =
        document.querySelector(".main-img img");


    const imageModal =
        document.getElementById("imageModal");


    const modalImage =
        document.getElementById("modalImage");


    const modalCaption =
        document.getElementById("modalCaption");


    const closeModal =
        document.getElementById("closeModal");


    function openImage(image) {

        if (!imageModal || !modalImage) {

            return;

        }


        modalImage.src = image.src;

        modalImage.alt = image.alt;


        if (modalCaption) {

            modalCaption.textContent = image.alt;

        }


        imageModal.classList.add("active");


        document.body.style.overflow = "hidden";

    }


    function closeImage() {

        if (!imageModal) {

            return;

        }


        imageModal.classList.remove("active");


        document.body.style.overflow = "";


        setTimeout(() => {

            if (modalImage) {

                modalImage.src = "";

            }

        }, 200);

    }


    /* Gallery images */

    galleryImages.forEach(image => {

        image.addEventListener("click", () => {

            openImage(image);

        });

    });


    /* Profile image */

    if (profileImage) {

        profileImage.style.cursor = "pointer";


        profileImage.addEventListener("click", () => {

            openImage(profileImage);

        });

    }


    /* Close button */

    if (closeModal) {

        closeModal.addEventListener("click", closeImage);

    }


    /* Click outside image */

    if (imageModal) {

        imageModal.addEventListener("click", event => {

            if (event.target === imageModal) {

                closeImage();

            }

        });

    }


    /* Escape key */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            imageModal &&
            imageModal.classList.contains("active")
        ) {

            closeImage();

        }

    });


    /* ================= CONTACT FORM VALIDATION ================= */

    const contactForm =
        document.getElementById("contactForm");


    const fullName =
        document.getElementById("fullname");


    const email =
        document.getElementById("email");


    const phone =
        document.getElementById("phone");


    const message =
        document.getElementById("message");


    /* Email validation */

    function validateEmail() {

        const value = email.value.trim();


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        if (!emailPattern.test(value)) {

            email.setCustomValidity(
                "Please enter a complete and valid email address, for example name@gmail.com."
            );

            return false;

        }


        email.setCustomValidity("");

        return true;

    }


    /* Phone validation */

    function validatePhone() {

        const value = phone.value.trim();


        /*
            Ghanaian phone examples:

            0241234567
            0201234567
            0501234567
            +233241234567
        */


        const localPattern =
            /^(02|03|05)[0-9]{8}$/;


        const internationalPattern =
            /^\+233(2|3|5)[0-9]{8}$/;


        if (
            !localPattern.test(value) &&
            !internationalPattern.test(value)
        ) {

            phone.setCustomValidity(
                "Please enter a valid phone number, for example 0241234567 or +233241234567."
            );

            return false;

        }


        phone.setCustomValidity("");

        return true;

    }


    /* Name validation */

    function validateName() {

        const value = fullName.value.trim();


        if (value.length < 3) {

            fullName.setCustomValidity(
                "Please enter your full name."
            );

            return false;

        }


        fullName.setCustomValidity("");

        return true;

    }


    /* Message validation */

    function validateMessage() {

        const value = message.value.trim();


        if (value.length < 5) {

            message.setCustomValidity(
                "Please enter a message of at least 5 characters."
            );

            return false;

        }


        message.setCustomValidity("");

        return true;

    }


    /* Validate while typing */

    if (email) {

        email.addEventListener("input", validateEmail);

    }


    if (phone) {

        phone.addEventListener("input", validatePhone);

    }


    if (fullName) {

        fullName.addEventListener("input", validateName);

    }


    if (message) {

        message.addEventListener("input", validateMessage);

    }


    /* Validate before submitting */

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            const nameValid = validateName();

            const emailValid = validateEmail();

            const phoneValid = validatePhone();

            const messageValid = validateMessage();


            if (
                !nameValid ||
                !emailValid ||
                !phoneValid ||
                !messageValid ||
                !contactForm.checkValidity()
            ) {

                event.preventDefault();

                contactForm.reportValidity();

                return;

            }

        });

    }

});