// The pasted "Wordmark footer", converted to plain JSX + CSS (classes "wmf" in
// site.css): a short description, link columns that fold away on phones, and the
// name set large at the bottom, fading into the background.
export default function WordmarkFooter({ name, legalName, year, description, email, status, navLabel = "Footer", columns, credit }) {
  return (
    <footer className="wmf">
      <div className="wmf__top">
        <div>
          <span className="wmf__name">{name}</span>
          {description && <p className="wmf__desc">{description}</p>}
          {status && <p className="wmf__status"><span aria-hidden="true" />{status}</p>}
        </div>
        <nav aria-label={navLabel} className="wmf__cols">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="wmf__h">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* phones: each column folds away; tap a heading to open it */}
        <nav aria-label={navLabel} className="wmf__fold">
          {columns.map((col) => (
            <details key={col.title}>
              <summary><span className="wmf__h">{col.title}</span><i aria-hidden="true">+</i></summary>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}><a href={l.href} {...external(l.href)}>{l.label}</a></li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>
      <div className="wmf__bottom">
        <p>© {year} {legalName ?? name}</p>
        {email && <a href={`mailto:${email}`}>{email}</a>}
        {credit && <a className="wmf__credit" href={credit.href}>{credit.label}</a>}
      </div>
      <p className="wmf__big" aria-hidden="true">{name}</p>
    </footer>
  );
}

const external = (href) => (/^https?:/.test(href) ? { target: "_blank", rel: "noreferrer" } : {});
