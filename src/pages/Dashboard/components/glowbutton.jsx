import { motion } from "framer-motion"
import { ReactNode } from "react"



export const GlowButton = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: "bg-blue-500/90 hover:bg-blue-600/90 shadow-lg shadow-blue-500/30",
    secondary: "bg-gray-500/90 hover:bg-gray-600/90 shadow-lg shadow-gray-500/30",
    danger: "bg-red-500/90 hover:bg-red-600/90 shadow-lg shadow-red-500/30",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-medium text-white
        backdrop-blur-sm transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}

