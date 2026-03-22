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
    "flex items-center gap-6 mb-8 pb-3 border-b border-retro-border";

  const logo = document.createElement("a");
  logo.href = "/";
  logo.textContent = "KEII-DEV";
  logo.className =
    "text-base font-semibold tracking-wider text-retro-text no-underline hover:text-retro-accent transition-colors mr-4";
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
        ? "text-sm font-medium text-retro-accent no-underline border-b-2 border-retro-accent pb-0.5"
        : "text-sm font-medium text-retro-muted no-underline hover:text-retro-accent transition-colors";
      wrapper.appendChild(a);

      const dropdown = document.createElement("div");
      dropdown.className =
        "absolute top-full left-0 mt-2 py-1 bg-retro-paper border border-retro-border rounded-sm min-w-40 opacity-0 invisible transition-all duration-200 z-50 shadow-lg";

      for (const child of item.children) {
        const link = document.createElement("a");
        link.href = child.href;
        link.textContent = child.label;
        link.className =
          "block px-4 py-2 text-xs text-retro-muted no-underline hover:text-retro-accent hover:bg-retro-card-hover transition-colors";
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
        ? "text-sm font-medium text-retro-accent no-underline border-b-2 border-retro-accent pb-0.5"
        : "text-sm font-medium text-retro-muted no-underline hover:text-retro-accent transition-colors";
      nav.appendChild(a);
    }
  }

  return nav;
}
