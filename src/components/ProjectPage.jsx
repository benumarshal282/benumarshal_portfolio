import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuX } from "react-icons/lu";
import { projects } from "../data";

// THE PROJECT PAGE. Clicking a project in Work opens this full page explaining
// how it works. Everything on it comes from data.js: tag, title, blurb, core
// ("The idea"), stack, link and the `details` block (steps + status).
//
// It has its own address (#/work/drishti …), so the browser Back button closes
// it and the link can be shared. Esc or the × also close it.

const featured = projects.filter((p) => p.featured && p.details);
export const slugOf = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const PREFIX = "#/work/";

// set when the page is opened by clicking on the site, so closing can simply go Back
let cameFromSite = false;
export function openProject(title) {
  cameFromSite = true;
  window.location.hash = PREFIX + slugOf(title);
}

function useOpenSlug() {
  const read = () => (window.location.hash.startsWith(PREFIX) ? window.location.hash.slice(PREFIX.length) : null);
  const [slug, setSlug] = useState(read);
  useEffect(() => {
    const on = () => {
      const now = read();
      if (!now) cameFromSite = false; // closed (× / Esc / browser Back): forget how it was opened
      setSlug(now);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return slug;
}

export default function ProjectPage() {
  const slug = useOpenSlug();
  const index = featured.findIndex((p) => slugOf(p.title) === slug);
  const p = featured[index];
  const scrollRef = useRef(null);

  // opened by a click on the site: step Back (returns to Work where you were).
  // opened from a shared link: swap the address for the Work section instead.
  const close = useCallback(() => {
    if (cameFromSite) { cameFromSite = false; window.history.back(); return; }
    window.history.replaceState(null, "", "#work");
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    document.getElementById("work")?.scrollIntoView();
  }, []);

  useEffect(() => {
    if (!p) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => { root.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [p, close]);

  // new project (via "Next"): start at the top
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }); }, [slug]);

  const next = featured.length ? featured[(index + 1) % featured.length] : null;
  const goNext = () => { if (next) window.location.replace(PREFIX + slugOf(next.title)); };

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="pp"
          ref={scrollRef}
          className="pp"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pp-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="pp__bar">
            <button type="button" className="pp__back" onClick={close}>
              <LuArrowLeft aria-hidden="true" /> Back to work
            </button>
            <span className="pp__count">{String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</span>
            <button type="button" className="pp__x" onClick={close} aria-label="Close project" autoFocus>
              <LuX aria-hidden="true" />
            </button>
          </div>

          <article className="pp__in" key={slug}>
            <header className="pp__head">
              <p className="kicker">{p.tag}</p>
              <h1 id="pp-title" className="pp__title">{p.title}</h1>
              <p className="pp__lead">{p.blurb}</p>
            </header>

            <div className="pp__cover">
              {/* the project's own picture (image), else its stand-in photo (thumb), else a generated cover */}
              {p.image || p.thumb
                ? <img className="pc__img" src={import.meta.env.BASE_URL + (p.image || p.thumb)} alt="" />
                : <div className="pc__cover" style={{ "--h": (index * 53 + 215) % 360 }} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>}
            </div>

            <dl className="pp__meta">
              <div><dt>Field</dt><dd>{p.tag}</dd></div>
              <div><dt>Tech</dt><dd>{p.stack.join(", ")}</dd></div>
              <div>
                <dt>Project</dt>
                <dd>
                  {p.link
                    ? <a href={p.link} target="_blank" rel="noreferrer">Open it <LuArrowUpRight aria-hidden="true" /></a>
                    : <span className="pp__muted">Link coming soon</span>}
                </dd>
              </div>
            </dl>

            {p.details.problem && (
              <section className="pp__sec">
                <h2 className="label">The problem</h2>
                <p className="pp__idea">{p.details.problem}</p>
              </section>
            )}

            <section className="pp__sec">
              <h2 className="label">The idea</h2>
              <p className="pp__idea">{p.core}</p>
            </section>

            <section className="pp__sec">
              <h2 className="label">How it works</h2>
              <ol className="pp__steps">
                {p.details.steps.map((s, i) => (
                  <motion.li
                    key={s.t}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px", root: scrollRef }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="pp__n">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </motion.li>
                ))}
              </ol>
            </section>

            {p.details.extra && <Extra extra={p.details.extra} />}

            {p.details.status && (
              <section className="pp__sec">
                <h2 className="label">Where it stands</h2>
                <p className="pp__idea">{p.details.status}</p>
              </section>
            )}

            {next && next !== p && (
              <button type="button" className="pp__next" onClick={goNext}>
                <span className="label">Next project</span>
                <span className="pp__next-t">{next.title} <LuArrowRight aria-hidden="true" /></span>
              </button>
            )}
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// The highlight block under "How it works". In data.js, `extra` is one of:
//   items: [{ t, d }]  -> a grid of small cards   (e.g. DRISHTI's six indicators)
//   list:  ["…"]       -> a list of questions      (e.g. Unfold's live decisions)
//   flow:  ["…"]       -> steps joined by arrows   (e.g. Career Launch's loop)
function Extra({ extra }) {
  return (
    <section className="pp__sec">
      <h2 className="label">{extra.title}</h2>
      {extra.items && (
        <ul className="pp__cards">
          {extra.items.map((it) => <li key={it.t}><h3>{it.t}</h3><p>{it.d}</p></li>)}
        </ul>
      )}
      {extra.list && (
        <ul className="pp__qs">{extra.list.map((q) => <li key={q}>{q}</li>)}</ul>
      )}
      {extra.flow && (
        <ol className="pp__flow">
          {extra.flow.map((f, i) => (
            <li key={f}>{f}{i < extra.flow.length - 1 && <span aria-hidden="true"> →</span>}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
