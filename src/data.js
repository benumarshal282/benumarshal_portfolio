// ALL CONTENT LIVES HERE. Anything marked TODO is a placeholder you must replace.

export const profile = {
  name: "Marshal",
  fullName: "Benu Marshal",
  role: "Mechatronics Engineering · 3rd year",
  tagline: "I build embedded hardware and AI software, and I lead a team of three doing it.",
  looking: "Open to internships & entry-level roles", // TODO: name your target domain
  location: "Coimbatore, TN",
  email: "benumarshal61@gmail.com",
  avatar: "", // your face in the top-left circle, e.g. "photos/me-face.jpg" (file in /public). Empty = the "BM" mark.
  // The repository the "Star" button in the hero points to ("user/repo").
  // Its star count is read live from GitHub; if the repo doesn't exist yet, the count is hidden.
  repo: "benumarshal282/benumarshal_portfolio",
  cv: "Benu-Marshal-CV.pdf", // file in /public — clicking the bouncing Steve opens it
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/benu-marshal" },
    { label: "GitHub", href: "https://github.com/benumarshal282" },
    { label: "Instagram", href: "https://www.instagram.com/itz___ben.10/" },
    { label: "X", href: "https://x.com/BenuM80743" },
  ],
};

// Old flat list. Only the retired falling-chips section (Skills.jsx) reads it now.
export const skills = [
  "Python", "C++", "C", "SQL", "React",
  "FastAPI", "LLMs", "Agentic AI", "Machine Learning", "Edge AI",
  "TensorFlow", "OpenCV", "OCR", "Blockchain", "ESP32",
  "Arduino", "Raspberry Pi", "STM32", "MQTT", "SolidWorks",
];

