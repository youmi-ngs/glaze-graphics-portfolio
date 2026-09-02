import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Shared fixed nav. Publishes its measured height as --nav-h so home sections
// can offset their scroll targets under the sticky bar.
//
// Route vs. hash links: "/works" is a real route (client-side <Link>, keeps the
// galaxy mounted). About/Contact/brand are home-section anchors written as
// "/#id" — from the home page they just scroll; from /works they load home and
// then jump to the section.
export default function Nav() {
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const setVar = () =>
      document.documentElement.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
    setVar();
    const ro = new ResizeObserver(setVar);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  return (
    <header className="nav" ref={navRef}>
      <a className="brand" href="/#top">
        Glaze&nbsp;Graphics
      </a>
      <nav>
        <Link to="/works">Works</Link>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}
