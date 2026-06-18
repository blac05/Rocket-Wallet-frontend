import { motion } from 'framer-motion'

export default function AnimatedButton({ children, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-full py-4 rounded-2xl bg-cyan-500 text-white font-bold"
    >
      {children}
    </motion.button>
  )
}