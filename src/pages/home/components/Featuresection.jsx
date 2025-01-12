import React from 'react';
import { motion } from 'framer-motion';
import { Brain, PuzzleIcon as PuzzlePiece, BarChart, Binary, Beaker } from 'lucide-react';

const features = [
  { 
    icon: Brain, 
    title: "AI-Powered Solutions", 
    description: "Harness the power of artificial intelligence to drive your business forward.",
    gradient: "from-blue-500 to-indigo-600",
    delay: 0
  },
  { 
    icon: PuzzlePiece, 
    title: "Seamless Integration", 
    description: "Effortlessly integrate our solutions with your existing systems.",
    gradient: "from-indigo-500 to-purple-600",
    delay: 0.2
  },
  { 
    icon: BarChart, 
    title: "Real-Time Analytics", 
    description: "Get instant insights with our advanced analytics dashboard.",
    gradient: "from-purple-500 to-blue-600",
    delay: 0.4
  },
];

const FeatureCard = ({ icon: Icon, title, description, gradient, delay }) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Animated gradient background */}
      
      {/* Card content */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-lg p-8 border border-gray-100 shadow-xl h-full">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-500`}
        />
        
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-full blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <Icon className="w-12 h-12 text-blue-600 relative z-10" />
        </div>

        {/* Text content */}
        <h3 className={`text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}>
          {title}
        </h3>
        <p className="text-gray-600 tracking-wide leading-relaxed">
          {description}
        </p>

        {/* Hover effect corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300 rounded-tl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-transparent group-hover:border-blue-400/30 transition-all duration-300 rounded-br-lg" />
      </div>
    </motion.div>
  );
};

export default function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      
      {/* Floating background elements */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20"
      >
        <Beaker className="w-8 h-8 text-blue-500/40" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20"
      >
        <Binary className="w-8 h-8 text-indigo-500/40" />
      </motion.div>

      {/* Section header */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Our Features
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
        </motion.div>
      </div>

      {/* Features grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
}