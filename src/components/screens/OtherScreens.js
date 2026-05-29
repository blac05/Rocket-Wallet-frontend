import { useState } from 'react';
import useWalletStore, { FEED_DATA, COMMUNITY_POSTS, P2P_TRADERS, CRYPTOS } from '../../store/useWalletStore';

/* ─────────────────── FEED ─────────────────── */
export function FeedScreen() {
  const setScreen = useWalletStore(s=>s.setScreen);
  const [activeTab, setActiveTab] = useState('Trending');
  const tabs = ['🔥 Trending','📰 News','🚨 Alerts','🏆 Rankings'];
  return (
    <div style={{position:'absolute',inset:0,zIndex:10,background:'rgba(5,10,25,0.98)'}}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">📡 CRYPTO FEED</div>
        </div>
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:12,scrollbarWidth:'none'}}>
          {tabs.map(t=><div key={t} className={`mkt-tab ${activeTab===t?'active':''}`} onClick={()=>setActiveTab(t)}>{t}</div>)}
        </div>
        {FEED_DATA.map((f,i)=>(
          <div key={i} className="feed-item animate-slide-up" style={{animationDelay:`${i*0.06}s`,opacity:0}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <div style={{fontSize:22}}>{f.icon}</div>
              <div>
                <div style={{fontSize:12,fontWeight:600,color:'#fff'}}>{f.src}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)'}}>{f.time}</div>
              </div>
            </div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.75)',lineHeight:1.7,marginBottom:8}}>{f.text}</div>
            <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
              {f.tags.map(t=><span key={t} style={{padding:'2px 8px',borderRadius:10,fontSize:9,letterSpacing:1,background:'rgba(0,212,255,0.1)',color:'#00d4ff',textTransform:'uppercase'}}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── COMMUNITY ─────────────────── */
export function CommunityScreen() {
  const setScreen = useWalletStore(s=>s.setScreen);
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newPost, setNewPost] = useState('');
  const submit = () => {
    if (!newPost.trim()) return;
    setPosts([{name:'You',handle:'@commander',avatar:'ME',color:'#00d4ff',content:newPost,likes:0,comments:0,shares:0},...posts]);
    setNewPost('');
  };
  return (
    <div style={{position:'absolute',inset:0,zIndex:10,background:'rgba(5,10,25,0.98)'}}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">🌌 COMMUNITY</div>
        </div>
        <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:10,scrollbarWidth:'none'}}>
          {['All','DeFi','NFT','Analysis','Meme'].map(t=><div key={t} className="mkt-tab" style={t==='All'?{background:'rgba(0,212,255,0.15)',borderColor:'#00d4ff',color:'#00d4ff'}:{}}>{t}</div>)}
        </div>
        <div style={{display:'flex',gap:8,marginBottom:14,padding:'0 0 2px'}}>
          <input value={newPost} onChange={e=>setNewPost(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}
            placeholder="Share your take on the market..."
            className="rw-input" style={{flex:1,borderRadius:20,padding:'10px 16px'}}/>
          <button onClick={submit} style={{background:'linear-gradient(135deg,#00d4ff,#9b59ff)',border:'none',borderRadius:'50%',width:42,height:42,cursor:'pointer',fontSize:18}}>🚀</button>
        </div>
        {posts.map((p,i)=>(
          <div key={i} className="community-post animate-slide-up" style={{animationDelay:`${i*0.05}s`,opacity:0}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(0,212,255,0.1)',color:p.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13}}>{p.avatar}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600}}>{p.name}</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.35)'}}>{p.handle}</div>
              </div>
              <span style={{fontSize:10,color:'#00d4ff',background:'rgba(0,212,255,0.1)',padding:'3px 8px',borderRadius:8,cursor:'pointer',fontFamily:'Orbitron,monospace'}}>FOLLOW</span>
            </div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.8)',lineHeight:1.7,marginBottom:10}}>{p.content}</div>
            <div style={{display:'flex',gap:14}}>
              {[['❤️',p.likes],['💬',p.comments],['🔄',p.shares]].map(([ic,v],j)=>(
                <div key={j} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'rgba(255,255,255,0.4)',cursor:'pointer',padding:'4px 8px',borderRadius:8,transition:'all 0.3s'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(0,212,255,0.08)';e.currentTarget.style.color='#00d4ff'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='';e.currentTarget.style.color='rgba(255,255,255,0.4)'}}
                >{ic} {v}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── P2P ─────────────────── */
export function P2PScreen() {
  const { setScreen, openChat } = useWalletStore();
  const [tradeType, setTradeType] = useState('buy');
  return (
    <div style={{position:'absolute',inset:0,zIndex:10,background:'rgba(5,10,25,0.98)'}}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">👥 P2P TRADING</div>
          <div style={{marginLeft:'auto',fontSize:11,color:'#00d4ff',fontFamily:'Orbitron,monospace',background:'rgba(0,212,255,0.08)',padding:'4px 10px',borderRadius:8}}>CRYPTO GALAXY</div>
        </div>

        {/* Filters */}
        <div style={{padding:'0 0 10px',display:'flex',gap:8,overflowX:'auto',scrollbarWidth:'none'}}>
          {['BUY BTC','SELL BTC','MY ORDERS','POST AD'].map(t=>(
            <div key={t} className="mkt-tab" style={t.startsWith('BUY')?{borderColor:'rgba(0,255,136,0.3)',color:'#00ff88',background:'rgba(0,255,136,0.05)'}:t.startsWith('SELL')?{borderColor:'rgba(255,68,102,0.3)',color:'#ff4466',background:'rgba(255,68,102,0.05)'}:{}}>{t}</div>
          ))}
        </div>

        <div style={{display:'flex',gap:8,marginBottom:12}}>
          {[['Crypto','Bitcoin (BTC)'],['Payment','All Methods']].map(([lbl,def])=>(
            <select key={lbl} className="rw-input" style={{flex:1,cursor:'pointer'}}>
              <option style={{background:'#0a0f1e'}}>{def}</option>
              {lbl==='Crypto'?CRYPTOS.map(c=><option key={c.sym} style={{background:'#0a0f1e'}}>{c.name} ({c.sym})</option>)
              :['Bank Transfer','Mobile Money','PayPal','Wise'].map(p=><option key={p} style={{background:'#0a0f1e'}}>{p}</option>)}
            </select>
          ))}
        </div>

        {P2P_TRADERS.map((t,i)=>(
          <div key={i} className="p2p-card animate-slide-up" style={{animationDelay:`${i*0.06}s`,opacity:0}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:`rgba(0,0,0,0.3)`,color:t.color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontFamily:'Orbitron,monospace',fontSize:13,flexShrink:0}}>{t.initials}</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:3}}>
                <span style={{fontSize:13,fontWeight:500}}>{t.name}</span>
                {t.online&&<span style={{fontSize:9,color:'#00ff88'}}>● Online</span>}
              </div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.35)',marginBottom:4}}>{t.rating} · {t.trades} trades</div>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:700,color:t.type==='buy'?'#00ff88':'#ff4466',marginBottom:2}}>
                ${t.price.toLocaleString()}/BTC
              </div>
              <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>Limit: ${t.min.toLocaleString()} – ${t.max.toLocaleString()} · {t.payment}</div>
            </div>
            <button
              onClick={()=>openChat(t, `${t.type==='buy'?'BUYING':'SELLING'} 0.05 BTC`)}
              style={{
                padding:'10px 16px',borderRadius:12,border:'none',
                fontFamily:'Orbitron,monospace',fontSize:10,fontWeight:700,cursor:'pointer',
                letterSpacing:1,transition:'all 0.3s',
                background:t.type==='buy'?'rgba(0,255,136,0.15)':'rgba(255,68,102,0.15)',
                color:t.type==='buy'?'#00ff88':'#ff4466',
                borderStyle:'solid',borderWidth:1,borderColor:t.type==='buy'?'rgba(0,255,136,0.3)':'rgba(255,68,102,0.3)',
              }}
              onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e=>e.currentTarget.style.transform=''}
            >{t.type==='buy'?'BUY':'SELL'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────── AUTOPILOT ─────────────────── */
export function AutopilotScreen() {
  const { setScreen, autopilotOn, toggleAutopilot, riskLevel, setRisk, aiPredictions } = useWalletStore();
  const NEW_TOKENS = [
    {sym:'NOVA',   price:0.0042, chg:+1240, tag:'NEW'},
    {sym:'QUASAR', price:0.00089,chg:+340,  tag:'HOT'},
    {sym:'PULSAR', price:0.12,   chg:+89,   tag:'AI PICK'},
    {sym:'HELIX',  price:0.034,  chg:+220,  tag:'NEW'},
  ];
  const riskLabels=['ULTRA SAFE','CONSERVATIVE','MODERATE','BALANCED','AGGRESSIVE','HIGH RISK','DEGEN'];
  return (
    <div style={{position:'absolute',inset:0,zIndex:10,background:'rgba(5,10,25,0.98)'}}>
      <div className="modal-screen">
        <div className="modal-header">
          <button className="back-btn" onClick={()=>setScreen('dashboard')}>←</button>
          <div className="modal-title">🤖 AI AUTOPILOT</div>
        </div>

        {/* AI Engine card */}
        <div style={{background:'linear-gradient(135deg,rgba(155,89,255,0.1),rgba(0,212,255,0.05))',border:'1px solid rgba(155,89,255,0.2)',borderRadius:20,padding:16,marginBottom:14}}>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
            <div className="animate-ai-pulse" style={{width:46,height:46,borderRadius:'50%',background:'linear-gradient(135deg,#9b59ff,#00d4ff)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🧠</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:'Orbitron,monospace',fontSize:14,fontWeight:700,color:'#9b59ff'}}>COSMIC AI ENGINE</div>
              <div style={{fontSize:10,color:'rgba(0,212,255,0.75)',letterSpacing:1}}>● SCANNING {autopilotOn?'1,247':'0'} TOKENS</div>
            </div>
            <div className={`toggle-switch ${autopilotOn?'on':''}`} onClick={toggleAutopilot}><div className="toggle-knob"/></div>
          </div>

          <div style={{background:'rgba(0,0,0,0.3)',borderRadius:12,padding:12}}>
            {aiPredictions.map((p,i)=>{
              const coin = CRYPTOS.find(c=>c.sym===p.sym)||CRYPTOS[0];
              return (
                <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:i<aiPredictions.length-1?'1px solid rgba(255,255,255,0.05)':'none'}}>
                  <div style={{width:30,height:30,borderRadius:'50%',background:coin.bg,color:coin.color,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Orbitron,monospace',fontSize:12,flexShrink:0}}>{coin.icon}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:600}}>{coin.name}</div>
                    <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>Confidence: {p.conf}%</div>
                  </div>
                  <div style={{width:`${p.conf}%`,height:3,background:'rgba(255,255,255,0.1)',borderRadius:2,position:'relative',maxWidth:60}}>
                    <div style={{width:`${p.conf}%`,height:'100%',background:p.signal==='buy'?'#00ff88':p.signal==='sell'?'#ff4466':'#ffd700',borderRadius:2}}/>
                  </div>
                  <div className={`ai-signal ${p.signal}`}>{p.signal.toUpperCase()}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New tokens */}
        <div className="section-title">NEW MARKET ENTRIES</div>
        <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:16}}>
          {NEW_TOKENS.map((t,i)=>(
            <div key={i} className="crypto-row" style={{animationDelay:`${i*0.05}s`}}>
              <div style={{width:38,height:38,borderRadius:'50%',background:'rgba(155,89,255,0.18)',color:'#9b59ff',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Orbitron,monospace',fontSize:14}}>✦</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6}}>
                  {t.sym}
                  <span style={{padding:'2px 7px',borderRadius:8,fontSize:9,letterSpacing:1,
                    background:t.tag==='NEW'?'rgba(0,255,136,0.12)':t.tag==='HOT'?'rgba(255,107,53,0.12)':'rgba(155,89,255,0.12)',
                    color:t.tag==='NEW'?'#00ff88':t.tag==='HOT'?'#ff6b35':'#9b59ff',
                  }}>{t.tag}</span>
                </div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.4)'}}>Just listed on DEX</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:'Orbitron,monospace',fontSize:12,color:'#9b59ff'}}>${t.price}</div>
                <div style={{fontSize:10,color:'#00ff88'}}>▲ +{t.chg}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk settings */}
        <div className="section-title">RISK SETTINGS</div>
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:16,padding:16}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <span style={{fontSize:12,color:'rgba(255,255,255,0.7)'}}>Risk Tolerance</span>
            <span style={{fontSize:11,color:'#ffd700',fontFamily:'Orbitron,monospace'}}>{riskLabels[riskLevel-1]||'MODERATE'}</span>
          </div>
          <input type="range" min="1" max="7" value={riskLevel} onChange={e=>setRisk(parseInt(e.target.value))}/>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(255,255,255,0.3)',marginTop:6}}>
            <span>Conservative</span><span>Degen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
