import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { stats } from "../data";

// The trust strip under the hero: four numbers with a line each (edit them in
// data.js, "stats"). Each number counts up from 0 the first time it is seen.
const COUNT_SECONDS = 1.6;

function Count({ to, plus }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const c = animate(0, to, { duration: COUNT_SECONDS, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [seen, to]);
  return <span ref={ref} className="stat__n" aria-label={`${to}${plus ? "+" : ""}`}>{v}{plus ? "+" : ""}</span>;
}

export default function Stats() {
  return (
    <section className="stats" aria-label="In numbers">
      <div className="stats__in">
        {stats.map((s) => (
          <div className="stat" key={s.text}>
            <Count to={s.n} plus={s.plus} />
            <p className="stat__t">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
