import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiPython, SiCplusplus, SiC, SiReact, SiFastapi, SiTensorflow, SiKeras, SiOpencv, SiMediapipe,
  SiArduino, SiEspressif, SiRaspberrypi, SiStmicroelectronics, SiMqtt, SiGit, SiLinux, SiFlutter,
  SiDassaultsystemes,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import {
  LuBrain, LuCpu, LuCode, LuBlocks, LuWrench, LuChevronDown, LuTrees, LuActivity, LuScanText,
  LuSparkles, LuBluetooth, LuCable, LuDatabase, LuBox,
} from "react-icons/lu";
import { toolbox } from "../data";
import LogoLoop from "./LogoLoop";
import SectionHead from "./SectionHead";

// Logo for each skill name used in data.js. A name that isn't here gets a plain box icon.
const ICONS = {
  "TensorFlow": SiTensorflow, "Keras": SiKeras, "OpenCV": SiOpencv, "MediaPipe": SiMediapipe,
  "Random Forest": LuTrees, "LSTM / TCN": LuActivity, "OCR": LuScanText, "LLMs": LuSparkles,
  "ESP32": SiEspressif, "Arduino": SiArduino, "STM32": SiStmicroelectronics, "Raspberry Pi": SiRaspberrypi,
  "MQTT": SiMqtt, "BLE": LuBluetooth, "I2C / SPI": LuCable, "Sensor interfacing": LuActivity,
  "Python": SiPython, "C++": SiCplusplus, "C": SiC, "SQL": LuDatabase,
  "FastAPI": SiFastapi, "React": SiReact, "FlutterFlow": SiFlutter, "Git": SiGit, "Linux": SiLinux, "VS Code": VscVscode,
  "SolidWorks": SiDassaultsystemes, "MATLAB": LuBox,
};
const GROUP_ICONS = { brain: LuBrain, cpu: LuCpu, code: LuCode, blocks: LuBlocks, wrench: LuWrench };

// The slow strip of logos across the top. `speed` below is pixels per second: lower = slower.
const STRIP = ["Python", "C++", "C", "TensorFlow", "Keras", "OpenCV", "Arduino", "ESP32", "STM32", "Raspberry Pi", "MQTT", "FastAPI", "React", "FlutterFlow", "Git", "Linux"];
const logos = STRIP.map((name) => {
  const Icon = ICONS[name];
  return { node: <Icon />, title: name };
});

// One category: a row you click to open. No boxes: hairlines separate the
// rows, and the skills inside are a plain list of logo + name.
function Group({ group, index, open, onToggle }) {
  const Icon = GROUP_ICONS[group.icon] || LuBox;
  const id = `tool-group-${index}`;
  return (
    <div className={`tgroup${open ? " is-open" : ""}`}>
      <button type="button" className="tgroup__head" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <Icon className="tgroup__icon" aria-hidden="true" />
        <span className="tgroup__title">{group.title}</span>
        <span className="tgroup__count">{group.items.length} tools</span>
        <LuChevronDown className="tgroup__chev" aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            className="tgroup__body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="tgroup__list">
              {group.items.map((name) => {
                const I = ICONS[name] || LuBox;
                return <li key={name}><I aria-hidden="true" /><span>{name}</span></li>;
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Toolbox() {
  const [open, setOpen] = useState(() => new Set([0])); // which categories are open; the first starts open
  const toggle = (i) => setOpen((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <section id="toolbox" className="sec" data-mood="toolbox">
      <div className="sec__in">
        <SectionHead n="03" title="Toolbox" sub={`${toolbox.intro} Open a category to see what's in it.`} />
      </div>
      <div className="toolbox__loop">
        <LogoLoop
          logos={logos}
          speed={32}
          direction="left"
          logoHeight={36}
          gap={64}
          labels="inline"
          fadeOut
          fadeOutWidth={0.12}
          draggable
          intro
          ariaLabel="Tools I use"
        />
      </div>
      <div className="sec__in">
        <div className="tgroups">
          {toolbox.groups.map((g, i) => (
            <Group key={g.title} group={g} index={i} open={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>
        <p className="toolbox__now">
          <span className="label">Currently exploring</span>
          {toolbox.exploring.join(" · ")}
        </p>
      </div>
    </section>
  );
}
