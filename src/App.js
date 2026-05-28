import './index.css';
import { Toaster } from 'react-hot-toast';
import useWalletStore from './store/useWalletStore';
import Starfield from './components/ui/Starfield';
import BottomNav from './components/ui/BottomNav';
import ChatModal from './components/ui/ChatModal';
import LaunchScreen from './components/screens/LaunchScreen';
import AuthScreen from './components/screens/AuthScreen';
import PlanetScreen from './components/screens/PlanetScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import SendScreen from './components/screens/SendScreen';
import ReceiveScreen from './components/screens/ReceiveScreen';
import SwapScreen from './components/screens/SwapScreen';
import MarketScreen from './components/screens/MarketScreen';
import Navbar from "./components/Navbar";
import Glowinglogo from "./components/Glowinglogo";
import { FeedScreen, CommunityScreen, P2PScreen, AutopilotScreen } from './components/screens/OtherScreens';

export default function App() {
  const { currentScreen } = useWalletStore();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'launch':      return <LaunchScreen />;
      case 'register':    return <AuthScreen mode="register" />;
      case 'login':       return <AuthScreen mode="login" />;
      case 'planet':      return <PlanetScreen />;
      case 'dashboard':   return <DashboardScreen />;
      case 'send':        return <SendScreen />;
      case 'receive':     return <ReceiveScreen />;
      case 'swap':        return <SwapScreen />;
      case 'market':      return <MarketScreen />;
      case 'feed':        return <FeedScreen />;
      case 'community':   return <CommunityScreen />;
      case 'p2p':         return <P2PScreen />;
      case 'autopilot':   return <AutopilotScreen />;
      default:            return <LaunchScreen />;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: '#030712' }}>
      <Starfield />
      {renderScreen()}
      <BottomNav />
      <ChatModal />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(10,15,30,0.95)',
            color: '#e2e8f0',
            border: '1px solid rgba(0,212,255,0.25)',
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 13,
            backdropFilter: 'blur(20px)',
          },
          success: { iconTheme: { primary: '#00ff88', secondary: '#000' } },
          error:   { iconTheme: { primary: '#ff4466', secondary: '#fff' } },
        }}
      />
    </div>
  );
}