// All the projects. featured: true = one of the four shown in the Work section;
// every project is listed in "All projects".
// link: paste the GitHub repository or live URL of each project. While it is empty the button is greyed out.
// thumb: the stand-in stock photo shown on hover in "All projects"; swap in your own.
// image: add e.g. image: "photos/drishti.jpg" (file in /public/photos) to show a picture; without it a generated cover shows.
export const projects = [
  {
    title: "DRISHTI", featured: true,
    thumb: "photos/projects/drishti.jpg", // the picture that follows the pointer in "All projects"
    tag: "Biomedical · Embedded AI",
    blurb: "Wearable knee-response screening: motion and foot-pressure sensing feeds a Random Forest model that outputs a LOW / MODERATE / HIGH risk-marker category.",
    core: "Multimodal assessment: movement, plantar loading, function, pain and recovery combined, not one sensor. Mobile app built; not clinically validated.",
    stack: ["ESP32", "MPU6050", "FSR", "Random Forest", "BLE", "FlutterFlow"],
    link: "", // TODO: GitHub or live URL
    // The project page (opens when someone clicks this project in Work).
    // steps = "How it works", in order. status = where it stands. stack above is reused.
    details: {
      problem: "Knee assessment often rests on a single observation or a single sensor. DRISHTI makes it more measurable by combining how the leg moves, how load falls under the foot, and how the person actually functions and feels.",
      steps: [
        { t: "Sense", d: "Two MPU6050 IMUs capture lower-limb movement. FSR sensors under the foot capture plantar loading, read through an ADS1115 converter." },
        { t: "Collect", d: "An ESP32 gathers and processes the readings, then sends them to the phone over Bluetooth Low Energy." },
        { t: "Combine", d: "The sensor data is joined with functional and self-reported inputs to form six indicators." },
        { t: "Classify", d: "A Random Forest model places the result in a LOW, MODERATE or HIGH risk-marker category." },
        { t: "Explain", d: "The FlutterFlow app shows the category, the indicators behind it and a \"Why was it flagged?\" explanation, so the result is never just a label." },
      ],
      extra: {
        title: "The six indicators",
        items: [
          { t: "Knee range of motion", d: "How far the knee moves, from the motion data." },
          { t: "Gait symmetry", d: "Left and right movement patterns compared." },
          { t: "Loading asymmetry", d: "Differences in foot loading between the two sides." },
          { t: "Functional performance", d: "Includes a timed sit-to-stand test." },
          { t: "Pain score", d: "Reported by the person." },
          { t: "Recovery time", d: "Reported or recorded." },
        ],
      },
      status: "A developed screening prototype. It supports decisions; it does not diagnose, and it has not been clinically validated. Next: documenting sensor calibration, the full BLE path and how the model was evaluated.",
    },
  },
  {
    title: "Unfold", featured: true,
    thumb: "photos/projects/unfold.jpg", // the picture that follows the pointer in "All projects"
    tag: "Generative AI · Web app",
    blurb: "Turns reference documents and spoken explanation into presentations, with live voice-driven slide suggestions the presenter approves or rejects.",
    core: "Connects document understanding, slide creation, speech recognition and presenter-approved live assistance in one app.",
    stack: ["LLMs", "Speech-to-text", "RAG", "Next.js", "FastAPI"],
    link: "", // TODO: GitHub or live URL
    details: {
      problem: "Most AI slide tools turn a prompt into a fixed deck. But hard ideas get explained live, by talking, and the slides can't keep up with what the speaker is actually saying.",
      steps: [
        { t: "Give it sources", d: "Documents, text, an existing deck, or just the name of a reference book." },
        { t: "Understand", d: "It extracts the text and structure, then finds the topics, subtopics and how they connect." },
        { t: "Prepare", d: "It generates an outline, puts it in a logical order and builds the first slides." },
        { t: "Go live", d: "The microphone turns speech into text, which is compared with the sources and the slide on screen." },
        { t: "Decide", d: "It works out what is being explained and whether to add a slide, update one, add a visual, or simply wait. It never makes a slide for every sentence." },
        { t: "Wrap up", d: "Save the deck, export notes or a PDF, and get a list of topics that were not covered, to explain later." },
      ],
      extra: {
        title: "What it asks itself while you speak",
        list: [
          "What topic is being explained right now?",
          "Is this a new idea, or a continuation?",
          "Is it a definition, an example, a comparison or a process?",
          "Does the slide on screen already show this?",
          "Would text, a diagram, a chart, an image or a 3D visual explain it best?",
          "Is there enough to go on, or should it wait for more speech?",
        ],
      },
      status: "A detailed product specification and a browser prototype of the workflow, in active development. The speaker stays in control: every live suggestion can be approved, edited or rejected. Being explored next: a desktop companion with its own .ben presentation file.",
    },
  },
  {
    title: "CertifySecure", featured: true,
    thumb: "photos/projects/certifysecure.jpg", // the picture that follows the pointer in "All projects"
    tag: "Document intelligence · Trust",
    blurb: "Certificate verification platform: OCR extraction, anomaly flagging and institution record matching for old paper and new digital certificates.",
    core: "Combines legacy document intelligence with trusted digital verification in a single workflow.",
    stack: ["OCR", "OpenCV", "AI/ML", "Blockchain", "PostgreSQL", "QR verification"],
    link: "", // TODO: GitHub or live URL
    details: {
      problem: "Recruiters check qualifications by contacting schools and colleges one by one. It is slow, repetitive and hard to scale, and fake or altered certificates add real risk.",
      steps: [
        { t: "Verifier signs in", d: "The recruiter authenticates first, through a DigiLocker or fingerprint style step." },
        { t: "Candidate confirms", d: "The candidate completes their own identity check." },
        { t: "Records are fetched", d: "The system looks up the candidate's registered records and their blockchain-backed proofs." },
        { t: "Documents are checked", d: "OCR reads each certificate, and document checks look at seals, signatures and anything inconsistent." },
        { t: "Status is shown", d: "One folder per person, covering 10th, 12th, college and internship certificates, each clearly marked." },
      ],
      extra: {
        title: "What the verifier sees",
        items: [
          { t: "Approved", d: "The certificate checks out and carries a clear verified mark." },
          { t: "Not yet approved", d: "An incomplete degree or an unresolved backlog, marked in red." },
          { t: "Updated", d: "Once the conditions are cleared, the status changes on the record." },
        ],
      },
      status: "Concept and architecture plan. Proposed: SQL for accounts and certificate data, object storage for scans, blockchain hashes for tamper-proof records, and QR or NFC to open a record. Not yet connected to real institutions.",
    },
  },
  {
    title: "Career Launch", featured: true,
    thumb: "photos/projects/career-launch.jpg", // the picture that follows the pointer in "All projects"
    tag: "AI · Career tech",
    blurb: "One living career profile that drives role matching, skill-gap roadmaps and tailored resumes. India-first.",
    core: "Everything runs off a single approved profile instead of five disconnected tools.",
    stack: ["Next.js", "FastAPI", "LLMs", "Resume parsing", "PostgreSQL"],
    link: "", // TODO: GitHub or live URL
    details: {
      problem: "Career advice usually stops at advice. Students and freshers are left to work out the learning, the resume and the applications on their own, across five disconnected tools.",
      steps: [
        { t: "Build a profile", d: "Upload a resume and answer branching questions about interests, skills, values, goals and experience." },
        { t: "Discover paths", d: "Career paths are recommended from that profile using transparent, rule-based scoring. You can follow more than one." },
        { t: "Explore companies", d: "Roles, internships, required skills, opening and closing dates, and links to apply." },
        { t: "Learn the gaps", d: "Pick a missing skill and get sent to free courses. Progress is self-reported, with proof optional." },
        { t: "Improve the resume", d: "AI reads the resume, finds gaps for a role and suggests changes. Nothing changes without your approval, and nothing is invented." },
        { t: "Match and apply", d: "An explainable job-fit score shows the skills you have and the gaps, then sends you to the official application page and tracks it." },
      ],
      extra: {
        title: "The loop it runs on",
        flow: ["Discover", "Assess", "Learn", "Build", "Update", "Match", "Apply", "Improve"],
      },
      status: "A detailed product blueprint with the first version chosen: Profile, Company Explorer, Skill Roadmap, Resume and Job Matching. India-first, for everyone from school students to freshers.",
    },
  },
  {
    title: "No Tech Zone",
    thumb: "photos/projects/no-tech-zone.jpg", // the picture that follows the pointer in "All projects"
    tag: "Embedded · Connected apps",
    blurb: "Admin-controlled system to reduce phone distraction in classrooms and exam halls, using device-supported controls and a companion app.",
    core: "Coordinated hardware and software workflow for communicating and managing phone-use policy, with emergency access kept open.",
    stack: ["Embedded", "Mobile app", "Access control"],
    link: "", // TODO: GitHub or live URL
  },
  {
    title: "Power Pavers",
    thumb: "photos/projects/power-pavers.jpg", // the picture that follows the pointer in "All projects"
    tag: "Energy · Mechanical design",
    blurb: "A speed breaker that turns the impact of passing vehicles into usable electrical power.",
    core: "Gear-linkage transmission and generator assembly, with load-to-output efficiency checked in SolidWorks.",
    stack: ["Mechanical transmission", "Generator", "SolidWorks"],
    link: "", // TODO: GitHub or live URL
  },
  {
    title: "Line Follower & Maze Solver",
    thumb: "photos/projects/line-follower.jpg", // the picture that follows the pointer in "All projects"
    tag: "Robotics · Control",
    blurb: "A PID-controlled line follower with an IR sensor array, and a maze solver running flood-fill on the robot itself.",
    core: "Control and path-finding both run on the embedded hardware.",
    stack: ["Arduino", "C++", "IR sensors", "PID control"],
    link: "", // TODO: GitHub or live URL
  },
  {
    title: "Bus Reservation System",
    thumb: "photos/projects/bus.jpg", // the picture that follows the pointer in "All projects"
    tag: "Software · Databases",
    blurb: "A bus-booking app with real-time seat management and booking-conflict resolution.",
    core: "Built on a normalised database schema.",
    stack: ["Python", "SQL"],
    link: "", // TODO: GitHub or live URL
  },
  {
    title: "My portfolio",
    tag: "Web · Design",
    blurb: "This site: a single-page portfolio with scroll-driven project showcase, animated sections and a terminal-style intro.",
    core: "Designed and built from scratch; every section reads its content from one data file.",
    stack: ["React", "Vite", "Framer Motion", "CSS"],
    link: "", // TODO: live URL once deployed
  },
];

