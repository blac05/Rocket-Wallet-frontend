import { useState, useEffect, useRef } from 'react';
import useWalletStore from '../../store/useWalletStore';

export default function ChatModal() {
  const { chatOpen, chatPartner, chatMessages, tradeInfo, addChatMessage, closeChat, chatEscrowTime, setChatEscrow } = useWalletStore();
  const [input, setInput] = useState('');
  const msgsRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [chatMessages]);

  useEffect(() => {
    if (chatOpen) {
      setChatEscrow(1799);
      timerRef.current = setInterval(() => {
        setChatEscrow(Math.max(0, useWalletStore.getState().chatEscrowTime - 1));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [chatOpen]);

  const fmtTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const send = (text) => {
    if (!text?.trim()) return;
    addChatMessage(text, 'me');
    setInput('');
    setTimeout(() => {
      const replies = [
        'Got it! I\'ll confirm once payment is verified ✅',
        'Thank you, checking my wallet now...',
        'Transaction confirmed! Releasing escrow... 🔓',
        'Please share payment proof screenshot.',
        'All good! Trade completed successfully 🎉',
      ];
      addChatMessage(replies[Math.floor(Math.random() * replies.length)], 'partner');
    }, 1200 + Math.random() * 600);
  };

  if (!chatOpen) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%', height: '75%',
      background: 'rgba(5,10,25,0.98)', borderTop: '1px solid rgba(0,212,255,0.22)',
      borderRadius: '24px 24px 0 0',
      display: 'flex', flexDirection: 'column',
      zIndex: 200, backdropFilter: 'blur(30px)',
      animation: 'slideUp 0.35s ease forwards',
    }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%',
            background: `linear-gradient(135deg,${chatPartner?.color || '#00d4ff'},#9b59ff)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 14, fontFamily: 'Orbitron, monospace',
          }}>{chatPartner?.initials || 'P2'}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{chatPartner?.name || 'Trader'}</div>
            <div style={{ fontSize: 10, color: '#00ff88' }}>● Online · {chatPartner?.rating}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {tradeInfo && (
            <span style={{ fontSize: 11, color: '#ffd700', fontFamily: 'Orbitron, monospace', background: 'rgba(255,215,0,0.1)', padding: '3px 10px', borderRadius: 8 }}>
              {tradeInfo}
            </span>
          )}
          <span style={{ fontSize: 20, cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={closeChat}>✕</span>
        </div>
      </div>

      {/* Escrow bar */}
      <div style={{ padding: '8px 16px', background: 'rgba(0,212,255,0.05)', fontSize: 11, color: 'rgba(255,255,255,0.5)', display: 'flex', justifyContent: 'space-between' }}>
        <span>🔒 Escrow protected — funds are locked until confirmed</span>
        <span style={{ color: chatEscrowTime < 120 ? '#ff4466' : '#00d4ff' }}>⏱ {fmtTime(chatEscrowTime)}</span>
      </div>

      {/* Messages */}
      <div ref={msgsRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {chatMessages.map((m) => (
          <div key={m.id} className={`chat-msg ${m.sender === 'me' ? 'sent' : 'recv'}`}>{m.text}</div>
        ))}
      </div>

      {/* Quick replies */}
      <div style={{ padding: '6px 16px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Payment sent ✅', 'Confirm receipt 🙏', 'Any issues? ❓'].map((t) => (
          <button key={t} onClick={() => send(t)} style={{
            background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
            color: '#00d4ff', borderRadius: 12, padding: '5px 10px', fontSize: 10, cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>

      {/* Input */}
      <div style={{ padding: '10px 16px 18px', display: 'flex', gap: 10, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Type a message…"
          style={{
            flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20, padding: '10px 16px', color: '#fff',
            fontFamily: "'Exo 2', sans-serif", fontSize: 13, outline: 'none',
          }}
        />
        <button onClick={() => send(input)} style={{
          background: 'linear-gradient(135deg,#00d4ff,#9b59ff)', border: 'none',
          borderRadius: '50%', width: 42, height: 42, cursor: 'pointer', fontSize: 18,
          transition: 'transform 0.2s',
        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
           onMouseLeave={(e) => e.currentTarget.style.transform = ''}>➤</button>
      </div>
    </div>
  );
}
