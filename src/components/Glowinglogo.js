import logo from '../assets/logo.png';

export default function GlowingLogo({ size = 80 }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ position:'relative' }}>
        <div style={{
          position:'absolute', inset:-(size * 0.22),
          borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,212,255,0.38),transparent 70%)',
          animation:'aiPulse 2.5s ease-in-out infinite',
          pointerEvents:'none',
        }}/>
        <img
          src={logo}
          alt="Rocket Wallet"
          style={{
            width:size, height:size, borderRadius:'50%', objectFit:'contain',
            filter:'drop-shadow(0 0 20px rgba(59,130,246,0.9)) drop-shadow(0 0 40px rgba(0,212,255,0.5))',
            position:'relative', zIndex:1,
            animation:'aiPulse 2.5s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
