import Galaxy from './Galaxy.jsx';

// Persistent animated starfield behind every page. Mounted once in the layout
// so it keeps running across client-side route changes.
export default function GalaxyBg() {
  return (
    <div id="galaxy-bg" aria-hidden="true">
      <Galaxy
        hueShift={200}
        saturation={0.65}
        density={1}
        glowIntensity={0.4}
        twinkleIntensity={0.25}
        starSpeed={0.12}
        speed={0.35}
        rotationSpeed={0.012}
        mouseInteraction
        mouseRepulsion
        repulsionStrength={0.08}
        transparent
      />
    </div>
  );
}
