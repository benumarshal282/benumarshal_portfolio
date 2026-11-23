import { profile, projects } from "../data";
import Reveal from "./Reveal";
import HalftoneWordmarkFooter from "./HalftoneWordmarkFooter";
import PrismSilkFooter from "./PrismSilkFooter";
import WordmarkFooter from "./WordmarkFooter";
import KilnWordmarkFooter from "./KilnWordmarkFooter";

// Everything the footer prints comes from data.js.
const footerColumns = [
  { title: "Work", links: projects.slice(0, 3).map((p) => ({ label: p.title, href: p.link || "#work" })) },
  { title: "Site", links: [{ label: "About", href: "#about" }, { label: "Work", href: "#work" }, { label: "Toolbox", href: "#toolbox" }, { label: "Journey", href: "#journey" }, { label: "All projects", href: "#all-projects" }] },
  { title: "Contact", links: [{ label: profile.email, href: `mailto:${profile.email}` }, ...profile.socials.map((s) => ({ label: s.label, href: s.href }))] },
];

// FOOTER_STYLE picks the footer:
//   "kiln"     = the colour-block panel with the giant drawn "benu marshal" (follows THEME)
//   "wordmark" = your name set large at the bottom, fading out (the pasted footer)
//   "silk"     = the Prism Silk footer (colourful folds of silk you can push around)
//   "halftone" = the earlier dotted-wordmark footer
const FOOTER_STYLE = "kiln";

// The kiln footer's words. Edit freely.
const KILN = {
  motto: ["Building machines", "that think"],
  address: ["Coimbatore", "↳ Tamil Nadu", "India"],
  navigation: [
    [{ label: "About", href: "#about" }, { label: "Work", href: "#work" }, { label: "Toolbox", href: "#toolbox" }],
    [{ label: "Journey", href: "#journey" }, { label: "All projects", href: "#all-projects" }, { label: "Contact", href: "#contact" }],
  ],
  registry: "B.E. Mechatronics Engineering — embedded AI, robotics, products — made by Marshal",
};
// socials from data.js, three per column
const kilnSocials = profile.socials.reduce((cols, s, i) => {
  if (i % 3 === 0) cols.push([]);
  cols[cols.length - 1].push({ label: s.label, href: s.href });
  return cols;
}, []);
// the round icons in the silk footer: every social in data.js that it has an icon for
const footerSocials = profile.socials
  .map((s) => ({ icon: s.label.toLowerCase(), href: s.href, label: s.label }))
  .filter((s) => ["x", "instagram", "linkedin", "youtube", "github", "dribbble"].includes(s.icon));

// CTA_STYLE picks the look of the block above the footer:
//   "open"  = no box, left-aligned on the page background, green gradient headline
//   "boxed" = the earlier version inside a dark box
const CTA_STYLE = "open";

export default function Contact() {
  const open = CTA_STYLE === "open";
  return (
    <>
      <section id="contact" className={open ? "cta-open" : "boxed"} data-mood="contact">
        <div className="wrap">
          <div className={open ? "cta" : "panel cta"}>
            <Reveal>
              {open
                ? <p className="cta__status"><span aria-hidden="true" />Open to internships &amp; collaborations</p>
                : <p className="eyebrow">Contact</p>}
              <h2 className="cta__big">Building something?<br /><em>Count me in.</em></h2>
              <p className="cta__sub">I'm open to internships, collaborations and projects that end in something real. Send me a line.</p>
            </Reveal>
            <Reveal delay={0.15}>
              {open && (
                <a className="cta__email" href={`mailto:${profile.email}`}>
                  <span>{profile.email}</span><i aria-hidden="true">↗</i>
                </a>
              )}
              <div className="cta__row">
                <a className="hero__cta" href={`mailto:${profile.email}`}>Say hello →</a>
                {profile.socials.map((s) => (
                  <a key={s.label} className="chip" href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>
                ))}
              </div>
              <p className="cta__mail">{open ? `Based in ${profile.location}` : `${profile.email} · ${profile.location}`}</p>
            </Reveal>
          </div>
        </div>
      </section>
      {FOOTER_STYLE === "kiln" ? (
        <KilnWordmarkFooter
          brand={profile.fullName}
          wordmark={profile.fullName}
          motto={KILN.motto}
          address={KILN.address}
          navigation={KILN.navigation}
          socials={kilnSocials}
          registry={KILN.registry}
          legal={[
            { label: "Email", href: `mailto:${profile.email}` },
            { label: "CV", href: `${import.meta.env.BASE_URL}${profile.cv}` },
          ]}
          surface="var(--accent)"
          deep="var(--accent-deep)"
          ink="var(--accent-ink)"
          paper="var(--accent-deep)"
          fontSans="var(--font-body)"
          weight={0.9}
        />
      ) : FOOTER_STYLE === "wordmark" ? (
        <WordmarkFooter
          name={profile.fullName}
          year={new Date().getFullYear()}
          description={profile.tagline}
          status="Open to internships & collaborations"
          email={profile.email}
          columns={footerColumns}
          credit={{ label: "Made by Marshal", href: "#top" }}
        />
      ) : FOOTER_STYLE === "silk" ? (
        <PrismSilkFooter
          name={profile.name}
          brandHref="#top"
          logo={<></>} /* no mark in front of the name; delete this line to bring the logo back */
          tagline={profile.tagline}
          columns={footerColumns}
          socials={footerSocials}
          copyright={`© ${new Date().getFullYear()} ${profile.fullName} · ${profile.role}`}
          credit={{ label: profile.name, href: "#top" }}
          preset="nocturne"
          height="720px"
        />
      ) : (
        <HalftoneWordmarkFooter
          wordmark={profile.name.toLowerCase()}
          label={profile.name}
          meta={`©${new Date().getFullYear()} · ${profile.role}`}
          columns={footerColumns}
          palette={{ background: "#0b0b0d", ink: "#f4f4f5" }}
          radius={150}
          height="clamp(440px, 60vw, 560px)"
        />
      )}
    </>
  );
}
