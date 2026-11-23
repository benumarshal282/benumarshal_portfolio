import { useEffect, useState } from "react";
import { LuStar } from "react-icons/lu";
import { profile } from "../data";

// "★ Star 729": opens the repo on GitHub so visitors can star it.
// The number is the repo's real star count, read from GitHub's public API
// (cached for the visit). If it can't be read, only "Star" shows.
const KEY = "gh-stars";

const short = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : String(n));

export default function StarButton() {
  const repo = profile.repo;
  const [stars, setStars] = useState(() => {
    try { const v = sessionStorage.getItem(KEY); return v === null ? null : Number(v); } catch { return null; }
  });

  useEffect(() => {
    if (!repo || stars !== null) return;
    let gone = false;
    fetch(`https://api.github.com/repos/${repo}`, { headers: { Accept: "application/vnd.github+json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (gone || !d || typeof d.stargazers_count !== "number") return;
        setStars(d.stargazers_count);
        try { sessionStorage.setItem(KEY, String(d.stargazers_count)); } catch { /* fine */ }
      })
      .catch(() => {});
    return () => { gone = true; };
  }, [repo, stars]);

  if (!repo) return null;
  return (
    <a
      className="star-btn"
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Star this site on GitHub${stars !== null ? ` (${stars} stars)` : ""}`}
    >
      <LuStar className="star-btn__icon" aria-hidden="true" />
      <span className="star-btn__text">
        Star
        {stars !== null && <span className="star-btn__count">{short(stars)}</span>}
      </span>
    </a>
  );
}
