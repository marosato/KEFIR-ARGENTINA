// Navbar Toggler Animation
document.addEventListener("DOMContentLoaded", function () {
    const toggler = document.querySelector(".navbar-toggler");
    const listIcon = toggler.querySelector(".bi-list");
    const xIcon = toggler.querySelector(".bi-x");

    toggler.addEventListener("click", function () {
        if (toggler.getAttribute("aria-expanded") === "true") {
            listIcon.style.display = "none";
            xIcon.style.display = "block";
        } else {
            listIcon.style.display = "block";
            xIcon.style.display = "none";
        }
    });
});