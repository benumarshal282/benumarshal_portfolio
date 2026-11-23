import { journey } from "../data";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

// Timeline: date on the left, a line with a dot, title and text on the right.
// Entries are in data.js (`journey`).
export default function Journey() {
  return (
    <section id="journey" className="sec" data-mood="journey">
      <div className="sec__in">
        <SectionHead n="04" title="Journey" sub="Where I've studied and worked so far, and what comes next." />
        <ol className="tl">
          {journey.map((j, i) => (
            <li className="tl__item" key={j.title}>
              <Reveal delay={i * 0.06} y={24} className="tl__row">
                <span className="tl__date">{j.when}</span>
                <span className="tl__dot" aria-hidden="true" />
                <div className="tl__body">
                  <h3 className="tl__title">{j.title}</h3>
                  <p className="tl__text">{j.place && <b>{j.place}. </b>}{j.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
