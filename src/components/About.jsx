import SectionHead from "./SectionHead";
import Reveal from "./Reveal";

// Text copied exactly from your reference. Words wrapped in <mark> show in the
// accent colour; add or remove <mark> to change which words stand out.
const EXPLORING = [
  "Agentic AI & applied LLM systems",
  "Edge AI on constrained hardware",
  "Biomedical & assistive robotics",
  "Product-building from zero to demo",
];
const OPEN_TO = [
  "Internships — AI, embedded, robotics",
  "Engineering & software collaborations",
  "Automation and AI project work",
  "Early-stage product building",
];

export default function About() {
  return (
    <section id="about" className="sec" data-mood="about">
      <div className="sec__in">
        <SectionHead
          n="01"
          title="About me"
          sub="Who you'd actually be working with, and how I think about building things."
        />
        <div className="about2">
          <Reveal>
            <p className="about2__lead">
              I'm <mark>Benu Marshal</mark>, a mechatronics engineering student who builds in the space between{" "}
              <mark>intelligent software</mark> and the <mark>physical world</mark> — and I'd rather have a rough
              prototype working on a bench than a perfect idea on a slide.
            </p>
          </Reveal>
          <div className="about2__grid">
            <Reveal delay={0.08}>
              <h3 className="label">My angle</h3>
              <p className="about2__p">
                Most people pick a side: firmware or models, hardware or apps. Mechatronics put me on both. I can take
                a sensor off a breadboard, get clean data out of it, train something useful on that data, and put the
                result in front of a person — and I know where each of those steps usually breaks.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <h3 className="label">How I work</h3>
              <p className="about2__p">
                Learn by building. Start with the smallest version that can fail honestly, measure it, then make it
                less wrong. I'd rather say "prototype, not clinically validated" than oversell something — you'll see
                that language on my own projects below.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="label">Exploring now</h3>
              <ul className="rules">{EXPLORING.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
            <Reveal delay={0.14}>
              <h3 className="label">Open to</h3>
              <ul className="rules">{OPEN_TO.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
