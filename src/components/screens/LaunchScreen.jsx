import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useWalletStore from '../../store/useWalletStore';

export default function LaunchScreen() {
  const setScreen = useWalletStore((s) => s.setScreen);
  const [launching, setLaunching] = useState(false);

  const handleLaunch = (mode) => {
    setLaunching(true);
    // spawn particles
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      const sz = Math.random() * 7 + 2;
      const hue = Math.random() * 60 + 180;
      p.style.cssText = `position:fixed;border-radius:50%;pointer-events:none;z-index:99;
        width:${sz}px;height:${sz}px;background:hsl(${hue},100%,70%);
        left:${40 + Math.random() * 20}%;bottom:30%;
        animation:floatUp ${Math.random() * 2 + 0.8}s linear ${Math.random() * 0.4}s forwards;`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 3000);
    }
    setTimeout(() => setScreen(mode === 'register' ? 'register' : 'login'), 2200);
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      background: 'radial-gradient(ellipse at 50% 110%, #1a0a3e 0%, #030712 60%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center', padding: 24, maxWidth: 340, width: '100%' }}>

        {/* Rocket */}
        <motion.div
          animate={launching ? { y: -900, scale: 0.1, opacity: 0 } : { y: [0, -10, 0] }}
          transition={launching
            ? { duration: 2.0, ease: 'easeIn' }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
          }
          style={{ position: 'relative', width: 120, height: 160, margin: '0 auto 20px', cursor: 'pointer' }}
          onClick={() => !launching && handleLaunch('register')}
        >
          <svg viewBox="0 0 100 160" width="120" height="160" style={{ filter: 'drop-shadow(0 0 22px #00d4ff)' }}>
            <defs>
              <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff"/>
                <stop offset="100%" stopColor="#9b59ff"/>
              </linearGradient>
              <linearGradient id="rg2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0"/>
                <stop offset="100%" stopColor="#64748b"/>
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="70" rx="22" ry="55" fill="url(#rg2)"/>
            <path d="M28 62 Q50 4 72 62 Z" fill="url(#rg1)"/>
            <path d="M28 112 L8 144 L28 132 Z" fill="url(#rg1)" opacity="0.85"/>
            <path d="M72 112 L92 144 L72 132 Z" fill="url(#rg1)" opacity="0.85"/>
            <circle cx="50" cy="70" r="13" fill="url(#rg1)" opacity="0.9"/>
            <circle cx="50" cy="70" r="8"  fill="#030712" opacity="0.85"/>
            <circle cx="50" cy="70" r="4"  fill="url(#rg1)"/>
            <rect x="42" y="90" width="16" height="5" rx="2" fill="#00d4ff" opacity="0.6"/>
            <rect x="44" y="98" width="12" height="4" rx="2" fill="#00d4ff" opacity="0.4"/>
          </svg>

          {/* Fire */}
          {launching && (
            <div className="animate-fire" style={{
              position: 'absolute', bottom: -22, left: '50%',
              transform: 'translateX(-50%)',
              width: 32, height: 64,
              background: 'linear-gradient(to bottom, #ff6b35, #ffd700, transparent)',
              borderRadius: '0 0 60% 60%',
            }}/>
          )}
        </motion.div>

        {/* Logo */}
        <div style={{
          fontFamily: 'Orbitron, monospace', fontSize: 28, fontWeight: 900,
          color: '#00d4ff', letterSpacing: 4, marginBottom: 6,
          textShadow: '0 0 30px #00d4ff, 0 0 60px rgba(0,212,255,0.3)',
        }}>🚀 ROCKET WALLET</div>
        <div style={{ fontSize: 11, letterSpacing: 6, color: 'rgba(255,255,255,0.45)', marginBottom: 30, textTransform: 'uppercase' }}>
          Your Crypto Universe
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginBottom: 28, lineHeight: 1.8, maxWidth: 260, margin: '0 auto 28px' }}>
          Trade, transfer and explore the crypto cosmos from one galactic launchpad
        </p>

        <button className="rw-btn-primary" onClick={() => handleLaunch('register')}>
          CREATE ACCOUNT
        </button>
        <button className="rw-btn-secondary" onClick={() => handleLaunch('login')}>
          ALREADY HAVE AN ACCOUNT
        </button>

        {/* Orbit decorations */}
        {[100, 160, 220].map((r, i) => (
          <div key={r} style={{
            position: 'absolute', top: '38%', left: '50%',
            width: r * 2, height: r * 2,
            borderRadius: '50%',
            border: `1px solid rgba(0,212,255,${0.06 - i * 0.015})`,
            transform: 'translate(-50%,-50%)',
            pointerEvents: 'none',
          }}/>
        ))}
      </div>
    </div>
  );
}
