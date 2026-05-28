import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: BASE });

api.interceptors.request.use((config) => {
  try {
    const stored = JSON.parse(localStorage.getItem('rocket-wallet-v1') || '{}');
    const token = stored?.state?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (_) {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('rocket-wallet-v1');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──
export const authRegister  = (d) => api.post('/auth/register', d);
export const authLogin     = (d) => api.post('/auth/login', d);
export const authVerifyOTP = (d) => api.post('/auth/verify-otp', d);
export const auth2FA       = (d) => api.post('/auth/verify-2fa', d);
export const getProfile    = ()  => api.get('/auth/profile');

// ── Wallet ──
export const getWallet       = ()    => api.get('/wallet');
export const getTxHistory    = (p)   => api.get('/wallet/transactions', { params: p });
export const getAddress      = (net) => api.get(`/wallet/address/${net}`);
export const sendCrypto      = (d)   => api.post('/wallet/send', d);
export const swapCrypto      = (d)   => api.post('/wallet/swap', d);
export const estimateFee     = (d)   => api.post('/wallet/estimate-fee', d);

// ── Market ──
export const getMarket       = ()          => api.get('/market');
export const getCoinChart    = (sym, tf)   => api.get(`/market/chart/${sym}?tf=${tf}`);
export const getNewTokens    = ()          => api.get('/market/new-tokens');

// ── P2P ──
export const getP2PListings      = (p)   => api.get('/p2p/listings', { params: p });
export const createP2PListing    = (d)   => api.post('/p2p/listings', d);
export const startP2PTrade       = (id, d) => api.post(`/p2p/trade/${id}`, d);
export const confirmP2PPayment   = (id)  => api.post(`/p2p/trade/${id}/confirm`);
export const releaseEscrow       = (id)  => api.post(`/p2p/trade/${id}/release`);

// ── Community ──
export const getPosts      = (page = 1) => api.get(`/community/posts?page=${page}`);
export const createPost    = (d)        => api.post('/community/posts', d);
export const likePost      = (id)       => api.post(`/community/posts/${id}/like`);

// ── Feed ──
export const getFeed = () => api.get('/feed');

// ── AI / Autopilot ──
export const getAIPredictions  = ()    => api.get('/ai/predictions');
export const getElasticity     = (sym) => api.get(`/ai/elasticity/${sym}`);
export const setRiskSettings   = (d)   => api.put('/ai/risk-settings', d);

export default api;
