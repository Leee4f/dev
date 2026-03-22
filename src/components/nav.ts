export interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "TOP", href: "/" },
  { label: "GAME", href: "/game/" },
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
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    const isActive = current === item.label;
    a.className = isActive
      ? "text-sm font-medium text-retro-accent no-underline border-b-2 border-retro-accent pb-0.5"
      : "text-sm font-medium text-retro-muted no-underline hover:text-retro-accent transition-colors";
    nav.appendChild(a);
  }

  return nav;
}
