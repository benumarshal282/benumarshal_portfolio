import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { projects as allProjects } from "../data";
import SectionHead from "./SectionHead";
import { openProject } from "./ProjectPage";

// Only the projects marked featured: true in data.js.
const projects = allProjects.filter((p) => p.featured);

// One big frame with a strip of thumbnails laid over its bottom edge, after the
// pasted carousel pattern. The difference: you don't click "next". The section
// is pinned while you scroll, and scrolling moves through the projects.
// Clicking a thumbnail jumps to that project.
// Each project's picture, text and link come from data.js.
const PER_PROJECT = 70; // how much scrolling each project takes, in % of the screen height

function Cover({ project, index }) {
  if (project.image) return <img className="pc__img" src={import.meta.env.BASE_URL + project.image} alt="" loading="lazy" />;
  // no picture yet: a generated cover so the frame is never empty
  return (
    <div className="pc__cover" style={{ "--h": (index * 53 + 215) % 360 }} aria-hidden="true">
      <span>{String(index + 1).padStart(2, "0")}</span>
    </div>
  );
}

export default function ProjectsCarousel() {
  const ref = useRef(null);
  const n = projects.length;
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.max(0, Math.min(n - 1, Math.floor(v * n)))));

  const goTo = (i) => {
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / n), behavior: "smooth" });
  };

  return (
    <section id="work" data-mood="work">
      <div className="sec__in sec__in--head">
        <SectionHead
          n="02"
          title="Work"
          small
          sub={`Four projects I'm proudest of, and the kind I want to build more of. The full index of all ${allProjects.length} is further down.`}
        />
      </div>
      <div ref={ref} style={{ height: `${n * PER_PROJECT + 100}vh` }}>
      <div className="projects__sticky pc">
        <div className="pc__head">
          <p className="label">Selected work</p>
          <p className="label">{String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · keep scrolling</p>
        </div>

        <div className="pc__frame">
          {projects.map((p, i) => (
            <article
              className={`pc__slide${i === active ? " is-active" : ""}${p.details ? " is-openable" : ""}`}
              key={p.title}
              aria-hidden={i !== active}
              // clicking anywhere on the picture opens the project page (links and buttons keep their own job)
              onClick={(e) => { if (p.details && !e.target.closest("a,button")) openProject(p.title); }}
            >
              <Cover project={p} index={i} />
              <div className="pc__shade" />
              <div className="pc__info">
                <span className="pc__tag">{p.tag}</span>
                <h3 className="pc__title">{p.title}</h3>
                <p className="pc__blurb">{p.blurb}</p>
                <div className="pc__btns">
                {/* Opens the project page explaining how it works (ProjectPage.jsx). */}
                {p.details && (
                  <button type="button" className="hero__cta pc__btn pc__btn--main" tabIndex={i === active ? 0 : -1} onClick={() => openProject(p.title)}>
                    How it works <span aria-hidden="true">→</span>
                  </button>
                )}
                {/* Opens the GitHub repository or live project. Set `link` in data.js. */}
                {p.link
                  ? <a className="hero__cta pc__btn" href={p.link} target="_blank" rel="noreferrer" tabIndex={i === active ? 0 : -1}>View project ↗</a>
                  : <span className="hero__cta pc__btn is-off" title="Link coming soon">View project ↗</span>}
                </div>
              </div>
            </article>
          ))}

          <div className="pc__thumbs" role="tablist" aria-label="Projects">
            {projects.map((p, i) => (
              <button
                type="button"
                key={p.title}
                role="tab"
                aria-selected={i === active}
                aria-label={p.title}
                title={p.title}
                className={`pc__thumb${i === active ? " is-active" : ""}`}
                onClick={() => goTo(i)}
              >
                {p.image
                  ? <img src={import.meta.env.BASE_URL + p.image} alt="" />
                  : <span style={{ "--h": (i * 53 + 215) % 360 }}>{String(i + 1).padStart(2, "0")}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
