import { useState } from 'react';
import useWalletStore, { CRYPTOS } from '../../store/useWalletStore';
import toast from 'react-hot-toast';

const NETWORKS = ['BTC','ETH','BNB','SOL','USDT','TRC-20','ADA','XRP','MATIC','DOT'];
const FEES = [
  { id:'priority', icon:'⚡', label:'PRIORITY', sub:'~30s', cost:'$4.20', color:'#ffd700' },
  { id:'basic',    icon:'🔵', label:'BASIC',    sub:'~5min',cost:'$1.05', color:'#00d4ff' },
  { id:'free',     icon:'🌱', label:'FREE',     sub:'~1hr', cost:'Free',  color:'#00ff88' },
];

export default function SendScreen() {
  const { setScreen, sendNetwork, sendFee, setSendNetwork, setSendFee, showPlanet, addTransaction } = useWalletStore();
  const [addr, setAddr] = useState('');
  const [amt, setAmt] = useState('');
  const [twoFACode, setTwoFACode] = useState('');

  const handleSend = () => {
    if (!addr || !amt) { toast.error('Please fill all fields'); return; }
    const coin = CRYPTOS.find((c) => c.sym === sendNetwork || c.network === sendNetwork) || CRYPTOS[1];
    addTransaction({ id: Date.now(), type:'send', sym:coin.sym, amount:amt, usd:(parseFloat(amt)*coin.price).toFixed(2), to:'External Wallet', time:'Just now', status:'confirmed', planet:'' });
    showPlanet('TRANSACTION LAUNCHED 🚀', `${amt} ${coin.sym} sent!\nFunds in transit to destination`);
  };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:10, background:'rgba(5,10,25,0.98)' }}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={() => setScreen('dashboard')}>←</button>
          <div className="modal-title">🚀 SEND CRYPTO</div>
        </div>

        <div style={{ marginBottom:14 }}>
          <label className="rw-label">Select Network</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:4 }}>
            {NETWORKS.map((n) => (
              <div key={n} className={`net-chip ${sendNetwork===n ? 'selected' : ''}`} onClick={() => setSendNetwork(n)}>{n}</div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:12 }}>
          <label className="rw-label">Recipient Address</label>
          <input className="rw-input" placeholder="0x... or paste address" value={addr} onChange={(e) => setAddr(e.target.value)}/>
        </div>

        <div style={{ marginBottom:14 }}>
          <label className="rw-label">Amount</label>
          <input className="rw-input" type="number" placeholder="0.00" value={amt} onChange={(e) => setAmt(e.target.value)}
            style={{ fontFamily:'Orbitron,monospace', fontSize:22, fontWeight:700 }}/>
          <div style={{ fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:4 }}>
            Available: {CRYPTOS.find(c=>c.sym===sendNetwork||c.network===sendNetwork)?.bal || '0.00'} {sendNetwork}
          </div>
        </div>

        <label className="rw-label" style={{ marginBottom:6 }}>Transfer Speed</label>
        <div style={{ display:'flex', gap:8, marginBottom:14 }}>
          {FEES.map((f) => (
            <div key={f.id} className={`fee-tier ${f.id} ${sendFee===f.id ? 'selected' : ''}`} onClick={() => setSendFee(f.id)}>
              <div className="fee-tier-name">{f.icon} {f.label}</div>
              <div className="fee-tier-cost">{f.sub} · {f.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom:10 }}>
          <label className="rw-label">2FA Verification Code</label>
          <input className="rw-input" placeholder="Enter 6-digit authenticator code" maxLength={6}
            value={twoFACode} onChange={(e) => setTwoFACode(e.target.value)}/>
        </div>

        {/* Summary */}
        {amt && (
          <div style={{ background:'rgba(0,212,255,0.05)', border:'1px solid rgba(0,212,255,0.12)', borderRadius:12, padding:'10px 14px', marginBottom:6, fontSize:11 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ color:'rgba(255,255,255,0.5)' }}>Amount</span>
              <span style={{ fontFamily:'Orbitron,monospace' }}>{amt} {sendNetwork}</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
              <span style={{ color:'rgba(255,255,255,0.5)' }}>Network Fee</span>
              <span style={{ color:'#ffd700' }}>{FEES.find(f=>f.id===sendFee)?.cost}</span>
            </div>
            <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:6, display:'flex', justifyContent:'space-between' }}>
              <span style={{ color:'rgba(255,255,255,0.7)', fontWeight:600 }}>Total</span>
              <span style={{ fontFamily:'Orbitron,monospace', color:'#00d4ff' }}>{amt} {sendNetwork}</span>
            </div>
          </div>
        )}

        <button className="tx-confirm-btn" onClick={handleSend}>🚀 LAUNCH TRANSACTION</button>
      </div>
    </div>
  );
}
