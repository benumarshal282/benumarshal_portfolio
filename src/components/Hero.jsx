import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { profile } from "../data";
import ThemeSwitch from "./ThemeSwitch";
import StarButton from "./StarButton";

// The DVD-screensaver: the image drifts and bounces off the hero's edges.
// Clicking it opens the CV (profile.cv in data.js) in a new tab; it holds
// still while the cursor is on it so it is easy to hit.
// Swap the picture by replacing /public/my-cv.webp.
function Bouncer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const box = el.parentElement;
    const TOP = 62; // bounce off the nav bar, not under it
    let W = 0, H = 0, w = 0, h = 0, speed = 150;
    let x = 60, y = 140, ang = Math.random() * Math.PI * 2;
    let vx = Math.cos(ang), vy = Math.sin(ang); // direction only; speed is applied per frame
    let raf = 0, last = 0, visible = true, paused = false;

    const place = () => { el.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const measure = () => {
      W = box.clientWidth; H = box.clientHeight; w = el.offsetWidth; h = el.offsetHeight;
      speed = Math.max(120, Math.min(210, W * 0.13));
      x = Math.max(0, Math.min(x, W - w)); y = Math.max(TOP, Math.min(y, H - h));
      place();
    };
    // After every wall hit pick a new random direction. About 1 time in 3 it
    // aims straight at a corner, so every corner gets hit sooner or later.
    const redirect = (nx, ny) => {
      if (Math.random() < 0.34) {
        const cx = Math.random() < 0.5 ? 0 : W - w, cy = Math.random() < 0.5 ? TOP : H - h;
        const dx = cx - x, dy = cy - y, d = Math.hypot(dx, dy);
        if (d > 80 && dx * nx + dy * ny > 0) { vx = dx / d; vy = dy / d; return; }
      }
      const a = Math.atan2(ny, nx) + (Math.random() - 0.5) * 2.4; // up to ~70° either side of straight out
      vx = Math.cos(a); vy = Math.sin(a);
    };
    const tick = (now) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      if (!paused) {
        x += vx * speed * dt; y += vy * speed * dt;
        const hitL = x <= 0, hitR = x >= W - w, hitT = y <= TOP, hitB = y >= H - h;
        if (hitL) x = 0; if (hitR) x = W - w; if (hitT) y = TOP; if (hitB) y = H - h;
        const nearX = x < 3 || x > W - w - 3, nearY = y < TOP + 3 || y > H - h - 3;
        if (hitL || hitR || hitT || hitB) {
          if (nearX && nearY) { // the corner everybody waits for
            el.classList.remove("is-corner"); void el.offsetWidth; el.classList.add("is-corner");
          }
          const nx = x <= 0 ? 1 : x >= W - w ? -1 : 0, ny = y <= TOP ? 1 : y >= H - h ? -1 : 0;
          redirect(nx, ny);
        }
      }
      // fades away as the hero scrolls off, so it never follows you down the page
      const o = Math.max(0, 0.95 * (1 - window.scrollY / (H * 0.55)));
      el.style.opacity = o;
      el.style.pointerEvents = o < 0.15 ? "none" : "";
      place();
      raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const hold = () => { paused = true; };
    const release = () => { paused = false; };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box); ro.observe(el);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(box);
    el.addEventListener("pointerenter", hold);
    el.addEventListener("pointerleave", release);
    el.addEventListener("focus", hold);
    el.addEventListener("blur", release);
    start();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      el.removeEventListener("pointerenter", hold);
      el.removeEventListener("pointerleave", release);
      el.removeEventListener("focus", hold);
      el.removeEventListener("blur", release);
    };
  }, []);

  return (
    <a
      ref={ref}
      className="hero__bouncer"
      href={`${import.meta.env.BASE_URL}${profile.cv}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${profile.fullName}'s CV (PDF)`}
      title="Open my CV"
      draggable="false"
    >
      <img src={`${import.meta.env.BASE_URL}my-cv.webp`} alt="" draggable="false" />
      <span className="hero__click">Click this</span>
    </a>
  );
}

// The landing section. Edit the words here; the sizes are the "knobs" at the top
// of the hero block in src/styles/site.css. The right-hand side is left empty on
// purpose, to be filled later.
// SPEED: each line rises in this many seconds, one after another.
const RISE = 1.1;
const STAGGER = 0.22;
const rise = (step) => ({
  initial: { opacity: 0, y: 34 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.15 + step * STAGGER, duration: RISE, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section id="top" className="hero2" data-mood="hero">
      {/* The bouncing "My CV" picture is switched off. Put <Bouncer /> back here to bring it back. */}
      <div className="hero2__in">
        {/* kicker on the left; GitHub star + light/dark switch on the right */}
        <motion.div className="hero2__top" {...rise(0)}>
          <p className="kicker">Mechatronics engineer · Coimbatore, India</p>
          <div className="hero2__tools">
            <StarButton />
            <ThemeSwitch />
          </div>
        </motion.div>
        <h1 className="hero2__title" aria-label="I build machines that think.">
          <motion.span {...rise(1)}>I build</motion.span>
          <motion.span className="is-outline" {...rise(2)}>machines</motion.span>
          <motion.span {...rise(3)}>that think.</motion.span>
        </h1>
        <div className="hero2__foot">
          <motion.p className="hero2__lede" {...rise(4.5)}>
            Third-year mechatronics student working where embedded hardware meets applied AI — sensors,
            microcontrollers and models that have to survive contact with the real world. Nine built projects,
            from a knee-screening wearable to an energy-harvesting speed breaker.
          </motion.p>
          <motion.div className="hero2__ctas" {...rise(5.5)}>
            <a className="btn-solid" href="#contact">Work with me <span aria-hidden="true">→</span></a>
            <a className="btn-line" href="#work">See selected work</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
