import "../style.css";
import { marked } from "marked";

interface ContentIndex {
  builds: string[];
  notes: string[];
  tips: string[];
}

function createCard(title: string, html: string): HTMLElement {
  const card = document.createElement("div");
  card.className =
    "border border-gray-200 mb-3 transition-colors hover:border-gray-500";

  const titleEl = document.createElement("div");
  titleEl.className =
    "px-4 py-3 cursor-pointer text-sm flex justify-between items-center";
  titleEl.textContent = title;

  const arrow = document.createElement("span");
  arrow.className = "text-gray-500 transition-transform duration-300";
  arrow.textContent = ">";
  titleEl.appendChild(arrow);

  const body = document.createElement("div");
  body.className = "overflow-hidden transition-all duration-400 h-0";

  const inner = document.createElement("div");
  inner.className =
    "px-4 pb-4 text-sm leading-relaxed [&_h1]:text-base [&_h1]:font-normal [&_h1]:mt-3 [&_h1]:mb-2 [&_h2]:text-sm [&_h2]:font-normal [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-normal [&_h3]:mt-3 [&_h3]:mb-2 [&_ul]:pl-5 [&_li]:mb-1 [&_strong]:text-black [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:text-xs";
  inner.innerHTML = html;

  body.appendChild(inner);
  card.appendChild(titleEl);
  card.appendChild(body);

  let isOpen = false;
  titleEl.addEventListener("click", () => {
    if (isOpen) {
      body.style.height = inner.offsetHeight + "px";
      requestAnimationFrame(() => {
        body.style.height = "0";
      });
      arrow.style.transform = "";
      isOpen = false;
    } else {
      body.style.height = inner.offsetHeight + "px";
      arrow.style.transform = "rotate(90deg)";
      isOpen = true;
      body.addEventListener(
        "transitionend",
        () => {
          if (isOpen) body.style.height = "auto";
        },
        { once: true }
      );
    }
  });

  return card;
}

async function renderSection(
  dir: string,
  files: string[],
  containerId: string
): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!files || files.length === 0) {
    container.innerHTML =
      '<p class="text-gray-400 text-sm italic py-4">-- no entries yet --</p>';
    return;
  }

  container.innerHTML = "";

  for (const file of files) {
    try {
      const res = await fetch(dir + "/" + file);
      if (!res.ok) continue;
      const md = await res.text();
      const html = await marked.parse(md);

      const titleMatch = md.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : file.replace(".md", "");

      container.appendChild(createCard(title, html));
    } catch (e) {
      console.error(`Failed to load ${dir}/${file}`, e);
    }
  }
}

async function main(): Promise<void> {
  try {
    const res = await fetch("content.json");
    const content: ContentIndex = await res.json();

    await Promise.all([
      renderSection("builds", content.builds, "builds-container"),
      renderSection("notes", content.notes, "notes-container"),
      renderSection("tips", content.tips, "tips-container"),
    ]);
  } catch (e) {
    console.error("Failed to load content.json:", e);
  }

  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");
}

document.addEventListener("DOMContentLoaded", main);
