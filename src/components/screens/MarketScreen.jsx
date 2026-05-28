import { useEffect, useRef, useState } from 'react';
import useWalletStore, { CRYPTOS } from '../../store/useWalletStore';
import MiniChart from '../ui/MiniChart';

function PriceChart({ coin, timeframe }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    cv.width = cv.parentElement.offsetWidth || 300;
    const W = cv.width, H = 150;
    ctx.clearRect(0,0,W,H);
    const up = coin.change >= 0;
    const base = coin.price;
    const volatility = timeframe === '1H' ? 0.01 : timeframe === '1D' ? 0.03 : 0.08;
    const pts = Array.from({length:80},(_,i) => base*(1+(Math.sin(i*0.25+(Math.random()-0.5))*volatility)+(up?i*0.0002:-i*0.0002)));
    const mn = Math.min(...pts), mx = Math.max(...pts), rng = mx-mn||1;
    ctx.beginPath();
    pts.forEach((p,i) => {
      const x = i*(W/(pts.length-1));
      const y = H-8-((p-mn)/rng)*(H-16);
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    const color = up ? '#00ff88' : '#ff4466';
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke();
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0, up?'rgba(0,255,136,0.25)':'rgba(255,68,102,0.25)');
    grad.addColorStop(1,'transparent');
    ctx.fillStyle = grad; ctx.fill();
  }, [coin, timeframe]);
  return <canvas ref={canvasRef} height={150} style={{width:'100%',display:'block'}}/>;
}

export default function MarketScreen() {
  const { setScreen, selectedCoin, setScreen: nav } = useWalletStore();
  const [activeCoin, setActiveCoin] = useState(selectedCoin || CRYPTOS[0]);
  const [timeframe, setTimeframe] = useState('1D');
  const [tab, setTab] = useState('All');
  const TABS = ['All','Bitcoin','Ethereum','DeFi','Layer 1','Meme'];
  const up = activeCoin.change >= 0;

  return (
    <div style={{position:'absolute',inset:0,zIndex:10,background:'rgba(5,10,25,0.98)'}}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">📊 MARKET</div>
        </div>

        {/* Market tabs */}
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:12,scrollbarWidth:'none',marginBottom:4}}>
          {TABS.map(t=>(
            <div key={t} className={`mkt-tab ${tab===t?'active':''}`} onClick={()=>setTab(t)}>{t}</div>
          ))}
        </div>

        {/* Chart card */}
        <div style={{background:'rgba(10,15,30,0.8)',border:'1px solid rgba(0,212,255,0.12)',borderRadius:20,padding:16,marginBottom:14}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
            <div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:15,fontWeight:700}}>{activeCoin.name}</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:24,fontWeight:900,color:up?'#00ff88':'#ff4466',margin:'4px 0'}}>
                ${activeCoin.price.toLocaleString()}
              </div>
              <div style={{fontSize:12,color:up?'#00ff88':'#ff4466'}}>{up?'▲':'▼'} {Math.abs(activeCoin.change)}% (24h)</div>
            </div>
            <div style={{display:'flex',gap:6}}>
              {['1H','1D','1W','1M'].map(tf=>(
                <div key={tf} onClick={()=>setTimeframe(tf)} style={{
                  padding:'4px 10px',borderRadius:8,fontSize:10,cursor:'pointer',
                  fontFamily:'Orbitron,monospace',transition:'all 0.3s',
                  background:timeframe===tf?'rgba(0,212,255,0.2)':'rgba(0,212,255,0.07)',
                  color:timeframe===tf?'#00d4ff':'rgba(255,255,255,0.4)',
                  border:`1px solid ${timeframe===tf?'rgba(0,212,255,0.4)':'transparent'}`,
                }}>{tf}</div>
              ))}
            </div>
          </div>

          <PriceChart coin={activeCoin} timeframe={timeframe}/>

          {/* Stats */}
          <div style={{display:'flex',gap:8,marginTop:12}}>
            <div className="chart-stat"><div className="chart-stat-label">24H HIGH</div><div className="chart-stat-val" style={{color:'#00ff88'}}>${(activeCoin.price*1.024).toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
            <div className="chart-stat"><div className="chart-stat-label">24H LOW</div><div className="chart-stat-val" style={{color:'#ff4466'}}>${(activeCoin.price*0.977).toLocaleString(undefined,{maximumFractionDigits:2})}</div></div>
            <div className="chart-stat"><div className="chart-stat-label">VOLUME</div><div className="chart-stat-val">${(activeCoin.price*Math.random()*1000).toFixed(0)}M</div></div>
          </div>

          {/* Buy / Sell */}
          <div style={{display:'flex',gap:10,marginTop:12}}>
            <button onClick={()=>setScreen('p2p')} style={{
              flex:1,background:'linear-gradient(135deg,#00ff88,#00aa55)',border:'none',
              color:'#000',fontFamily:'Orbitron,monospace',fontSize:12,fontWeight:700,
              padding:12,borderRadius:12,cursor:'pointer',letterSpacing:1,transition:'all 0.3s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 22px rgba(0,255,136,0.4)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
            >BUY NOW</button>
            <button onClick={()=>setScreen('p2p')} style={{
              flex:1,background:'linear-gradient(135deg,#ff4466,#aa2244)',border:'none',
              color:'#fff',fontFamily:'Orbitron,monospace',fontSize:12,fontWeight:700,
              padding:12,borderRadius:12,cursor:'pointer',letterSpacing:1,transition:'all 0.3s',
            }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 6px 22px rgba(255,68,102,0.4)'}}
              onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.boxShadow=''}}
            >SELL NOW</button>
          </div>
        </div>

        {/* All coins list */}
        <div className="section-title">ALL MARKETS</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:4}}>
          {CRYPTOS.map(c=>(
            <div key={c.sym} className="crypto-row" onClick={()=>setActiveCoin(c)}
              style={{border:`1px solid ${activeCoin.sym===c.sym?'rgba(0,212,255,0.4)':'rgba(255,255,255,0.06)'}`,background:activeCoin.sym===c.sym?'rgba(0,212,255,0.06)':'rgba(255,255,255,0.03)'}}>
              <div style={{width:38,height:38,borderRadius:'50%',background:c.bg,color:c.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Orbitron,monospace',fontSize:12,flexShrink:0}}>{c.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:500,color:'#fff'}}>{c.name} <span style={{fontSize:9,color:'rgba(255,255,255,0.35)',fontFamily:'Orbitron,monospace'}}>{c.sym}</span></div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>Vol: ${(c.price*Math.random()*900+100).toFixed(0)}M</div>
              </div>
              <MiniChart up={c.change>=0}/>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'Orbitron,monospace',fontSize:12,fontWeight:600,color:c.color}}>${c.price.toLocaleString()}</div>
                <div style={{fontSize:10,color:c.change>=0?'#00ff88':'#ff4466',marginTop:2}}>{c.change>=0?'▲':'▼'} {Math.abs(c.change)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
