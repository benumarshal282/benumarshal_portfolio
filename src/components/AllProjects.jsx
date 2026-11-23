import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { LuArrowUpRight } from "react-icons/lu";
import { projects } from "../data";
import SectionHead from "./SectionHead";

// The full index: every project in data.js, one row each.
// Hover a row and its picture (`thumb` in data.js) follows the pointer, after the
// "hover image links" pattern. A row with a `link` opens it in a new tab; without
// one it shows "soon".
// FOLLOW: how tightly the picture follows the pointer. Higher stiffness = snappier.
const FOLLOW = { stiffness: 220, damping: 26, mass: 0.6 };
// HOVER_PICTURE: the picture that follows the pointer over a row. false = off.
const HOVER_PICTURE = false;

export default function AllProjects() {
  const [hot, setHot] = useState(-1);
  const x = useSpring(useMotionValue(0), FOLLOW);
  const y = useSpring(useMotionValue(0), FOLLOW);
  const tilt = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  const move = (e) => {
    const dx = e.clientX - x.get();
    tilt.set(Math.max(-8, Math.min(8, dx * 0.06)));
    x.set(e.clientX + 24);
    y.set(e.clientY - 90);
  };
  const enter = (i) => (e) => {
    if (hot === -1) { x.jump(e.clientX + 24); y.jump(e.clientY - 90); }
    setHot(i);
  };
  const current = HOVER_PICTURE ? projects[hot] : undefined;

  return (
    <section id="all-projects" className="sec" data-mood="projects">
      <div className="sec__in">
        <SectionHead
          n="05"
          title="All projects"
          sub={`The complete index: all ${projects.length}, big and small.`}
        />
        <div className={`index${hot >= 0 ? " index__dim" : ""}`} role="table" aria-label="All projects" onMouseMove={move} onMouseLeave={() => setHot(-1)}>
          <div className="index__row index__row--head" role="row">
            <span role="columnheader">No.</span>
            <span role="columnheader">Project</span>
            <span role="columnheader">Field</span>
            <span role="columnheader">Built with</span>
            <span role="columnheader">Link</span>
          </div>
          {projects.map((p, i) => (
            <div className={`index__row${i === hot ? " is-hot" : ""}`} role="row" key={p.title} onMouseEnter={enter(i)}>
              <span className="index__no" role="cell">{String(i + 1).padStart(2, "0")}</span>
              <span className="index__title" role="cell">
                <strong>{p.title}</strong>
                <small>{p.blurb}</small>
              </span>
              <span className="index__field" role="cell">{p.tag}</span>
              <span className="index__stack" role="cell">{p.stack.join(", ")}</span>
              <span className="index__link" role="cell">
                {/* The arrow opens `link` from data.js. While link is empty the arrow shows but goes nowhere. */}
                {p.link
                  ? <a className="index__go" href={p.link} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`} title={`Open ${p.title}`}><LuArrowUpRight aria-hidden="true" /></a>
                  : <span className="index__go is-off" aria-hidden="true"><LuArrowUpRight /></span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* the picture that follows the pointer */}
      <motion.div className="peek" aria-hidden="true" style={{ x, y, rotate: tilt }}
        initial={false} animate={{ opacity: current?.thumb ? 1 : 0, scale: current?.thumb ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <AnimatePresence initial={false}>
          {current?.thumb && (
            <motion.img key={current.thumb} src={import.meta.env.BASE_URL + current.thumb} alt=""
              initial={{ opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
