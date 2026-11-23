import { useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import GlyphBackground from "./components/GlyphBackground";
import BackgroundPhoto from "./components/BackgroundPhoto";
import Stats from "./components/Stats";
import IntroTerminal from "./components/IntroTerminal";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectsCarousel from "./components/ProjectsCarousel";
import Toolbox from "./components/Toolbox";
import Journey from "./components/Journey";
import AllProjects from "./components/AllProjects";
import Beyond from "./components/Beyond";
import Contact from "./components/Contact";
import ProjectPage from "./components/ProjectPage";
import { applyMode, readMode } from "./components/ThemeSwitch";

// SWITCHES
// The black terminal screen before the site opens. false = go straight to the site.
const SHOW_INTRO = true;
// THEME: the site's colours. "cobalt" | "forest" | "lime" (defined in src/styles/theme.css).
// The intro terminal keeps its own black-and-amber look whatever you pick.
const THEME = "cobalt";
// The photo behind the page that slides as you scroll. false = plain page.
const BG_PHOTO = false;
// The drifting characters behind the page. false = plain page.
const GLYPH_BACKGROUND = false;

// Section order = scroll order, and it matches the nav: About, Work, Toolbox,
// Journey, All projects. Other footer styles (WordmarkFooter, PrismSilkFooter,
// HalftoneWordmarkFooter) are kept and switchable with FOOTER_STYLE in Contact.jsx.
if (typeof document !== "undefined") {
  document.documentElement.dataset.theme = THEME;
  applyMode(readMode()); // light or dark, as last picked with the footer switch
}

export default function App() {
  const [intro, setIntro] = useState(SHOW_INTRO);

  return (
    <>
      {BG_PHOTO && <BackgroundPhoto />}
      {GLYPH_BACKGROUND && <GlyphBackground className="page-glyph" global />}
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <ProjectsCarousel />
        <Toolbox />
        <Journey />
        <AllProjects />
        <Beyond />
        <Contact />
      </main>
      <ProjectPage />
      {intro && <IntroTerminal onDone={() => setIntro(false)} />}
    </>
  );
}
