# Putting this site on the web

## 0. One thing first (do this once)

After downloading the project (or on a new computer), install its packages. Open Terminal:

```bash
cd ~/Documents/Projects\ /marshal-portfolio
npm install
```

Until you do this, `npm run dev` and `npm run build` will both fail on your Mac.

To see it locally after that:

```bash
npm run dev          # opens http://localhost:5173
```

---

## Option A — live URL in about 60 seconds, no terminal

There is already a built copy of the site in the `dist/` folder.

1. Go to **https://app.netlify.com/drop**
2. Drag the whole **`dist`** folder onto the page.
3. You get a live URL straight away (something like `random-name-123.netlify.app`).

Good for showing someone right now. Free. You can rename the site or add your
own domain later from the Netlify dashboard.

---

## Option B — Vercel (what you actually want long term)

Vercel wants a Git repo. Two steps:

### 1. Put the code on GitHub

```bash
cd ~/Documents/Projects\ /marshal-portfolio
printf 'node_modules\ndist\n.DS_Store\n' > .gitignore
git init
git add .
git commit -m "portfolio site"
```

Then make an empty repo on github.com (no README, no .gitignore), and:

```bash
git remote add origin https://github.com/<your-username>/marshal-portfolio.git
git branch -M main
git push -u origin main
```

### 2. Import it on Vercel

1. Go to **https://vercel.com/new**
2. Sign in with GitHub.
3. Pick `marshal-portfolio`.
4. Vercel detects Vite on its own — **change nothing**, just press Deploy.
   (Framework: Vite · Build: `npm run build` · Output: `dist`)

After this, every `git push` redeploys the site automatically.

### Or skip GitHub and use the Vercel CLI

```bash
npm i -g vercel
vercel login        # opens your browser
vercel --prod       # answer the prompts, accept the defaults
```

---

## After it is live

Paste the project URLs into `src/data.js` — the `link: ""` field on each
project. That turns the greyed-out **Open app ↗** buttons into real links and
fills the Work column in the footer.
