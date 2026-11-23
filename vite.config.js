import { readFileSync } from "node:fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { SECURITY_HEADERS, META_CSP } from "./security-headers.js";

// Adds the security layer to production builds (see security-headers.js).
// The dev server (`npm run dev`) is left alone: its live reloading needs inline scripts.
function securityHeaders() {
  return {
    name: "security-headers",
    apply: "build",
    // 1. a CSP <meta> tag inside the page, for hosts that can't send headers
    transformIndexHtml() {
      return [{ tag: "meta", attrs: { "http-equiv": "Content-Security-Policy", content: META_CSP }, injectTo: "head-prepend" }];
    },
    // 2. dist/_headers for Netlify / Cloudflare Pages
    generateBundle() {
      const lines = Object.entries(SECURITY_HEADERS).map(([k, v]) => `  ${k}: ${v}`).join("\n");
      this.emitFile({ type: "asset", fileName: "_headers", source: `/*\n${lines}\n` });
      // 3. warn if vercel.json has drifted from the list
      try {
        const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
        const got = Object.fromEntries(vercel.headers[0].headers.map((h) => [h.key, h.value]));
        const off = Object.keys(SECURITY_HEADERS).filter((k) => got[k] !== SECURITY_HEADERS[k]);
        if (off.length) this.warn(`vercel.json headers differ from security-headers.js: ${off.join(", ")}`);
      } catch {
        this.warn("vercel.json missing or unreadable; Vercel deploys won't get the security headers");
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), securityHeaders()],
  build: { sourcemap: false }, // don't publish the original source maps
  preview: { headers: SECURITY_HEADERS }, // `npm run preview` behaves like the real host
});
