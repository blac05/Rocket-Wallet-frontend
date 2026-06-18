import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useWalletStore from '../../store/useWalletStore';

export default function PlanetScreen() {
  const { activePlanet, planetMessage, txResult, afterPlanetScreen, setScreen } = useWalletStore();

  // Particles
  useEffect(() => {
    const particles = [];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      const sz = Math.random() * 7 + 2;
      const hue = Math.random() * 80 + 160;
      p.style.cssText = `position:fixed;border-radius:50%;pointer-events:none;z-index:5;
        width:${sz}px;height:${sz}px;background:hsl(${hue},100%,70%);
        left:${Math.random() * 100}%;bottom:0;
        animation:floatUp ${Math.random() * 2.5 + 1}s linear ${Math.random() * 0.5}s forwards;`;
      document.body.appendChild(p);
      particles.push(p);
    }
    const timer = setTimeout(() => setScreen(afterPlanetScreen), 3200);
    return () => {
      clearTimeout(timer);
      particles.forEach((p) => p.remove());
    };
  }, []);

  if (!activePlanet) return null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      background: 'var(--space)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Rocket descending */}
        <motion.div
          initial={{ y: -120, opacity: 0, rotate: 180, scale: 2.2 }}
          animate={{ y: 0, opacity: 1, rotate: 180, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{ fontSize: 52, marginBottom: 16 }}
        >🚀</motion.div>

        {/* Planet */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7, type: 'spring', stiffness: 160 }}
          className="animate-planet-pulse animate-planet-spin"
          style={{
            width: 190, height: 190, borderRadius: '50%',
            background: activePlanet.bg,
            color: activePlanet.glow,
            margin: '0 auto',
            boxShadow: `0 0 80px ${activePlanet.glow}66`,
          }}
        />

        {/* Orbit ring */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 260, height: 260, borderRadius: '50%',
          border: `1px solid ${activePlanet.glow}44`,
          transform: 'translate(-50%,-50%)',
          animation: 'orbitRing 8s linear infinite',
          pointerEvents: 'none',
        }}/>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="animate-text-glow"
          style={{
            fontFamily: 'Orbitron, monospace', fontSize: 32, fontWeight: 900,
            color: activePlanet.glow, marginTop: 18,
          }}
        >{activePlanet.name.toUpperCase()}</motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, marginTop: 6 }}
        >{planetMessage || 'LANDING SEQUENCE COMPLETE'}</motion.div>

        {txResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.7, type: 'spring' }}
            style={{
              marginTop: 14, fontFamily: 'Orbitron, monospace', fontSize: 13,
              color: '#00ff88', background: 'rgba(0,255,136,0.08)',
              border: '1px solid rgba(0,255,136,0.3)', borderRadius: 12,
              padding: '10px 22px', whiteSpace: 'pre-line',
            }}
          >{txResult}</motion.div>
        )}
      </div>
    </div>
  );
}
