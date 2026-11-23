// ONE SWITCH FOR ALL THE MOTION ON THE SITE.
//
// Some people turn on "Reduce motion" on their device (on a Mac: System
// Settings → Accessibility → Motion). Every animated piece of this site checks
// for that and goes still when it is on: no glitch on the name, no interactive
// footer dots, no dodging button, no gooey nav, no cursor flame, a frozen
// background.
//
//   true  = always animate, even for visitors who have Reduce motion on
//   false = respect the visitor's setting (the usual accessibility practice)
export const ALWAYS_ANIMATE = true;

const QUERY = /prefers-reduced-motion/;

if (typeof window !== "undefined" && window.matchMedia) {
  const real = window.matchMedia.bind(window);
  if (ALWAYS_ANIMATE) {
    // Answer "no" to every reduced-motion question the components ask.
    const never = (media) => ({
      matches: false,
      media,
      onchange: null,
      addEventListener() {},
      removeEventListener() {},
      addListener() {},
      removeListener() {},
      dispatchEvent() { return false; },
    });
    window.matchMedia = (q) => (QUERY.test(q) ? never(q) : real(q));
  } else if (real("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("calm"); // global.css stills the CSS animations
  }
}
