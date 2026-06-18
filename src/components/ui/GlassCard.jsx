export default function GlassCard({ children, className = '' }) {
  return (
    <div
      className={`
        bg-white/10
        backdrop-blur-xl
        border border-white/10
        rounded-3xl
        shadow-2xl
        p-5
        ${className}
      `}
    >
      {children}
    </div>
  )
}