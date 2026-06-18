import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useWalletStore from '../../store/useWalletStore';

function StrengthBar({ pw }) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const colors = ['#ff4466','#ff9944','#ffd700','#44dd88','#00ff88'];
  const labels = ['Very Weak','Weak','Fair','Strong','Very Strong'];
  return (
    <div>
      <div className="strength-bar">
        <div className="strength-fill" style={{ width: `${score * 20}%`, background: colors[score - 1] || 'transparent' }}/>
      </div>
      {pw && <div style={{ fontSize: 10, color: colors[score - 1], marginTop: 3, textAlign: 'right' }}>{labels[score - 1]}</div>}
    </div>
  );
}

function OTPBox({ onDone }) {
  const [vals, setVals] = useState(Array(6).fill(''));
  const refs = Array.from({ length: 6 }, () => null);
  const setRef = (i) => (el) => { refs[i] = el; };
  const handle = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals]; next[i] = v;
    setVals(next);
    if (v && i < 5) refs[i + 1]?.focus();
    if (next.every(Boolean)) onDone?.(next.join(''));
  };
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0' }}>
      {vals.map((v, i) => (
        <input key={i} ref={setRef(i)} className="otp-input" maxLength={1}
          value={v} onChange={(e) => handle(i, e.target.value)}
          onKeyDown={(e) => e.key === 'Backspace' && !v && i > 0 && refs[i - 1]?.focus()} />
      ))}
    </div>
  );
}

