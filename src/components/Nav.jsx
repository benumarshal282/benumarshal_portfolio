import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import BrandBadge from "./BrandBadge";

// One bar across the top: BM mark + name on the left, the
// sections, "Resume" (opens the CV PDF), and "Let's talk" (opens the visitor's mail app with your address).
// The link for the section you are reading gets an underline.
// HIDING: the bar stays put until you have scrolled past the About section.
// After that it slides up out of the way when you scroll down, and slides back
// down as soon as you scroll up. NUDGE = pixels of scrolling that count.
const NUDGE = 6;
const ITEMS = [
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Toolbox", id: "toolbox" },
  { label: "Journey", id: "journey" },
  { label: "All projects", id: "all-projects" },
];

export default function Nav() {
  const [active, setActive] = useState(-1);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const lock = useRef(0); // while a clicked link is still scrolling, keep its underline

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      // show / hide
      const y = window.scrollY;
      const about = document.getElementById("about");
      const pastAbout = about ? y > about.offsetTop + about.offsetHeight - window.innerHeight * 0.35 : false;
      const dy = y - lastY.current;
      if (!pastAbout) setHidden(false);
      else if (dy > NUDGE) setHidden(true);
      else if (dy < -NUDGE) setHidden(false);
      if (Math.abs(dy) > NUDGE || !pastAbout) lastY.current = y;
      if (performance.now() < lock.current) return;
      const line = window.innerHeight * 0.35;
      let idx = -1;
      ITEMS.forEach((it, i) => {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`topbar${hidden ? " is-hidden" : ""}`}
      onFocusCapture={() => setHidden(false)} /* keyboard users never tab into a hidden bar */
    >
      <div className="topbar__in">
        <a href="#top" className="brand" aria-label={`${profile.fullName}, back to top`}>
          {profile.avatar
            ? <img className="brand__mark brand__face" src={import.meta.env.BASE_URL + profile.avatar} alt="" aria-hidden="true" />
            : <BrandBadge className="brand__badge" />}
          <span className="brand__name">{profile.fullName}</span>
        </a>
        <nav className="topbar__links" aria-label="Sections">
          {ITEMS.map((it, i) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className={i === active ? "is-active" : undefined}
              aria-current={i === active ? "true" : undefined}
              onClick={() => { lock.current = performance.now() + 1100; setActive(i); }}
            >
              {it.label}
            </a>
          ))}
        </nav>
        <a className="topbar__cv" href={`${import.meta.env.BASE_URL}${profile.cv}`} target="_blank" rel="noreferrer">Resume <span aria-hidden="true">↗</span></a>
        <a className="topbar__cta" href={`mailto:${profile.email}`}>Let's talk</a>
      </div>
    </header>
  );
}
