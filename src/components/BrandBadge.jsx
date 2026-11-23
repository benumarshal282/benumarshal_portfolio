// The "BM" badge from 02 Badge.pdf, redrawn as vector shapes so it stays sharp
// at any size. The square takes the site's accent colour (so it follows the
// theme and dark mode) and the letters take --accent-ink.
// Coordinates are the PDF artwork's own (1920 px canvas); the viewBox crops to the badge.
export default function BrandBadge({ className = "" }) {
  return (
    <svg className={className} viewBox="418 418 1082 1082" aria-hidden="true" focusable="false">
      <rect x="418" y="418" width="1082" height="1082" rx="235" fill="var(--accent)" />
      <g fill="none" stroke="var(--accent-ink)" strokeWidth="97">
        {/* B: the two bowls; the stem is the rect below */}
        <path d="M586 706.5H796A116.5 116.5 0 0 1 796 939.5H586" />
        <path d="M586 940.5H813A134.5 134.5 0 0 1 813 1210.5H586" />
      </g>
      <rect x="586" y="658" width="97" height="601" fill="var(--accent-ink)" />
      {/* M */}
      <path
        fill="var(--accent-ink)"
        d="M1018 708L1115 691L1174.5 850L1234 691L1331 708V1259H1234V982L1174.5 1132L1115 982V1259H1018Z"
      />
    </svg>
  );
}
