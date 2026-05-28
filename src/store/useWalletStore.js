import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const PLANETS = [
  { name: 'Mercury', color: '#8c7853', glow: '#a09060', bg: 'radial-gradient(circle at 35% 35%,#bfae8c,#8c7853,#4a3d2a)' },
  { name: 'Venus',   color: '#e8cda0', glow: '#ffd97d', bg: 'radial-gradient(circle at 35% 35%,#ffeaa7,#e8cda0,#c9a84c)' },
  { name: 'Mars',    color: '#cd5c5c', glow: '#ff6b6b', bg: 'radial-gradient(circle at 35% 35%,#ff9a9a,#cd5c5c,#8b1a1a)' },
  { name: 'Jupiter', color: '#c88b3a', glow: '#ffd97d', bg: 'radial-gradient(circle at 35% 35%,#e8c47a,#c88b3a,#6b4226)' },
  { name: 'Saturn',  color: '#e4d191', glow: '#ffe082', bg: 'radial-gradient(circle at 35% 35%,#fffde7,#e4d191,#b8a94e)' },
  { name: 'Uranus',  color: '#7de8e8', glow: '#80deea', bg: 'radial-gradient(circle at 35% 35%,#b2ebf2,#7de8e8,#006064)' },
  { name: 'Neptune', color: '#4b70dd', glow: '#5c6bc0', bg: 'radial-gradient(circle at 35% 35%,#7986cb,#4b70dd,#1a237e)' },
  { name: 'Pluto',   color: '#9c8b6e', glow: '#bcaaa4', bg: 'radial-gradient(circle at 35% 35%,#d7ccc8,#9c8b6e,#4e342e)' },
];