// Add real photos here: { src: "/photos/me1.jpg", alt: "what is in it" }
// Put the files in /public/photos. While this list is empty, the photo strip is hidden.
export const photos = [];

// ---------------------------------------------------------------------------
// ABOUT. Put your photo in /public/photos and write its file name in `photo`
// (for example "photos/me.jpg"). While it is empty a placeholder frame shows.
export const about = {
  photo: "", // TODO: your picture
  photoAlt: "Benu Marshal",
  lead: "I'm a Mechatronics Engineering student who likes exploring beyond the obvious. I build things, experiment with ideas, and rarely stick to just one field.",
  story: [
    "I've always been interested in understanding how things work and, more importantly, figuring out how to make them work better. My interests move between hardware, software, robotics, AI, and pretty much anything that catches my curiosity. I enjoy connecting different fields, trying things I've never done before, and seeing what comes out of it. I'm not particularly interested in putting myself into one specific box.",
    "I learn best by actually doing things. Most of my ideas start with a rough concept, a lot of questions, and usually a few things that don't work the way I expected. From building line-following robots and an energy-harvesting speed breaker to working on DRISHTI, a wearable knee-screening prototype, I've enjoyed figuring things out along the way more than following a perfect roadmap.",
    "Right now, I'm exploring embedded AI, robotics, and agentic software, while also getting curious about startups and how technology can become something people actually use. There's a lot I haven't tried yet, and that's probably my favourite part.",
  ],
  exploring: ["Embedded AI", "Agentic software", "Robotics", "Product building"],
};

