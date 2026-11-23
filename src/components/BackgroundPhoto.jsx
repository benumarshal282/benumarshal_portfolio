import { motion, useScroll, useTransform } from "framer-motion";

// The photo behind the whole page. It is taller than the screen and slides up
// slower than the page as you scroll (parallax), so the background moves with you.
// Swap the picture by replacing /public/photos/bg-factory.jpg, or change SRC.
// How visible it is: --photo-strength in site.css (the "bgphoto" block).
const SRC = "photos/bg-factory.jpg";
// How far it travels over the whole page, in % of its own height. 0 = it stays still.
const TRAVEL = 33;

export default function BackgroundPhoto() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `-${TRAVEL}%`]);

  return (
    <div className="bgphoto" aria-hidden="true">
      <motion.img className="bgphoto__img" src={import.meta.env.BASE_URL + SRC} alt="" style={{ y }} />
    </div>
  );
}
