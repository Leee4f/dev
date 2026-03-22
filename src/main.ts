import "./style.css";

// Fade in on load
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
});