export const CRYPTOS = [
  { sym:'BTC',  name:'Bitcoin',    icon:'₿', color:'#f7931a', bg:'rgba(247,147,26,.18)',  network:'Bitcoin',    price:43250, change:2.31,  bal:'0.1427', addr:'1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf' },
  { sym:'ETH',  name:'Ethereum',   icon:'Ξ', color:'#627eea', bg:'rgba(98,126,234,.18)',  network:'ERC-20',     price:2840,  change:-1.12, bal:'2.840',  addr:'0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
  { sym:'BNB',  name:'BNB Chain',  icon:'B', color:'#f3ba2f', bg:'rgba(243,186,47,.18)',  network:'BEP-20',     price:412,   change:0.87,  bal:'5.201',  addr:'bnb1xhsj7uhlhafg2s5ht8a3aeq2qc2a98t4' },
  { sym:'SOL',  name:'Solana',     icon:'◎', color:'#9945ff', bg:'rgba(153,69,255,.18)',  network:'Solana',     price:98,    change:5.44,  bal:'12.50',  addr:'7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKT' },
  { sym:'USDT', name:'Tether',     icon:'₮', color:'#26a17b', bg:'rgba(38,161,123,.18)',  network:'TRC-20',     price:1.0,   change:0.01,  bal:'500.00', addr:'TRX8hSYFxXyscszYEp35KHN8vvw3svAuLKT' },
  { sym:'ADA',  name:'Cardano',    icon:'₳', color:'#4a90d9', bg:'rgba(74,144,217,.18)',  network:'Cardano',    price:0.58,  change:-0.95, bal:'820.0',  addr:'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jh' },
  { sym:'XRP',  name:'Ripple',     icon:'✕', color:'#00aae4', bg:'rgba(0,170,228,.18)',   network:'XRP Ledger', price:0.62,  change:1.55,  bal:'1200',   addr:'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh' },
  { sym:'DOGE', name:'Dogecoin',   icon:'Ð', color:'#c2a633', bg:'rgba(194,166,51,.18)',  network:'Dogecoin',   price:0.087, change:3.21,  bal:'5000',   addr:'DH5yaieqoZN36fDVciNyRueRGvGLR3mr38' },
  { sym:'MATIC',name:'Polygon',    icon:'⬡', color:'#8247e5', bg:'rgba(130,71,229,.18)',  network:'Polygon',    price:0.94,  change:-2.10, bal:'300.0',  addr:'0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e' },
  { sym:'DOT',  name:'Polkadot',   icon:'●', color:'#e6007a', bg:'rgba(230,0,122,.18)',   network:'Polkadot',   price:8.40,  change:1.30,  bal:'45.0',   addr:'1exaAg2VJRQbyUBAeXcktChCAqjVP9TUxF3zL9' },
];

export const P2P_TRADERS = [
  { name:'Stellar_King', initials:'SK', color:'#00d4ff', rating:'⭐ 4.98', trades:'1,204', price:43820, min:100,  max:5000,  payment:'Bank Transfer', type:'sell', online:true },
  { name:'NebulaPay',    initials:'NP', color:'#9b59ff', rating:'⭐ 4.95', trades:'887',   price:43780, min:50,   max:2000,  payment:'Mobile Money',  type:'sell', online:true },
  { name:'CosmicCash',   initials:'CC', color:'#ffd700', rating:'⭐ 4.90', trades:'563',   price:43750, min:200,  max:10000, payment:'Bank Transfer', type:'buy',  online:false },
  { name:'AstroSwap',    initials:'AS', color:'#ff6b35', rating:'⭐ 4.87', trades:'421',   price:43700, min:100,  max:3000,  payment:'PayPal',        type:'buy',  online:true },
  { name:'GalaxyHodl',   initials:'GH', color:'#00ff88', rating:'⭐ 4.85', trades:'312',   price:43660, min:500,  max:20000, payment:'Wise',          type:'sell', online:true },
];

export const FEED_DATA = [
  { src:'CoinDesk', icon:'📰', time:'2m ago', text:'Bitcoin surges past $43K as institutional investors increase BTC holdings ahead of ETF decision.', tags:['BTC','BULLISH'] },
  { src:'CryptoAlert', icon:'🚨', time:'8m ago', text:'Ethereum whale moves 50,000 ETH to cold storage — accumulation pattern detected by on-chain analysts.', tags:['ETH','WHALE'] },
  { src:'DeFi Pulse', icon:'📈', time:'15m ago', text:'Total Value Locked in DeFi protocols hits new ATH of $180B. Uniswap and Aave lead the charge.', tags:['DEFI','ATH'] },
  { src:'AI Scanner', icon:'🤖', time:'22m ago', text:'New token NOVA listing detected on 3 major DEXs. Volume +1,200% in last hour. Exercise caution.', tags:['NEW','HOT'] },
  { src:'Market Watch', icon:'🌊', time:'1h ago', text:'Solana ecosystem sees record 8M daily transactions as new gaming NFTs launch on the network.', tags:['SOL','NFT'] },
  { src:'Rocket Wallet AI', icon:'🚀', time:'2h ago', text:'Autopilot detected 3 new high-confidence opportunities. BTC, SOL signals are strong BUY.', tags:['AI','SIGNAL'] },
];

export const COMMUNITY_POSTS = [
  { name:'StarTrader99', handle:'@startrader', avatar:'ST', color:'#00d4ff', content:'BTC looking very bullish on the 4H chart. Cup and handle pattern forming. Target: $48K 🚀', likes:142, comments:38, shares:21 },
  { name:'CryptoNova',   handle:'@cryptonova', avatar:'CN', color:'#9b59ff', content:'Just swapped my entire ETH bag for SOL. The ecosystem growth is undeniable. Devs are shipping fast 🛸', likes:89, comments:54, shares:15 },
  { name:'GalacticHODL', handle:'@galhodle',   avatar:'GH', color:'#ffd700', content:'Reminder: Never invest more than you can afford to lose. DCA is king in volatile markets 🙏', likes:310, comments:72, shares:89 },
  { name:'NovaMiner',    handle:'@novaminer',   avatar:'NM', color:'#ff6b35', content:'Just deployed a new liquidity position on Uniswap v3. If you haven\'t tried concentrated liquidity yet, you\'re missing out 💎', likes:67, comments:29, shares:12 },
];

export const getRandomPlanet = () => PLANETS[Math.floor(Math.random() * PLANETS.length)];

const useWalletStore = create(
  persist(
    (set, get) => ({
      // ── Auth ──
      user: null,
      token: null,
      isAuthenticated: false,

      // ── Navigation ──
      currentScreen: 'launch',
      prevScreen: null,

      // ── Planet ──
      activePlanet: null,
      planetMessage: '',
      txResult: '',
      afterPlanetScreen: 'dashboard',

      // ── Portfolio ──
      portfolio: { totalUSD: 24817.43, change24h: 3.42, dir: 'up' },
      assets: CRYPTOS,

      // ── Selected coin for market/detail ──
      selectedCoin: null,

      // ── Transactions ──
      transactions: [
        { id:1, type:'receive', sym:'BTC', amount:'0.025',  usd:'1081.25', from:'Binance',   time:'2h ago',  status:'confirmed', planet:'Jupiter' },
        { id:2, type:'send',    sym:'ETH', amount:'0.5',    usd:'1420.00', to:'MetaMask',    time:'1d ago',  status:'confirmed', planet:'Mars' },
        { id:3, type:'swap',    sym:'SOL', amount:'10',     usd:'980.00',  pair:'ETH→SOL',   time:'2d ago',  status:'confirmed', planet:'Saturn' },
        { id:4, type:'receive', sym:'USDT',amount:'500',    usd:'500.00',  from:'Coinbase',  time:'3d ago',  status:'confirmed', planet:'Venus' },
      ],

      // ── P2P Chat ──
      chatOpen: false,
      chatPartner: null,
      chatMessages: [],
      tradeInfo: null,
      chatEscrowTime: 1799,

      // ── Send form ──
      sendNetwork: 'ETH',
      sendFee: 'priority',

      // ── Swap form ──
      swapFromCoin: 'BTC',
      swapToCoin: 'ETH',
      swapAmount: '0.10',

      // ── Autopilot ──
      autopilotOn: true,
      riskLevel: 5,
      aiPredictions: [
        { sym:'BTC', signal:'buy',  conf:94 },
        { sym:'ETH', signal:'hold', conf:71 },
        { sym:'SOL', signal:'buy',  conf:87 },
        { sym:'DOGE',signal:'sell', conf:62 },
        { sym:'ADA', signal:'hold', conf:75 },
      ],

      // ── Actions ──
      setUser: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, currentScreen: 'launch' }),

      setScreen: (screen) => set((s) => ({ prevScreen: s.currentScreen, currentScreen: screen })),

      showPlanet: (message, txResult, afterScreen = 'dashboard') =>
        set({ currentScreen: 'planet', activePlanet: getRandomPlanet(), planetMessage: message, txResult, afterPlanetScreen: afterScreen }),

      selectCoin: (coin) => set({ selectedCoin: coin }),

      openChat: (partner, tradeInfo) => set({
        chatOpen: true, chatPartner: partner, tradeInfo,
        chatMessages: [
          { id:1, text:'Hello! Ready to trade. Please proceed when ready.', sender:'partner', time: new Date().toISOString() },
          { id:2, text:'Payment window: 30 minutes ⏱ Escrow is active 🔒', sender:'partner', time: new Date().toISOString() },
        ],
        chatEscrowTime: 1799,
      }),
      closeChat: () => set({ chatOpen: false, chatPartner: null }),
      addChatMessage: (text, sender = 'me') =>
        set((s) => ({
          chatMessages: [...s.chatMessages, { id: Date.now(), text, sender, time: new Date().toISOString() }],
        })),

      addTransaction: (tx) => set((s) => ({ transactions: [tx, ...s.transactions] })),
      setSendNetwork: (n) => set({ sendNetwork: n }),
      setSendFee: (f) => set({ sendFee: f }),
      setSwapFrom: (c) => set({ swapFromCoin: c }),
      setSwapTo: (c) => set({ swapToCoin: c }),
      setSwapAmount: (a) => set({ swapAmount: a }),
      toggleAutopilot: () => set((s) => ({ autopilotOn: !s.autopilotOn })),
      setRisk: (v) => set({ riskLevel: v }),
      setChatEscrow: (v) => set({ chatEscrowTime: v }),
    }),
    {
      name: 'rocket-wallet-v1',
      partialize: (s) => ({ user: s.user, token: s.token, isAuthenticated: s.isAuthenticated }),
    }
  )
);

export default useWalletStore;
