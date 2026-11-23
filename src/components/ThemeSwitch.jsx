import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

// The light/dark switch (lives in the footer). Tap it to flip the whole page.
// The colours for dark mode are in src/styles/theme.css under data-mode="dark".
// The choice is remembered in this browser; first-time visitors get dark.
const KEY = "site-mode";

export function readMode() {
  try { return localStorage.getItem(KEY) === "light" ? "light" : "dark"; } catch { return "dark"; }
}
export function applyMode(mode) {
  document.documentElement.dataset.mode = mode;
}

export default function ThemeSwitch({ className = "" }) {
  const [dark, setDark] = useState(() => readMode() === "dark");

  useEffect(() => {
    applyMode(dark ? "dark" : "light");
    try { localStorage.setItem(KEY, dark ? "dark" : "light"); } catch { /* private mode: just don't remember */ }
  }, [dark]);

  const flip = () => {
    const root = document.documentElement;
    root.classList.add("mode-fade");
    setDark((d) => !d);
    window.setTimeout(() => root.classList.remove("mode-fade"), 500);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={`mswitch${dark ? " is-dark" : ""} ${className}`}
      onClick={flip}
    >
      <LuSun className="mswitch__icon mswitch__icon--sun" aria-hidden="true" />
      <LuMoon className="mswitch__icon mswitch__icon--moon" aria-hidden="true" />
      <span className="mswitch__thumb" aria-hidden="true">
        {dark ? <LuMoon /> : <LuSun />}
      </span>
    </button>
  );
}
