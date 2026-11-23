import { Children, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// The pasted Terminal component, converted to plain JSX for this project:
// "motion/react" -> "framer-motion", Tailwind classes -> classes in site.css.
// Behaviour is unchanged: inside <Terminal>, each child waits for the one
// before it to finish (typing, or fading in) before it starts.

const cn = (...c) => c.filter(Boolean).join(" ");

const SequenceContext = createContext(null);
const useSequence = () => useContext(SequenceContext);
const ItemIndexContext = createContext(null);
const useItemIndex = () => useContext(ItemIndexContext);

const motionElements = {
  article: motion.article, div: motion.div, h1: motion.h1, h2: motion.h2, h3: motion.h3,
  h4: motion.h4, h5: motion.h5, h6: motion.h6, li: motion.li, p: motion.p,
  section: motion.section, span: motion.span,
};

// pause: seconds to wait (inside a sequence) before this line fades in. duration: how long the fade takes.
export const AnimatedSpan = ({ children, delay = 0, pause = 0, duration = 0.3, className, startOnView = false, ...props }) => {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });
  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!sequence || itemIndex === null) return;
    if (!sequence.sequenceStarted) return;
    if (hasStarted) return;
    if (sequence.activeIndex === itemIndex) setHasStarted(true);
  }, [sequence, hasStarted, itemIndex]);

  const shouldAnimate = sequence ? hasStarted : startOnView ? isInView : true;

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration, delay: sequence ? pause : delay / 1000 }}
      className={cn("term__span", className)}
      onAnimationComplete={() => {
        if (!sequence || itemIndex === null) return;
        sequence.completeItem(itemIndex);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// prefix: something shown in front of the typed text straight away (e.g. a shell prompt).
export const TypingAnimation = ({
  children, className, duration = 60, delay = 0, as: Component = "span", startOnView = true, prefix = null, ...props
}) => {
  if (typeof children !== "string") throw new Error("TypingAnimation: children must be a string.");
  const MotionComponent = motionElements[Component];

  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { amount: 0.3, once: true });

  const sequence = useSequence();
  const itemIndex = useItemIndex();
  const hasSequence = sequence !== null;
  const sequenceStarted = sequence?.sequenceStarted ?? false;
  const sequenceActiveIndex = sequence?.activeIndex ?? null;
  const completeRef = useRef(null);
  const indexRef = useRef(null);

  useEffect(() => {
    completeRef.current = sequence?.completeItem ?? null;
    indexRef.current = itemIndex;
  }, [sequence?.completeItem, itemIndex]);

  useEffect(() => {
    let startTimeout = null;
    if (hasSequence && itemIndex !== null) {
      if (sequenceStarted && !started && sequenceActiveIndex === itemIndex) setStarted(true);
    } else if (!startOnView || isInView) {
      startTimeout = setTimeout(() => setStarted(true), delay);
    }
    return () => { if (startTimeout !== null) clearTimeout(startTimeout); };
  }, [delay, startOnView, isInView, started, hasSequence, sequenceActiveIndex, sequenceStarted, itemIndex]);

  useEffect(() => {
    let typing = null;
    if (started) {
      let i = 0;
      typing = setInterval(() => {
        if (i < children.length) {
          setDisplayedText(children.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          const complete = completeRef.current;
          if (complete && indexRef.current !== null) complete(indexRef.current);
        }
      }, duration);
    }
    return () => { if (typing !== null) clearInterval(typing); };
  }, [children, duration, started]);

  return (
    <MotionComponent ref={elementRef} className={cn("term__type", className)} {...props}>
      {started && prefix}{displayedText}
      {started && displayedText.length < children.length && <span className="term__block" aria-hidden="true" />}
    </MotionComponent>
  );
};

export const Terminal = ({ children, className, title, sequence = true, startOnView = true }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });
  const [activeIndex, setActiveIndex] = useState(0);
  const sequenceHasStarted = sequence ? !startOnView || isInView : false;

  const contextValue = useMemo(() => {
    if (!sequence) return null;
    return {
      completeItem: (index) => setActiveIndex((current) => (index === current ? current + 1 : current)),
      activeIndex,
      sequenceStarted: sequenceHasStarted,
    };
  }, [sequence, activeIndex, sequenceHasStarted]);

  const wrapped = useMemo(() => {
    if (!sequence) return children;
    return Children.toArray(children).map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>{child}</ItemIndexContext.Provider>
    ));
  }, [children, sequence]);

  const content = (
    <div ref={containerRef} className={cn("term", className)}>
      <div className="term__bar">
        <span className="term__dot is-red" /><span className="term__dot is-yellow" /><span className="term__dot is-green" />
        {title && <span className="term__title">{title}</span>}
      </div>
      <pre className="term__body"><code className="term__code">{wrapped}</code></pre>
    </div>
  );

  if (!sequence) return content;
  return <SequenceContext.Provider value={contextValue}>{content}</SequenceContext.Provider>;
};

export default Terminal;
