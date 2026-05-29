import logo from '../assets/logo.png';
import useWalletStore from '../store/useWalletStore';

export default function Navbar() {
  const setScreen = useWalletStore((s) => s.setScreen);
  return (
    <nav style={{
      width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 24px', background:'rgba(3,7,18,0.95)',
      borderBottom:'1px solid rgba(0,212,255,0.12)',
      backdropFilter:'blur(16px)', position:'relative', zIndex:50,
    }}>
      <div onClick={() => setScreen('launch')}
        style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
        <img src={logo} alt="Rocket Wallet"
          style={{ width:36, height:36, borderRadius:'50%',
            filter:'drop-shadow(0 0 10px rgba(0,212,255,0.7))' }}/>
        <span style={{ color:'#fff', fontFamily:'Orbitron,monospace', fontWeight:700,
          fontSize:16, letterSpacing:2, textShadow:'0 0 16px rgba(0,212,255,0.6)' }}>
          Rocket Wallet
        </span>
      </div>
      <div style={{ display:'flex', gap:20 }}>
        {[['Home','launch'],['Dashboard','dashboard'],['Market','market']].map(([label, screen]) => (
          <span key={screen} onClick={() => setScreen(screen)}
            style={{ color:'rgba(255,255,255,0.55)', fontSize:13, cursor:'pointer',
              fontFamily:'Exo 2,sans-serif', transition:'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='#00d4ff'}
            onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.55)'}
          >{label}</span>
        ))}
      </div>
    </nav>
  );
}
