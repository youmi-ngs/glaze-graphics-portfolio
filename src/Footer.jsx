import { SOCIALS } from "./social.js";

// Shared full-width footer. Used at the bottom of both the home Contact section
// and the Works page. Social links are text-only here (icons live in the About
// modal); order comes from SOCIALS.
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-inner">
        <span className="footer-copy">
          <a className="footer-brand" href="/#top">Glaze&nbsp;Graphics</a>
          <span> © {year} Youmi Nagase</span>
        </span>

        <div className="footer-social">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
