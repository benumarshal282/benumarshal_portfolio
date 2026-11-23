# Security

This is a static personal portfolio: no accounts, no forms, no database, no
server-side code. The main risks are the usual ones for a static site
(clickjacking, injected scripts, outdated build tools), and they are handled by:

- **Security headers** on every response (`security-headers.js`): a strict
  Content Security Policy (only the site's own scripts can run), no framing,
  no MIME sniffing, HTTPS-only (HSTS), a tight referrer policy, and camera /
  microphone / location access switched off.
- **Dependabot** (`.github/dependabot.yml`) opening weekly pull requests when a
  package has a fix available.
- **No secrets in the repo.** `.env` files are git-ignored; the site needs none.

## Reporting a problem

Found something? Please email the address in
[`/.well-known/security.txt`](public/.well-known/security.txt) rather than
opening a public issue. I'll reply as soon as I can.
