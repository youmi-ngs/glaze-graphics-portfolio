import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GalaxyBg from './GalaxyBg.jsx';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import WorksPage from './WorksPage.jsx';

// On navigation: if the URL carries a #hash, smooth-scroll to that section
// (works across routes too — e.g. /works → /#about client-navigates home and
// then scrolls, instead of a full reload landing at the top). Otherwise jump to
// the top. rAF waits one frame so the target section is mounted and laid out.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
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
  }, [pathname, hash]);
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
