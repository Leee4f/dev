import "../style.css";
import { createNav } from "../components/nav";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav")?.appendChild(createNav("DEV"));
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
});
