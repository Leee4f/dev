import "../style.css";
import { marked } from "marked";

interface ContentIndex {
  builds: string[];
  notes: string[];
  tips: string[];
}

function extractThumbnail(html: string): { thumb: string | null; html: string } {
  const match = html.match(/<p>\s*<img\s+src="([^"]+)"[^>]*>\s*<\/p>/);
  if (!match) return { thumb: null, html };
  return { thumb: match[1], html: html.replace(match[0], "") };
}

function createCard(title: string, html: string, baseDir: string): HTMLElement {
  const { thumb, html: bodyHtml } = extractThumbnail(html);

  const card = document.createElement("div");
  card.className =
    "border border-retro-border mb-3 rounded-sm transition-all hover:border-retro-accent";

  const titleEl = document.createElement("div");
  titleEl.className =
    "px-4 py-3 cursor-pointer text-sm font-medium flex items-center gap-3 hover:bg-retro-card-hover transition-colors";

  if (thumb) {
    const img = document.createElement("img");
    img.src = baseDir + "/" + thumb;
    img.alt = title;
    img.className =
      "w-12 h-12 object-cover rounded-sm border border-retro-border shrink-0";
    titleEl.appendChild(img);
  }

  const titleText = document.createElement("span");
  titleText.className = "flex-1";
  titleText.textContent = title;
  titleEl.appendChild(titleText);

  const arrow = document.createElement("span");
  arrow.className = "text-retro-accent transition-transform duration-300 shrink-0";
  arrow.textContent = ">";
  titleEl.appendChild(arrow);

  const body = document.createElement("div");
  body.className = "overflow-hidden transition-all duration-400 h-0";

  const inner = document.createElement("div");
  inner.className = [
    "px-4 pb-4 text-sm leading-relaxed",
    "[&_h1]:text-base [&_h1]:font-medium [&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-retro-text",
    "[&_h2]:text-sm [&_h2]:font-medium [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-retro-accent [&_h2]:border-b [&_h2]:border-retro-border [&_h2]:pb-1",
    "[&_h3]:text-sm [&_h3]:font-medium [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-retro-text/80",
    "[&_h4]:text-sm [&_h4]:font-medium [&_h4]:mt-3 [&_h4]:mb-1 [&_h4]:text-retro-muted",
    "[&_ul]:pl-5 [&_ul]:my-2 [&_li]:mb-1 [&_li]:text-retro-text/80",
    "[&_ol]:pl-5 [&_ol]:my-2",
    "[&_strong]:text-retro-text [&_strong]:font-medium",
    "[&_code]:bg-retro-code-bg [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono [&_code]:rounded-sm",
    "[&_pre]:bg-retro-code-bg [&_pre]:p-4 [&_pre]:rounded-sm [&_pre]:overflow-x-auto [&_pre]:my-3 [&_pre]:text-xs [&_pre]:font-mono [&_pre]:leading-relaxed",
    "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
    "[&_blockquote]:border-l-2 [&_blockquote]:border-retro-accent [&_blockquote]:pl-4 [&_blockquote]:my-3 [&_blockquote]:text-retro-text/70 [&_blockquote]:italic",
    "[&_hr]:border-retro-border [&_hr]:my-4",
    "[&_table]:w-full [&_table]:my-3 [&_table]:text-xs",
    "[&_th]:text-left [&_th]:border-b [&_th]:border-retro-border [&_th]:pb-2 [&_th]:pr-3 [&_th]:font-medium",
    "[&_td]:border-b [&_td]:border-retro-border/50 [&_td]:py-2 [&_td]:pr-3 [&_td]:align-top",
    "[&_a]:text-retro-accent [&_a]:underline [&_a]:decoration-retro-accent/30 [&_a]:hover:decoration-retro-accent",
    "[&_p]:my-2",
    "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-sm [&_img]:my-3 [&_img]:border [&_img]:border-retro-border",
  ].join(" ");
  inner.innerHTML = bodyHtml;

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
      '<p class="text-retro-muted text-sm italic py-4">-- no entries yet --</p>';
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

      container.appendChild(createCard(title, html, dir));
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
