import "./motion"; // must stay first: decides whether the site animates
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/theme.css";
import "./styles/global.css";
import "./styles/site.css";

createRoot(document.getElementById("root")).render(<App />);
