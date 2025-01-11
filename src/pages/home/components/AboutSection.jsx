'use client'

import { motion } from 'framer-motion';
import { Rocket, Target, Binary, Sparkles, Globe } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10"
      >
        <Binary className="w-8 h-8 text-blue-500/40" />
      </motion.div>

      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10"
      >
        <Binary className="w-8 h-8 text-purple-500/40" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl  font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About Us
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.4, duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent max-w-[200px] mx-auto"
          />
        </motion.div>

        {/* Content Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Mission Section */}
          <motion.div
            className="relative group"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg blur-xl group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-lg p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Rocket className="w-8 h-8 text-blue-600 relative z-10" />
                </div>
                <h3 className="text-2xl  font-semibold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600  tracking-wide leading-relaxed">
                We strive to revolutionize the industry with cutting-edge technology and innovative solutions.
              </p>
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            className="relative group"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg blur-xl group-hover:opacity-75 transition-opacity duration-300" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-lg p-8 border border-gray-100 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-lg opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Target className="w-8 h-8 text-purple-600 relative z-10" />
                </div>
                <h3 className="text-2xl  font-semibold ml-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-600  tracking-wide leading-relaxed">
                To create a future where technology seamlessly integrates with everyday life, enhancing human potential.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Gradient Bar */}
        <motion.div 
          className="mt-16"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
        </motion.div>

        {/* Decorative Sparkles */}
        <motion.div
          className="absolute -top-4 right-4"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-6 h-6 text-blue-400/40" />
        </motion.div>

        <motion.div
          className="absolute -bottom-4 left-4"
          animate={{
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Globe className="w-6 h-6 text-purple-400/40" />
        </motion.div>
      </div>
    </section>
  );
}