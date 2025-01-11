import React, { useState } from 'react';
import { motion } from 'framer-motion';

const formAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
};

const inputAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  }
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Form submitted successfully!');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-xl bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20"
      >
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Get in Touch
          </h2>
          <p className="text-gray-600 mt-2">We'd love to hear from you</p>
        </motion.div>

        <motion.form
          variants={formAnimation}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <motion.div variants={inputAnimation}>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 ml-1"
              htmlFor="name"
            >
              Name
            </label>
            <motion.div
              whileTap={{ scale: 0.995 }}
              className="relative"
            >
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all 
                         duration-200 outline-none text-gray-800"
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
              {focusedField === 'name' && (
                <motion.div
                  layoutId="focus-border"
                  className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                />
              )}
            </motion.div>
          </motion.div>

          <motion.div variants={inputAnimation}>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <motion.div
              whileTap={{ scale: 0.995 }}
              className="relative"
            >
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all 
                         duration-200 outline-none text-gray-800"
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
              {focusedField === 'email' && (
                <motion.div
                  layoutId="focus-border"
                  className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                />
              )}
            </motion.div>
          </motion.div>

          <motion.div variants={inputAnimation}>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2 ml-1"
              htmlFor="message"
            >
              Message
            </label>
            <motion.div
              whileTap={{ scale: 0.995 }}
              className="relative"
            >
              <textarea
                id="message"
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/50 rounded-xl border border-gray-200 
                         focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all 
                         duration-200 outline-none text-gray-800"
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
              />
              {focusedField === 'message' && (
                <motion.div
                  layoutId="focus-border"
                  className="absolute inset-0 border-2 border-blue-400 rounded-xl pointer-events-none"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                />
              )}
            </motion.div>
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200" />
            <div className="relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              {isSubmitting ? (
                <span className="flex items-center justify-center text-white">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="text-white font-semibold">Send Message</span>
              )}
            </div>
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}