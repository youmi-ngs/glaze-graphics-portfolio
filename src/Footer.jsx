// Shared full-width footer. Used at the bottom of both the home Contact section
// and the Works page.
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
          <a href="https://github.com/youmi-ngs" target="_blank" rel="noopener noreferrer">GitHub</a>
          {/* TODO: real handles — placeholders for now */}
          <a href="https://instagram.com/glaze.graphics" target="_blank" rel="noopener noreferrer" aria-label="Instagram (TBD)">
            Instagram
          </a>
          <a href="https://twitter.com/glaze_graphics" target="_blank" rel="noopener noreferrer" aria-label="Twitter (TBD)">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
