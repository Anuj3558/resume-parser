import React, { useState, useEffect } from 'react';
import { FileText, BarChart2, Zap, Binary, Cpu, Network } from 'lucide-react';
import { motion } from "framer-motion";

const AIResumeHero = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const marqueeItems = [
    "Resume Analysis", "Skill Matching", "Experience Validation", 
    "Interview Recommendations", "Candidate Scoring", "AI Insights"
  ];
  
  const marqueeContent = [...marqueeItems, ...marqueeItems];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated background grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`max-w-4xl w-full space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Floating icons */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Binary size={24} className="text-blue-400" />
        </div>
        <div className="absolute bottom-20 right-10 animate-pulse delay-700">
          <Cpu size={24} className="text-purple-400" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-500">
          <Network size={24} className="text-indigo-400" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          AI-Powered Resume Shortlisting
        </h1>

        <p className="text-xl md:text-2xl text-center text-gray-600">
          Extract, analyze, and score resumes with cutting-edge AI technology
        </p>

        {/* Marquee section */}
        <div className="relative w-full overflow-hidden bg-transparent py-4 mb-16">
          <div className="inline-flex">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1035] }}
                transition={{
                  x: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {marqueeContent.map((item, index) => (
                  <span key={index} className="text-2xl font-bold mx-4 text-gray-600">
                    {item}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 px-8 rounded-full 
                           hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-105">
            <span className="relative z-50">Get Started</span>
            <div className="absolute inset-0 -z-10 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-indigo-200 filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-lg p-8 shadow-2xl border border-white/20">
            <div className="flex items-center justify-around">
              {[
                { icon: FileText, color: "text-blue-600", text: "Extract Text" },
                { icon: Zap, color: "text-purple-600", text: "Process with AI" },
                { icon: BarChart2, color: "text-indigo-600", text: "Generate Analytics" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-500 hover:scale-110 
                    ${animationStep === index ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-2'}`}
                >
                  <item.icon size={48} className={`${item.color}`} />
                  <p className="mt-2 text-sm text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gray-50/50 backdrop-blur-sm rounded-lg p-4">
              <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-full w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResumeHero;