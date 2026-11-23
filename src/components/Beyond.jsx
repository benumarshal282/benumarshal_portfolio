import { useEffect, useRef, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { beyond } from "../data";
import Reveal from "./Reveal";

// Picture cards in a sliding row, three to a screen, after the pasted carousel
// pattern. Slide it with the arrows, a trackpad swipe, or a finger.
// Cards come from data.js (`beyond`).
export default function Beyond() {
  const base = import.meta.env.BASE_URL;
  const rail = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = rail.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > el.scrollWidth - el.clientWidth - 4 });
  };
  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const slide = (dir) => {
    const el = rail.current;
    const card = el.querySelector(".bcard");
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0) : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="beyond" className="sec" data-mood="beyond">
      <div className="sec__in beyond2">
        <Reveal>
          <div className="beyond__head">
            <div>
              <p className="eyebrow">Off the clock</p>
              <h2 className="beyond__title">{beyond.title}</h2>
              <p className="beyond__intro">{beyond.intro}</p>
            </div>
            <div className="beyond__arrows">
              <button type="button" aria-label="Previous" disabled={edge.start} onClick={() => slide(-1)}><LuChevronLeft /></button>
              <button type="button" aria-label="Next" disabled={edge.end} onClick={() => slide(1)}><LuChevronRight /></button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="beyond__rail" ref={rail} onScroll={sync}>
            {beyond.cards.map((c) => (
              <li className="bcard" key={c.title}>
                {c.image && <img src={base + c.image} alt="" loading="lazy" draggable="false" />}
                <div className="bcard__shade" />
                <div className="bcard__text">
                  {c.label && <span className="bcard__label">{c.label}</span>}
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
