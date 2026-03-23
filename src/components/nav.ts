export interface SubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: SubItem[];
}

const navItems: NavItem[] = [
  { label: "TOP", href: "/" },
  {
    label: "GAME",
    href: "/game/",
    children: [
      { label: "Path of Exile 2", href: "/game/poe2/" },
    ],
  },
  { label: "BOOK", href: "/book/" },
  { label: "DEV", href: "/dev/" },
];

export function createNav(current?: string): HTMLElement {
  const nav = document.createElement("nav");
  nav.className =
    "flex items-center gap-8 pb-6 border-b border-retro-border";

  const logo = document.createElement("a");
  logo.href = "/";
  logo.innerHTML = '<span class="text-retro-text">K</span><span class="text-retro-accent">-D</span>';
  logo.className =
    "font-mono text-sm font-bold tracking-widest no-underline hover:opacity-80 transition-opacity mr-auto";
  nav.appendChild(logo);

  for (const item of navItems) {
    if (item.children && item.children.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.className = "relative";

      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      const isActive = current === item.label;
      a.className = isActive
        ? "font-mono text-[11px] tracking-[0.2em] text-retro-accent no-underline border-b border-retro-accent pb-1"
        : "font-mono text-[11px] tracking-[0.2em] text-retro-muted no-underline hover:text-retro-accent transition-colors";
      wrapper.appendChild(a);

      const dropdown = document.createElement("div");
      dropdown.className =
        "absolute top-full right-0 mt-3 py-2 bg-retro-paper border border-retro-border rounded-sm min-w-44 opacity-0 invisible transition-all duration-200 z-50 shadow-lg";

      for (const child of item.children) {
        const link = document.createElement("a");
        link.href = child.href;
        link.textContent = child.label;
        link.className =
          "block px-4 py-2 font-mono text-[11px] text-retro-muted no-underline hover:text-retro-accent hover:bg-retro-card-hover transition-colors tracking-wider";
        dropdown.appendChild(link);
      }

      wrapper.appendChild(dropdown);

      wrapper.addEventListener("mouseenter", () => {
        dropdown.classList.remove("opacity-0", "invisible");
        dropdown.classList.add("opacity-100", "visible");
      });

      wrapper.addEventListener("mouseleave", () => {
        dropdown.classList.remove("opacity-100", "visible");
        dropdown.classList.add("opacity-0", "invisible");
      });

      nav.appendChild(wrapper);
    } else {
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      const isActive = current === item.label;
      a.className = isActive
        ? "font-mono text-[11px] tracking-[0.2em] text-retro-accent no-underline border-b border-retro-accent pb-1"
        : "font-mono text-[11px] tracking-[0.2em] text-retro-muted no-underline hover:text-retro-accent transition-colors";
      nav.appendChild(a);
    }
  }

  return nav;
}
