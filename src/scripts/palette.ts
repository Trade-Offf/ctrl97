import { themeStorageKey } from "../data/site";
import type { CommandAction, CommandGroup, CommandItem } from "../lib/commands";

type ThemeChoice = "system" | "light" | "dark";

const themeOrder: ThemeChoice[] = ["system", "light", "dark"];
const groupOrder: CommandGroup[] = ["go", "work", "note", "action"];

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return target.isContentEditable;
}

function readTheme(): ThemeChoice {
  const value = document.documentElement.getAttribute("data-theme");
  if (value === "light" || value === "dark") return value;
  return "system";
}

function writeStoredTheme(choice: ThemeChoice): void {
  try {
    if (choice === "system") localStorage.removeItem(themeStorageKey);
    else localStorage.setItem(themeStorageKey, choice);
  } catch {
    /* private mode can block storage */
  }
}

function applyTheme(choice: ThemeChoice): void {
  const root = document.documentElement;
  if (choice === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", choice);
  writeStoredTheme(choice);
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) return;
  const label = button.dataset[`label${capitalize(choice)}`];
  if (label) button.setAttribute("aria-label", label);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function cycleTheme(): void {
  const current = readTheme();
  const next =
    themeOrder[(themeOrder.indexOf(current) + 1) % themeOrder.length];
  applyTheme(next);
}

function readCommands(): CommandItem[] {
  const node = document.querySelector("#command-index");
  if (!node?.textContent) return [];
  try {
    const parsed: unknown = JSON.parse(node.textContent);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCommand);
  } catch {
    return [];
  }
}

function isCommand(value: unknown): value is CommandItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.group === "string" &&
    typeof item.label === "string" &&
    typeof item.hint === "string" &&
    typeof item.href === "string" &&
    typeof item.action === "string"
  );
}

