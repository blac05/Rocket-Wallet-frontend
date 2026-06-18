import useWalletStore from '../../store/useWalletStore';

const NAV = [
  { id: 'dashboard',  icon: '🏠', label: 'HOME' },
  { id: 'market',     icon: '📊', label: 'MARKET' },
  { id: '_center',    icon: null,  label: null },
  { id: 'community',  icon: '🌌', label: 'COMMUNITY' },
  { id: 'feed',       icon: '📡', label: 'FEED' },
];

const MODAL_SCREENS = ['send', 'receive', 'swap', 'market', 'feed', 'community', 'p2p', 'autopilot', 'dashboard', 'transactions'];

export default function BottomNav() {
  const { currentScreen, setScreen } = useWalletStore();
  if (!MODAL_SCREENS.includes(currentScreen)) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%',
      background: 'rgba(3,7,18,0.97)', borderTop: '1px solid rgba(0,212,255,0.12)',
      display: 'flex', backdropFilter: 'blur(20px)', zIndex: 100,
    }}>
      {NAV.map((item) => {
        if (item.id === '_center') {
          return (
            <div key="_center" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <button
                onClick={() => setScreen('send')}
                style={{
                  width: 54, height: 54,
                  background: 'linear-gradient(135deg,#00d4ff,#9b59ff)',
                  borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)',
                  fontSize: 22, cursor: 'pointer',
                  position: 'relative', top: -16,
                  boxShadow: '0 0 28px rgba(0,212,255,0.55)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, { transform:'translateY(-4px) scale(1.1)', boxShadow:'0 12px 44px rgba(0,212,255,0.7)' })}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, { transform:'', boxShadow:'0 0 28px rgba(0,212,255,0.55)' })}
              >🚀</button>
            </div>
          );
        }
        const active = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            style={{
              flex: 1, padding: '10px 4px 8px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              cursor: 'pointer', background: 'none', border: 'none',
              color: active ? '#00d4ff' : 'rgba(255,255,255,0.35)',
              transition: 'color 0.3s',
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <p style={{ fontSize: 9, letterSpacing: 1, fontFamily: 'Orbitron, monospace', margin: 0 }}>{item.label}</p>
          </button>
        );
      })}
    </div>
  );
}
