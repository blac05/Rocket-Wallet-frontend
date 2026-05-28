import { useEffect, useRef, useState } from 'react';
import useWalletStore, { CRYPTOS } from '../../store/useWalletStore';
import toast from 'react-hot-toast';

const NETWORKS = ['BTC','ETH','BNB','SOL','USDT','ADA','XRP','DOGE','MATIC','DOT'];

function generateQR(canvas, addr) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 160, SZ = 8;
  const mod = Math.floor(W / SZ);
  ctx.clearRect(0, 0, W, W);
  ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, W);

  // Pseudo-QR pattern seeded from addr
  let seed = 0;
  for (let i = 0; i < addr.length; i++) seed = (seed * 31 + addr.charCodeAt(i)) & 0xffffffff;
  const rng = () => { seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; return Math.abs(seed) / 0x7fffffff; };

  ctx.fillStyle = '#000';
  for (let row = 0; row < mod; row++) {
    for (let col = 0; col < mod; col++) {
      const inCorner = (row<5&&col<5)||(row<5&&col>mod-6)||(row>mod-6&&col<5);
      if (inCorner || rng() > 0.52) ctx.fillRect(col*SZ, row*SZ, SZ, SZ);
    }
  }
  // Corner markers
  [[0,0],[0,mod-7],[mod-7,0]].forEach(([r,c]) => {
    ctx.fillStyle='#fff'; ctx.fillRect((c+1)*SZ,(r+1)*SZ,5*SZ,5*SZ);
    ctx.fillStyle='#000'; ctx.fillRect((c+2)*SZ,(r+2)*SZ,3*SZ,3*SZ);
    ctx.fillStyle='#fff'; ctx.fillRect((c+3)*SZ,(r+3)*SZ,1*SZ,1*SZ);
  });

  // Coin icon overlay
  ctx.fillStyle = '#00d4ff';
  ctx.font = 'bold 16px Orbitron,monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.fillRect(W/2-12, W/2-12, 24, 24);
  ctx.fillStyle = '#000';
  ctx.fillText('₿', W/2+1, W/2+1);
}

export default function ReceiveScreen() {
  const { setScreen } = useWalletStore();
  const [net, setNet] = useState('ETH');
  const canvasRef = useRef(null);
  const coin = CRYPTOS.find(c => c.sym === net) || CRYPTOS[1];

  useEffect(() => { if (canvasRef.current) generateQR(canvasRef.current, coin.addr); }, [net]);

  const copyAddr = () => {
    navigator.clipboard.writeText(coin.addr).catch(() => {});
    toast.success('Address copied!');
  };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:10, background:'rgba(5,10,25,0.98)' }}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={() => setScreen('dashboard')}>←</button>
          <div className="modal-title">📥 RECEIVE CRYPTO</div>
        </div>

        <div style={{ marginBottom:16 }}>
          <label className="rw-label">Select Network</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
            {NETWORKS.map(n => (
              <div key={n} className={`net-chip ${net===n ? 'selected' : ''}`} onClick={() => setNet(n)}>{n}</div>
            ))}
          </div>
        </div>

        {/* QR Code */}
        <div style={{
          width:170, height:170, margin:'0 auto 14px',
          borderRadius:16, background:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 0 40px rgba(0,212,255,0.25)',
          border:'4px solid rgba(0,212,255,0.3)',
        }}>
          <canvas ref={canvasRef} width={160} height={160} style={{ borderRadius:10 }}/>
        </div>

        <p style={{ textAlign:'center', fontSize:11, color:'rgba(255,255,255,0.4)', marginBottom:8, letterSpacing:2 }}>
          YOUR {net} WALLET ADDRESS
        </p>

        {/* Address box */}
        <div onClick={copyAddr} style={{
          background:'rgba(0,212,255,0.05)', border:'1px solid rgba(0,212,255,0.2)',
          borderRadius:12, padding:'10px 40px 10px 14px',
          fontFamily:'monospace', fontSize:11, color:'rgba(255,255,255,0.7)',
          wordBreak:'break-all', cursor:'pointer', position:'relative',
          transition:'all 0.3s', textAlign:'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(0,212,255,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(0,212,255,0.05)'}
        >
          {coin.addr}
          <span style={{ position:'absolute', top:8, right:10, fontSize:10, color:'#00d4ff' }}>📋</span>
        </div>

        {/* Coin info */}
        <div style={{ marginTop:14, background:'rgba(255,255,255,0.03)', borderRadius:12, padding:'10px 14px', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:coin.bg, color:coin.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Orbitron,monospace', fontSize:13 }}>{coin.icon}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, fontWeight:600 }}>{coin.name}</div>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Network: {coin.network}</div>
          </div>
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:13, color:coin.color }}>{coin.bal}</div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:14 }}>
          <button onClick={copyAddr} style={{
            flex:1, background:'rgba(0,212,255,0.1)', border:'1px solid rgba(0,212,255,0.3)',
            color:'#00d4ff', fontFamily:'Orbitron,monospace', fontSize:11,
            padding:12, borderRadius:12, cursor:'pointer', letterSpacing:1,
          }}>📋 COPY ADDRESS</button>
          <button style={{
            flex:1, background:'rgba(155,89,255,0.1)', border:'1px solid rgba(155,89,255,0.3)',
            color:'#9b59ff', fontFamily:'Orbitron,monospace', fontSize:11,
            padding:12, borderRadius:12, cursor:'pointer', letterSpacing:1,
          }}>💾 SAVE QR</button>
        </div>
      </div>
    </div>
  );
}
