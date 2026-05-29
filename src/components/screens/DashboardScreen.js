import useWalletStore, { CRYPTOS } from '../../store/useWalletStore';
import MiniChart from '../ui/MiniChart';
import logo from '../../assets/logo.png';

export default function DashboardScreen() {
  const { setScreen, portfolio, transactions, selectCoin } = useWalletStore();
  const openCoin = (coin) => { selectCoin(coin); setScreen('market'); };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:10, background:'var(--space)' }}>
      <div style={{ height:'100vh', overflowY:'auto', paddingBottom:72 }}>

        {/* Header with logo */}
        <div className="animate-slide-up stagger-1"
          style={{ padding:'14px 20px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ position:'relative', width:36, height:36, flexShrink:0 }}>
              <div style={{
                position:'absolute', inset:-4, borderRadius:'50%',
                background:'radial-gradient(circle,rgba(0,212,255,0.3),transparent)',
                animation:'aiPulse 2.5s ease-in-out infinite',
              }}/>
              <img src={logo} alt="RW"
                style={{
                  width:36, height:36, borderRadius:'50%', objectFit:'contain',
                  filter:'drop-shadow(0 0 8px rgba(0,212,255,0.8))',
                  position:'relative', zIndex:1,
                }}/>
            </div>
            <div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:2 }}>WELCOME BACK</div>
              <div style={{ fontFamily:'Orbitron,monospace', fontSize:14, fontWeight:700 }}>COMMANDER</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ position:'relative' }}>
              <div onClick={() => setScreen('feed')} style={{
                background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                borderRadius:'50%', width:36, height:36,
                display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:15,
              }}>🔔<div className="notif-dot"/></div>
            </div>
            <div style={{
              width:38, height:38, borderRadius:'50%',
              background:'linear-gradient(135deg,#00d4ff,#9b59ff)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:'Orbitron,monospace', fontSize:12, fontWeight:700, color:'#000', cursor:'pointer',
            }}>RW</div>
          </div>
        </div>

        {/* Balance card */}
        <div className="balance-card animate-slide-up stagger-2">
          <div style={{ fontSize:11, letterSpacing:2, color:'rgba(255,255,255,0.5)', textTransform:'uppercase' }}>TOTAL PORTFOLIO VALUE</div>
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:30, fontWeight:900, color:'#fff', margin:'4px 0' }}>
            ${portfolio.totalUSD.toLocaleString()}
          </div>
          <div style={{ fontSize:13, color:'rgba(0,212,255,0.7)' }}>≈ 0.4231 BTC</div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:4, fontSize:12,
            padding:'3px 10px', borderRadius:20, marginTop:8,
            background:'rgba(0,255,136,0.1)', color:'#00ff88',
          }}>▲ +{portfolio.change24h}% today</div>
          <div style={{ position:'absolute', right:20, top:20, fontSize:42, opacity:0.10 }}>🌌</div>
        </div>

        {/* Quick Actions */}
        <div className="animate-slide-up stagger-3"
          style={{ display:'flex', gap:8, margin:'0 16px 16px', justifyContent:'space-around' }}>
          {[
            { icon:'📤', label:'SEND',    screen:'send'      },
            { icon:'📥', label:'RECEIVE', screen:'receive'   },
            { icon:'🔄', label:'SWAP',    screen:'swap'      },
            { icon:'👥', label:'P2P',     screen:'p2p'       },
            { icon:'🤖', label:'AI',      screen:'autopilot' },
          ].map((q) => (
            <div key={q.label} className="qa-btn" onClick={() => setScreen(q.screen)}>
              <div className="qa-icon" style={{ background:'rgba(0,212,255,0.09)' }}>{q.icon}</div>
              <span className="qa-label">{q.label}</span>
            </div>
          ))}
        </div>

        {/* Assets */}
        <div className="section-title animate-slide-up stagger-4">CRYPTO ASSETS</div>
        <div style={{ padding:'0 16px', display:'flex', flexDirection:'column', gap:8 }}>
          {CRYPTOS.map((c, i) => (
            <div key={c.sym}
              className={`crypto-row animate-slide-up stagger-${Math.min(i + 2, 6)}`}
              onClick={() => openCoin(c)}>
              <div style={{
                width:40, height:40, borderRadius:'50%', flexShrink:0,
                background:c.bg, color:c.color,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:'Orbitron,monospace', fontSize:13, fontWeight:700,
              }}>{c.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:500, color:'#fff' }}>{c.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>{c.network}</div>
              </div>
              <MiniChart up={c.change >= 0}/>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'Orbitron,monospace', fontSize:13, fontWeight:600, color:c.color }}>
                  ${c.price.toLocaleString()}
                </div>
                <div style={{ fontSize:10, color: c.change >= 0 ? '#00ff88' : '#ff4466', marginTop:2 }}>
                  {c.change >= 0 ? '▲' : '▼'} {Math.abs(c.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="section-title" style={{ marginTop:18 }}>RECENT MISSIONS</div>
        <div style={{ padding:'0 16px', display:'flex', flexDirection:'column', gap:8 }}>
          {transactions.slice(0, 4).map((tx) => (
            <div key={tx.id} style={{
              background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)',
              borderRadius:14, padding:'12px 14px',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <div style={{
                width:38, height:38, borderRadius:10, flexShrink:0,
                background: tx.type==='receive' ? 'rgba(0,255,136,0.1)' : tx.type==='swap' ? 'rgba(155,89,255,0.1)' : 'rgba(255,68,102,0.1)',
                display:'flex', alignItems:'center', justifyContent:'center', fontSize:18,
              }}>
                {tx.type==='receive' ? '📥' : tx.type==='swap' ? '🔄' : '📤'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#fff', textTransform:'capitalize' }}>{tx.type} {tx.sym}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>{tx.time} · Landed on {tx.planet}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'Orbitron,monospace', fontSize:12,
                  color: tx.type==='receive' ? '#00ff88' : tx.type==='swap' ? '#9b59ff' : '#ff4466' }}>
                  {tx.type==='receive' ? '+' : '-'}{tx.amount} {tx.sym}
                </div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,0.35)' }}>${tx.usd}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height:12 }}/>
      </div>
    </div>
  );
}
