import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimatedSpan, Terminal, TypingAnimation } from "./Terminal";
import { profile } from "../data";

// The loading screen, dressed as the macOS Terminal: a zsh prompt types
// `whoami`, the answer prints line by line (name, role, a short paragraph), then a second
// prompt offers the way in. Enter (or clicking the link) opens the site at any
// moment. Edit the words freely; colours are the .t-* classes in site.css.
const USER = "benu";
const HOST = "macbook";
const TITLE = `${USER} — -zsh — 80×24`;
const COMMAND = "whoami";
const NAME = "BENU MARSHAL";
// the line under the name, then a short paragraph (no categories)
const ROLE = "Entrepreneur / Mechatronics Engineer / Embedded AI Developer";
const ABOUT = (
  <span>
    Currently building <span className="t-cyan">Unfold</span>, an AI that turns documents and speech into
    presentations. Nine projects in so far: sensors, firmware, models and the wiring in between.
  </span>
);
const NOTE = "// Open to internships and things worth building.";
const ENTER = "press enter ↵ to open the workshop";
// typing these letters (anywhere on the intro) opens the CV in a new tab
const CV_WORD = "cv";
const CV_URL = `${import.meta.env.BASE_URL}${profile.cv}`;
const openCv = () => window.open(CV_URL, "_blank", "noopener");
const FOOT = "■ Hire me to unlock my full potential■";

// SPEED. Typing: milliseconds per letter. Pause: seconds of quiet before each
// line. Fade: seconds each line takes to appear. Bigger = slower.
const TYPING = 110;
const PAUSE = 0.32;
const FADE = 0.45;

// "Last login: Sun Nov 23 01:32:10 on ttys000", like a fresh Terminal window
function lastLogin() {
  const d = new Date();
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const mon = d.toLocaleDateString("en-US", { month: "short" });
  const time = d.toLocaleTimeString("en-GB", { hour12: false });
  return `Last login: ${day} ${mon} ${String(d.getDate()).padStart(2, " ")} ${time} on ttys000`;
}

function Prompt() {
  return (
    <span className="t-prompt">
      <span className="t-grn">{USER}@{HOST}</span> <span className="t-blue">~</span> <span className="t-fg">%</span>{" "}
    </span>
  );
}

export default function IntroTerminal({ onDone }) {
  const [open, setOpen] = useOpen();
  const [login] = useState(lastLogin);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {open && (
        <motion.div
          className="intro"
          role="dialog"
          aria-modal="true"
          aria-label="Introduction"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
        >
          <Terminal className="intro__term" title={TITLE}>
            <AnimatedSpan pause={0.2} duration={FADE} className="t-dim">{login}</AnimatedSpan>
            <TypingAnimation duration={TYPING} className="term__cmd" prefix={<Prompt />}>{COMMAND}</TypingAnimation>
            <AnimatedSpan pause={PAUSE + 0.2} duration={FADE} className="term__name">{NAME}</AnimatedSpan>
            <AnimatedSpan pause={PAUSE} duration={FADE} className="term__role">{ROLE}</AnimatedSpan>
            <AnimatedSpan pause={PAUSE} duration={FADE} className="term__about">{ABOUT}</AnimatedSpan>
            <AnimatedSpan pause={PAUSE} duration={FADE} className="term__note">{NOTE}</AnimatedSpan>
            <AnimatedSpan pause={0} duration={0.1} className="term__gap"> </AnimatedSpan>
            <AnimatedSpan pause={PAUSE + 0.2} duration={FADE} className="term__enter-row">
              <span><Prompt /><button type="button" className="term__enter" onClick={() => setOpen(false)}>{ENTER}</button><span className="term__block is-blink" aria-hidden="true" /></span>
            </AnimatedSpan>
            <AnimatedSpan pause={0.15} duration={FADE} className="term__alt">
              <span>
                <span className="t-dim">  or type </span>
                <button type="button" className="term__cv" onClick={openCv}>{CV_WORD}</button>
                <span className="t-dim"> to open my resume</span>
              </span>
            </AnimatedSpan>
          </Terminal>
          <motion.p className="intro__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>
            {FOOT}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// open/closed, plus: Enter or Escape closes, and the page can't scroll while open
function useOpen() {
  const state = useState(true);
  const [, setOpen] = state;
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    let typed = "";
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        // Enter on the "cv" button opens the CV; anywhere else it opens the site
        if (e.key === "Enter" && document.activeElement?.classList.contains("term__cv")) return;
        e.preventDefault(); setOpen(false); return;
      }
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      typed = (typed + e.key.toLowerCase()).slice(-CV_WORD.length);
      if (typed === CV_WORD) { typed = ""; openCv(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); root.style.overflow = prev; };
  }, [setOpen]);
  return state;
}
