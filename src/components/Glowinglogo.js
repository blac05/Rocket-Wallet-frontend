import logo from "../assets/logo.png";

export default function GlowingLogo() {
  return (
    <div className="flex items-center justify-center">
      
      <div className="relative">
        
        {/* Glow effect */}
        <div className="absolute inset-0 blur-2xl bg-blue-500 opacity-40 rounded-full animate-pulse"></div>

        {/* Logo */}
        <img
          src={logo}
          alt="Rocket Wallet"
          className="relative w-20 h-20 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] animate-bounce"
        />
      </div>

    </div>
  );
}