export default function AuthScreen({ mode: initialMode = 'register' }) {
  const { setScreen, setUser, showPlanet } = useWalletStore();
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(0);
  const [twoFA, setTwoFA] = useState(true);
  const [pw, setPw] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const dots = [0, 1, 2, 3];

  const nextStep = (n) => setStep(n);

  const completeReg = () => {
    setUser({ name: 'Commander', email: 'user@galaxy.io' }, 'demo-token-' + Date.now());
    showPlanet('ACCOUNT CREATED! 🎉', 'Welcome to the Cosmos\nYour wallet is ready', 'dashboard');
  };

  const completeLogin = () => {
    setUser({ name: 'Commander', email: 'user@galaxy.io' }, 'demo-token-' + Date.now());
    showPlanet('ORBIT ESTABLISHED', 'Welcome back, Commander', 'dashboard');
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10,
      background: 'radial-gradient(ellipse at 50% 0%, #0d2040 0%, #030712 70%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: 360, padding: 28 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 3, marginBottom: 20 }}>
          {['register','login'].map((m) => (
            <div key={m} onClick={() => { setMode(m); setStep(0); }}
              style={{
                flex: 1, padding: '8px 0', textAlign: 'center',
                fontFamily: 'Orbitron, monospace', fontSize: 10, cursor: 'pointer',
                borderRadius: 8, transition: 'all 0.3s',
                background: mode === m ? 'rgba(0,212,255,0.18)' : 'transparent',
                color: mode === m ? '#00d4ff' : 'rgba(255,255,255,0.45)',
              }}
            >{m.toUpperCase()}</div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {mode === 'register' ? (
            <motion.div key="reg" initial={{ opacity:0, x: 20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
              {/* Step dots */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 18 }}>
                {dots.map((d) => (
                  <div key={d} className={`step-dot ${d === step ? 'active' : d < step ? 'done' : ''}`}/>
                ))}
              </div>

              {/* Step 0 — Identity */}
              {step === 0 && (
                <div className="animate-slide-up">
                  <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:700, color:'#00d4ff', textAlign:'center', marginBottom:4 }}>MISSION DETAILS</div>
                  <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.4)', textAlign:'center', marginBottom:20 }}>STEP 1 OF 4 — IDENTITY</div>
                  <div style={{ marginBottom:12 }}><label className="rw-label">Full Name</label><input className="rw-input" placeholder="Commander John Doe"/></div>
                  <div style={{ marginBottom:12 }}><label className="rw-label">Email Address</label><input className="rw-input" type="email" placeholder="john@galaxy.io"/></div>
                  <div style={{ marginBottom:16 }}><label className="rw-label">Phone Number</label><input className="rw-input" type="tel" placeholder="+1 (555) 000-0000"/></div>
                  <button className="rw-btn-primary" onClick={() => nextStep(1)}>NEXT →</button>
                </div>
              )}

              {/* Step 1 — ID Verification */}
              {step === 1 && (
                <div className="animate-slide-up">
                  <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:700, color:'#00d4ff', textAlign:'center', marginBottom:4 }}>ID VERIFICATION</div>
                  <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.4)', textAlign:'center', marginBottom:20 }}>STEP 2 OF 4 — DOCUMENTS</div>
                  <div style={{ marginBottom:12 }}>
                    <label className="rw-label">ID Type</label>
                    <select className="rw-input" style={{ cursor:'pointer' }}>
                      <option>National ID</option><option>Passport</option><option>Driver's License</option>
                    </select>
                  </div>
                  <div style={{ marginBottom:12 }}><label className="rw-label">ID Number</label><input className="rw-input" placeholder="ABC-123456789"/></div>
                  <div
                    onClick={() => { setUploaded(true); setTimeout(() => nextStep(2), 600); }}
                    style={{
                      background: uploaded ? 'rgba(0,255,136,0.08)' : 'rgba(0,212,255,0.05)',
                      border: `2px dashed ${uploaded ? 'rgba(0,255,136,0.4)' : 'rgba(0,212,255,0.25)'}`,
                      borderRadius: 12, padding: 20, textAlign: 'center', cursor: 'pointer',
                      marginBottom: 16, transition: 'all 0.3s',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{uploaded ? '✅' : '📸'}</div>
                    <div style={{ fontSize: 12, color: uploaded ? '#00ff88' : 'rgba(255,255,255,0.5)' }}>
                      {uploaded ? 'ID Uploaded Successfully' : 'Tap to upload ID scan'}
                    </div>
                  </div>
                  <button className="rw-btn-primary" onClick={() => nextStep(2)}>VERIFY →</button>
                  <button className="rw-btn-secondary" onClick={() => nextStep(0)}>← BACK</button>
                </div>
              )}

              {/* Step 2 — OTP */}
              {step === 2 && (
                <div className="animate-slide-up">
                  <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:700, color:'#00d4ff', textAlign:'center', marginBottom:4 }}>VERIFY EMAIL</div>
                  <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.4)', textAlign:'center', marginBottom:12 }}>STEP 3 OF 4 — OTP</div>
                  <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', textAlign:'center', marginBottom:4 }}>Enter the 6-digit code sent to your email</p>
                  <OTPBox onDone={() => nextStep(3)} />
                  <p style={{ fontSize:10, color:'#00d4ff', textAlign:'center', cursor:'pointer', marginBottom:16 }}>Resend code</p>
                  <button className="rw-btn-primary" onClick={() => nextStep(3)}>CONFIRM →</button>
                  <button className="rw-btn-secondary" onClick={() => nextStep(1)}>← BACK</button>
                </div>
              )}

              {/* Step 3 — Password */}
              {step === 3 && (
                <div className="animate-slide-up">
                  <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:700, color:'#00d4ff', textAlign:'center', marginBottom:4 }}>SET PASSWORD</div>
                  <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.4)', textAlign:'center', marginBottom:20 }}>STEP 4 OF 4 — SECURE</div>
                  <div style={{ marginBottom:12 }}>
                    <label className="rw-label">Password</label>
                    <input className="rw-input" type="password" placeholder="Min. 12 characters" value={pw} onChange={(e) => setPw(e.target.value)}/>
                    <StrengthBar pw={pw}/>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <label className="rw-label">Confirm Password</label>
                    <input className="rw-input" type="password" placeholder="Repeat password"/>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20, padding:'12px', background:'rgba(155,89,255,0.06)', borderRadius:12, border:'1px solid rgba(155,89,255,0.15)' }}>
                    <div className={`toggle-switch ${twoFA ? 'on' : ''}`} onClick={() => setTwoFA(!twoFA)}><div className="toggle-knob"/></div>
                    <div>
                      <div style={{ fontSize:12, color:'#fff', fontWeight:500 }}>Enable 2FA Authentication</div>
                      <div style={{ fontSize:10, color:'rgba(255,255,255,0.4)' }}>Strongly recommended for security</div>
                    </div>
                  </div>
                  <button className="rw-btn-primary" onClick={completeReg}>🚀 LAUNCH WALLET</button>
                  <button className="rw-btn-secondary" onClick={() => nextStep(2)}>← BACK</button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="log" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:20 }}>
              <div style={{ fontFamily:'Orbitron,monospace', fontSize:16, fontWeight:700, color:'#00d4ff', textAlign:'center', marginBottom:4 }}>MISSION LOGIN</div>
              <div style={{ fontSize:10, letterSpacing:2, color:'rgba(255,255,255,0.4)', textAlign:'center', marginBottom:20 }}>ENTER CREDENTIALS</div>
              <div style={{ marginBottom:12 }}><label className="rw-label">Email</label><input className="rw-input" type="email" placeholder="commander@galaxy.io"/></div>
              <div style={{ marginBottom:8 }}><label className="rw-label">Password</label><input className="rw-input" type="password" placeholder="••••••••••••"/></div>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
                <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:11, color:'rgba(255,255,255,0.5)', cursor:'pointer' }}>
                  <input type="checkbox" style={{ width:14, height:14 }}/> Remember me
                </label>
                <span style={{ fontSize:11, color:'#00d4ff', cursor:'pointer' }}>Forgot password?</span>
              </div>
              <button className="rw-btn-primary" onClick={completeLogin}>LAUNCH →</button>
              <div style={{ textAlign:'center', margin:'10px 0', fontSize:11, color:'rgba(255,255,255,0.3)' }}>OR</div>
              <button className="rw-btn-secondary">🔐 Biometric Login</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button onClick={() => setScreen('launch')} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', fontSize:11, marginTop:14, cursor:'pointer' }}>
        ← Back to Earth
      </button>
    </div>
  );
}
