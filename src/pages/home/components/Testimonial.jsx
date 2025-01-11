'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Binary, CircuitBoard } from 'lucide-react';

const testimonials = [
  { 
    name: "John Doe", 
    role: "CEO, TechCorp", 
    text: "This is the most futuristic product I've ever used!",
    gradientFrom: "from-blue-400",
    gradientTo: "to-purple-500"
  },
  { 
    name: "Jane Smith", 
    role: "CTO, InnovateTech", 
    text: "The AI-powered solutions have transformed our business processes.",
    gradientFrom: "from-purple-400",
    gradientTo: "to-pink-500"
  },
  { 
    name: "Mike Johnson", 
    role: "Data Scientist, DataCo", 
    text: "The real-time analytics provided invaluable insights for our team.",
    gradientFrom: "from-cyan-400",
    gradientTo: "to-blue-500"
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
      
      {/* Floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20"
      >
        <Binary size={24} className="text-blue-500/30" />
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20"
      >
        <CircuitBoard size={24} className="text-purple-500/30" />
      </motion.div>

      <h2 className="text-4xl  font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
        What Our Clients Say
      </h2>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
          <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-lg p-12 text-center border border-gray-800">
            <Quote className="w-12 h-12 mx-auto mb-6 text-cyan-400 opacity-50" />
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8  tracking-wide"
            >
              "{testimonials[currentIndex].text}"
            </motion.p>
            <div className={`bg-gradient-to-r ${testimonials[currentIndex].gradientFrom} ${testimonials[currentIndex].gradientTo} h-px w-16 mx-auto mb-6`}></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="font-sans font-semibold text-lg">{testimonials[currentIndex].name}</p>
              <p className="text-cyan-400  tracking-wider">{testimonials[currentIndex].role}</p>
            </motion.div>
          </div>
        </motion.div>

        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 p-3 rounded-full border border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronLeft className="w-6 h-6 text-cyan-400 group-hover:text-white" />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900/80 p-3 rounded-full border border-gray-800 hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
        >
          <ChevronRight className="w-6 h-6 text-cyan-400 group-hover:text-white" />
        </button>

        {/* Progress indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-gradient-to-r from-cyan-400 to-blue-500' 
                  : 'w-2 bg-gray-700'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}