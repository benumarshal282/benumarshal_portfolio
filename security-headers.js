// THE SITE'S SECURITY HEADERS: one list, used everywhere.
//   - vite.config.js applies them to `npm run preview` (to test locally) and writes
//     dist/_headers at build time (Netlify, Cloudflare Pages read that file).
//   - vercel.json has the same list for Vercel (the build warns if it drifts).
//   - the page itself also carries the CSP as a <meta> tag after build, so hosts
//     that can't send headers (e.g. GitHub Pages) still get most of the protection.
//
// If you add something that loads from a new website (a font, an analytics
// script, an embed), add that site to the matching line of CSP below, or the
// browser will block it.

export const CSP = [
  "default-src 'self'",
  "script-src 'self'", // only the site's own bundled code; no inline or third-party scripts
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // footers use inline <style>
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self' https://api.github.com", // the Star button's live count
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'", // the site has no forms
  "frame-ancestors 'none'", // nobody may put this site inside a frame (clickjacking)
  "upgrade-insecure-requests",
].join("; ");

export const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP,
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
};

// The CSP as a <meta> tag can't use these (browsers ignore them there).
export const META_CSP = CSP.split("; ")
  .filter((d) => !/^(frame-ancestors|upgrade-insecure-requests)/.test(d))
  .join("; ");
