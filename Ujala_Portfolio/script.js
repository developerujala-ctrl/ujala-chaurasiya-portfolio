// Ujala Chauraiya Portfolio — navigation, reveal animations and theme toggle
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const themeToggle = document.querySelector("#themeToggle");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  });
});

// Remember the selected theme when browser storage is available.
try {
  const savedTheme = localStorage.getItem("ujala-portfolio-theme");
  if (savedTheme === "light") document.body.classList.add("light-theme");
} catch (_) {
  // The site still works if storage is unavailable.
}
function updateThemeButton() {
  const light = document.body.classList.contains("light-theme");
  themeToggle.textContent = light ? "☾" : "☼";
  themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
}
updateThemeButton();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  updateThemeButton();
  try {
    localStorage.setItem("ujala-portfolio-theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  } catch (_) {}
});

// Reveal elements as they enter the viewport.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelector("#year").textContent = new Date().getFullYear();