export function startPalette(): void {
  const root = document.documentElement;
  if (root.dataset.paletteReady === "true") return;
  root.dataset.paletteReady = "true";

  applyTheme(readTheme());

  const themeButton =
    document.querySelector<HTMLButtonElement>("#theme-toggle");
  themeButton?.addEventListener("click", () => {
    cycleTheme();
  });

  const commandButton =
    document.querySelector<HTMLButtonElement>("#command-toggle");
  const palette = document.querySelector<HTMLElement>("#command-dialog");
  const panel = palette?.querySelector<HTMLElement>(".panel");
  const input = document.querySelector<HTMLInputElement>("#command-search");
  const list = document.querySelector<HTMLElement>("#command-list");
  const live = document.querySelector<HTMLElement>("#command-live");
  if (!commandButton || !palette || !panel || !input || !list || !live) return;
  const trigger = commandButton;
  const dialog = palette;
  const surface = panel;
  const search = input;
  const menu = list;
  const status = live;

  const kbd = trigger.querySelector("kbd");
  if (kbd && /Mac|iPhone|iPad/i.test(navigator.userAgent)) {
    kbd.textContent = "⌘K";
  }

  const commands = readCommands();
  let visible: CommandItem[] = [];
  let active = 0;
  let open = false;
  let closeTimer = 0;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const previousOverflow = document.documentElement.style.overflow;

  const groupLabel = (group: CommandGroup): string =>
    menu.dataset[`group${capitalize(group)}`] ?? group;

  function setActive(index: number, scroll: boolean): void {
    const options = [...menu.querySelectorAll<HTMLElement>('[role="option"]')];
    active =
      options.length === 0 ? -1 : (index + options.length) % options.length;
    options.forEach((option, optionIndex) => {
      option.setAttribute(
        "aria-selected",
        optionIndex === active ? "true" : "false",
      );
    });
    const current = options[active];
    if (!current) {
      search.removeAttribute("aria-activedescendant");
      return;
    }
    search.setAttribute("aria-activedescendant", current.id);
    if (scroll) current.scrollIntoView({ block: "nearest" });
  }

  function render(): void {
    const query = search.value.trim().toLocaleLowerCase();
    visible = commands.filter((item) => {
      if (!query) return true;
      return `${item.label} ${item.hint}`.toLocaleLowerCase().includes(query);
    });
    menu.replaceChildren();
    if (visible.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = menu.dataset.empty ?? "";
      menu.append(empty);
      setActive(-1, false);
      return;
    }
    for (const group of groupOrder) {
      const items = visible.filter((item) => item.group === group);
      if (items.length === 0) continue;
      const section = document.createElement("div");
      section.setAttribute("role", "group");
      const heading = document.createElement("p");
      heading.className = "group-label";
      heading.id = `command-group-${group}`;
      heading.textContent = groupLabel(group);
      section.setAttribute("aria-labelledby", heading.id);
      section.append(heading);
      for (const item of items) {
        const option = document.createElement("div");
        option.setAttribute("role", "option");
        option.id = `command-option-${item.id}`;
        option.className = "option";
        const label = document.createElement("span");
        label.className = "option-label";
        label.textContent = item.label;
        option.append(label);
        if (item.hint) {
          const hint = document.createElement("span");
          hint.className = "hint";
          hint.textContent = item.hint;
          option.append(hint);
        }
        const index = visible.indexOf(item);
        option.addEventListener("pointerenter", () => {
          setActive(index, false);
        });
        option.addEventListener("click", () => {
          void run(item);
        });
        section.append(option);
      }
      menu.append(section);
    }
    setActive(0, false);
  }

  async function run(item: CommandItem): Promise<void> {
    const action: CommandAction = item.action;
    if (
      action === "theme-light" ||
      action === "theme-dark" ||
      action === "theme-system"
    ) {
      applyTheme(action.slice("theme-".length) as ThemeChoice);
      close();
      return;
    }
    if (action === "copy") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        status.textContent = menu.dataset.copied ?? "";
      } catch {
        status.textContent = menu.dataset.copyFailed ?? "";
      }
      return;
    }
    if (action === "github") {
      window.open(item.href, "_blank", "noopener,noreferrer");
      close();
      return;
    }
    if (item.href) window.location.assign(item.href);
  }

  function openPalette(): void {
    window.clearTimeout(closeTimer);
    const navToggle = document.querySelector<HTMLInputElement>("#nav-toggle");
    if (navToggle) navToggle.checked = false;
    open = true;
    dialog.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    search.value = "";
    status.textContent = "";
    render();
    document.documentElement.style.overflow = "hidden";
    if (!reduceMotion) {
      dialog.style.opacity = "0";
      window.requestAnimationFrame(() => {
        dialog.style.opacity = "1";
      });
    }
    search.focus();
  }

  function close(): void {
    if (!open) return;
    open = false;
    trigger.setAttribute("aria-expanded", "false");
    document.documentElement.style.overflow = previousOverflow;
    const finish = (): void => {
      dialog.hidden = true;
      trigger.focus();
    };
    if (reduceMotion) {
      finish();
      return;
    }
    dialog.style.opacity = "0";
    closeTimer = window.setTimeout(finish, 180);
  }

  function toggle(): void {
    if (open) close();
    else openPalette();
  }

  trigger.addEventListener("click", () => {
    toggle();
  });
  search.addEventListener("input", () => {
    render();
  });
  dialog.addEventListener("pointerdown", (event) => {
    if (!(event.target instanceof Node)) return;
    if (!surface.contains(event.target)) close();
  });

  document.addEventListener("keydown", (event) => {
    const shortcut =
      (event.metaKey || event.ctrlKey) &&
      !event.altKey &&
      !event.shiftKey &&
      event.key.toLowerCase() === "k";
    if (shortcut) {
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      toggle();
      return;
    }
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive(active + (event.key === "ArrowDown" ? 1 : -1), true);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const item = visible[active];
      if (item) void run(item);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const stops = [search, menu];
      const index = stops.indexOf(document.activeElement as HTMLElement);
      const next = event.shiftKey
        ? stops[(index <= 0 ? stops.length : index) - 1]
        : stops[(index + 1) % stops.length];
      next.focus();
    }
  });
}
