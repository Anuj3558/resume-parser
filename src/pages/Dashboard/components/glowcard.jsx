import { motion } from "framer-motion"

export const GlassCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`backdrop-blur-md bg-white/80 rounded-2xl shadow-xl border border-white/20 ${className}`}
  >
    {children}
  </motion.div>
)
