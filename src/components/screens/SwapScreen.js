import { useState } from 'react';
import useWalletStore, { CRYPTOS } from '../../store/useWalletStore';
import toast from 'react-hot-toast';

const RATE = { BTC:{ ETH:15.24, BNB:104.8, SOL:441.3, USDT:43250 }, ETH:{ BTC:0.0656, BNB:6.87, SOL:28.97, USDT:2840 } };

export default function SwapScreen() {
  const { setScreen, showPlanet, addTransaction } = useWalletStore();
  const [fromSym, setFromSym] = useState('BTC');
  const [toSym, setToSym]     = useState('ETH');
  const [fromAmt, setFromAmt] = useState('0.10');

  const fromCoin = CRYPTOS.find(c=>c.sym===fromSym) || CRYPTOS[0];
  const toCoin   = CRYPTOS.find(c=>c.sym===toSym)   || CRYPTOS[1];
  const rate = RATE[fromSym]?.[toSym] || (fromCoin.price / toCoin.price);
  const toAmt = (parseFloat(fromAmt || 0) * rate).toFixed(6);

  const flip = () => { setFromSym(toSym); setToSym(fromSym); };

  const confirm = () => {
    if (!fromAmt || parseFloat(fromAmt) <= 0) { toast.error('Enter an amount'); return; }
    addTransaction({ id:Date.now(), type:'swap', sym:toSym, amount:toAmt, usd:(parseFloat(toAmt)*toCoin.price).toFixed(2), pair:`${fromSym}→${toSym}`, time:'Just now', status:'confirmed', planet:'' });
    showPlanet('SWAP COMPLETE 🔄', `${fromAmt} ${fromSym} → ${toAmt} ${toSym}\nCurrencies exchanged in hyperspace`);
  };

  const CoinRow = ({ sym, setSym, label }) => {
    const coin = CRYPTOS.find(c=>c.sym===sym) || CRYPTOS[0];
    return (
      <div className="swap-card">
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:2, marginBottom:8 }}>{label}</div>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
          <div style={{ width:38, height:38, borderRadius:'50%', background:coin.bg, color:coin.color, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Orbitron,monospace', fontSize:13, flexShrink:0 }}>{coin.icon}</div>
          <div style={{ flex:1 }}>
            <select value={sym} onChange={e=>setSym(e.target.value)}
              style={{ background:'transparent', border:'none', color:'#fff', fontFamily:'Exo 2,sans-serif', fontSize:14, fontWeight:600, outline:'none', cursor:'pointer', width:'100%' }}>
              {CRYPTOS.map(c=><option key={c.sym} value={c.sym} style={{background:'#0a0f1e'}}>{c.name} ({c.sym})</option>)}
            </select>
            <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Balance: {coin.bal} {coin.sym}</div>
          </div>
        </div>
        <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:2, marginBottom:4 }}>AMOUNT</div>
        {label === 'FROM' ? (
          <input type="number" value={fromAmt} onChange={e=>setFromAmt(e.target.value)}
            style={{ width:'100%', fontFamily:'Orbitron,monospace', fontSize:26, fontWeight:700, background:'transparent', border:'none', color:'#fff', outline:'none', padding:'6px 0' }}
            placeholder="0.00"/>
        ) : (
          <div style={{ fontFamily:'Orbitron,monospace', fontSize:26, fontWeight:700, color:'#00ff88', padding:'6px 0' }}>{toAmt}</div>
        )}
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:4 }}>
          <span>Min: 0.001 {coin.sym}</span><span>Max: 10 {coin.sym}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ position:'absolute', inset:0, zIndex:10, background:'rgba(5,10,25,0.98)' }}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">🔄 SWAP CRYPTO</div>
        </div>

        <CoinRow sym={fromSym} setSym={setFromSym} label="FROM"/>

        <div style={{ textAlign:'center', margin:'4px 0' }}>
          <button onClick={flip} style={{
            width:46, height:46, borderRadius:'50%',
            background:'linear-gradient(135deg,#00d4ff,#9b59ff)',
            border:'none', fontSize:20, cursor:'pointer',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 0 18px rgba(0,212,255,0.35)',
            transition:'all 0.4s',
          }}
            onMouseEnter={e=>e.currentTarget.style.transform='rotate(180deg) scale(1.1)'}
            onMouseLeave={e=>e.currentTarget.style.transform=''}
          >⇅</button>
        </div>

        <CoinRow sym={toSym} setSym={setToSym} label="TO"/>

        <div style={{ background:'rgba(0,212,255,0.05)', border:'1px solid rgba(0,212,255,0.12)', borderRadius:12, padding:'10px 14px', fontSize:11, marginBottom:6 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{color:'rgba(255,255,255,0.5)'}}>Exchange Rate</span>
            <span style={{color:'#00d4ff', fontFamily:'Orbitron,monospace', fontSize:10}}>1 {fromSym} ≈ {rate.toFixed(4)} {toSym}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{color:'rgba(255,255,255,0.5)'}}>Network Fee</span>
            <span style={{color:'#ffd700'}}>≈ $2.34</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            <span style={{color:'rgba(255,255,255,0.5)'}}>Rate locked for</span>
            <span style={{color:'#00ff88'}}>30 seconds</span>
          </div>
        </div>

        <button className="tx-confirm-btn" onClick={confirm}>🔄 CONFIRM SWAP</button>
      </div>
    </div>
  );
}
