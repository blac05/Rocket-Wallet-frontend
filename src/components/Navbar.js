import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-[#030712] border-b border-gray-800">
      
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Rocket Wallet"
          className="w-10 h-10 drop-shadow-lg"
        />
        <span className="text-white font-bold text-xl tracking-wide">
          Rocket Wallet
        </span>
      </Link>

      {/* Right Links */}
      <div className="flex gap-6 text-gray-300">
        <Link className="hover:text-white" to="/">Home</Link>
        <Link className="hover:text-white" to="/dashboard">Dashboard</Link>
        <Link className="hover:text-white" to="/wallet">Wallet</Link>
      </div>
    </nav>
  );
}