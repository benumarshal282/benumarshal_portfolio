import Reveal from "./Reveal";

// The heading every section uses: a huge heading and one line underneath.
// (`n`, the old section number, is still accepted but no longer shown.) `small` makes that line the small kind.
export default function SectionHead({ n, title, sub, small = false }) {
  return (
    <Reveal className="shead">
      <h2 className="shead__title">{title}</h2>
      {sub && <p className={small ? "shead__sub is-small" : "shead__sub"}>{sub}</p>}
    </Reveal>
  );
}
