import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import GalaxyBg from './GalaxyBg.jsx';
import Nav from './Nav.jsx';
import Home from './Home.jsx';
import WorksPage from './WorksPage.jsx';

// On route change, jump to the top (unless the URL carries a #hash, in which
// case the browser handles the in-page scroll itself).
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <GalaxyBg />
      <Nav />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </>
  );
}