// JOURNEY. Education and internships only. `when` is the label on the left:
// a date if you know it, a word if you don't. TODO: fill in the real dates.
export const journey = [
  {
    when: "Present",
    title: "B.E. Mechatronics Engineering",
    place: "SNS College of Technology, Coimbatore",
    text: "Currently in my third year.",
  },
  {
    when: "July 2025",
    title: "Mechanical Engineering Intern",
    place: "Swarnaraj Engineering Works",
    text: "Fabrication, assembly, quality inspection and machine maintenance on a production floor.",
  },
  {
    when: "Internship",
    title: "Python Application Developer Intern",
    place: "Techinta",
    text: "Python apps with data pipelines, automation scripts and REST APIs in a shared Git codebase.",
  },
  {
    when: "Training",
    title: "Ethical Hacking Internship Training",
    place: "Appin Technology, Coimbatore",
    text: "Hands-on training in ethical hacking and security fundamentals.",
  },
  {
    when: "In the process",
    title: "A startup of my own",
    text: "Early days: shaping one of my ideas into a company.", // TODO: say what it is when you're ready
  },
];

// TOOLBOX. Each group is a box you click to open. Only list what you can explain using in a project.
// To give a new item its own logo, add it to ICONS in components/Toolbox.jsx.
export const toolbox = {
  intro: "The technologies, tools and systems I use to turn ideas into reality.",
  groups: [
    { title: "AI & Intelligence", icon: "brain", items: ["TensorFlow", "Keras", "OpenCV", "MediaPipe", "Random Forest", "LSTM / TCN", "OCR", "LLMs"] },
    { title: "Embedded Systems", icon: "cpu", items: ["ESP32", "Arduino", "STM32", "Raspberry Pi", "MQTT", "BLE", "I2C / SPI", "Sensor interfacing"] },
    { title: "Programming", icon: "code", items: ["Python", "C++", "C", "SQL"] },
    { title: "Development", icon: "blocks", items: ["FastAPI", "React", "FlutterFlow", "Git", "Linux", "VS Code"] },
    { title: "Engineering & Creative Tools", icon: "wrench", items: ["SolidWorks", "MATLAB"] },
  ],
  exploring: ["Agentic AI", "Edge AI", "Robotics", "Automation"],
};

// BEYOND ENGINEERING. A row of picture cards you slide through.
// TODO: the text is draft. Rewrite it in your own words and delete anything that isn't true.
// To add a card: copy one line, change the text, and point `image` at a file in /public/photos.
// The current pictures are free stock photos from Unsplash; swap in your own whenever you like.
export const beyond = {
  title: "Beyond engineering",
  intro: "Not everything I explore fits into an engineering project. These are the things that keep me curious and creative.",
  cards: [
    { title: "Content creation", image: "photos/beyond/content.jpg", text: "Short-form videos, editing and motion graphics." },
    { title: "Design experiments", image: "photos/beyond/design.jpg", text: "Layouts, motion and interactive visuals. This site is one of them." },
    { title: "Board games", image: "photos/beyond/boardgames.jpg", text: "Strategy, tabletop games, and the people around the table." },
    { title: "Side ideas", image: "photos/beyond/ideas.jpg", text: "Small prototypes I build just to see whether they work." },
    { title: "A startup of my own", label: "On the horizon", image: "photos/beyond/startup.jpg", text: "Taking one of these ideas past the prototype." },
  ],
};

// THE NUMBERS under the hero (the "trust" strip). n = the number, plus = add a "+",
// text = the line underneath. Add or remove entries freely (four fit one row).
export const stats = [
  { n: 10, plus: true, text: "Competitions won across IIT tech fests, robotics challenges and project expos" },
  { n: 3, text: "Internships: mechanical fabrication, Python development, ethical hacking" },
  { n: 9, text: "Projects built end to end — hardware, firmware, model and interface" },
  { n: 4, text: "Student bodies: IEEE, Robotics Club SNS, Rotaract Spectrum, IMUN" },
];
