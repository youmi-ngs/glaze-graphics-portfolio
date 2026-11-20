import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GalaxyBg from './GalaxyBg.jsx';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import WorksPage from './WorksPage.jsx';

// On navigation: if the URL carries a #hash, smooth-scroll to that section.
// Otherwise jump to the top. rAF waits one frame so the target is laid out.
// Home is a translate-based deck (overflow:hidden) that maps the hash to a
// panel itself — scrollIntoView there would ALSO scroll the hidden viewport
// mid-transition and overshoot by a panel, so Home is left alone.
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash && pathname !== '/') {
      const id = hash.slice(1);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      });
    } else {
      // Instant (not smooth) — a route change should land at the top at once;
      // a smooth animation can stall while the new page is still laying out.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, key]); // key: re-clicking the current link still scrolls
  return null;
}

export default function App() {
  return (
    <>
      <GalaxyBg />
      <Nav />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </>
  );
}
