'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Github, Twitter, Linkedin, Mail, ChevronRight, CircuitBoard, Binary, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Check authentication status
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Navigation items based on auth status
  const getNavItems = () => {
    if (isAuthenticated) {
      return [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Process Resume', href: '/res' },
        { name: 'Profile', href: '/profile' }
      ];
    }
    return [
      { name: 'Home', href: '/' },
      { name: 'About', href: '#about' },
      { name: 'Features', href: '#features' },
      { name: 'Contact', href: '#contact' }
    ];
  };

  const navItems = getNavItems();

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            <a href={isAuthenticated ? '/dashboard' : '/'}>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                ANTRIXSH
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white relative group px-3 py-2"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
              
              {!isAuthenticated ? (
                <div className="flex space-x-4">
                  <motion.a
                    href="/login"
                    className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    Login
                  </motion.a>
                  <motion.a
                    href="/signup"
                    className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    Sign Up
                  </motion.a>
                </div>
              ) : (
                <motion.button
                  onClick={handleLogout}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMobileMenuOpen ? 1 : 0, height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
                whileHover={{ x: 10 }}
              >
                <ChevronRight className="inline-block mr-2 w-4 h-4" />
                {item.name}
              </motion.a>
            ))}
            
            {!isAuthenticated ? (
              <div className="space-y-2 pt-2">
                <motion.a
                  href="/login"
                  className="text-white bg-blue-500 hover:bg-blue-600 block px-4 py-2 rounded-lg text-center"
                  whileHover={{ x: 10 }}
                >
                  Login
                </motion.a>
                <motion.a
                  href="/signup"
                  className="text-white bg-purple-500 hover:bg-purple-600 block px-4 py-2 rounded-lg text-center"
                  whileHover={{ x: 10 }}
                >
                  Sign Up
                </motion.a>
              </div>
            ) : (
              <motion.button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 w-full mt-2 px-4 py-2 rounded-lg flex items-center justify-center space-x-2"
                whileHover={{ x: 10 }}
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

const Footer = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Footer links based on auth status
  const getFooterLinks = () => {
    if (isAuthenticated) {
      return ['Dashboard', 'Process Resume', 'Profile', 'Settings'];
    }
    return ['Home', 'About', 'Features', 'Contact'];
  };

  const footerLinks = getFooterLinks();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      
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
        className="absolute top-10 left-10"
      >
        <CircuitBoard className="w-8 h-8 text-blue-500/20" />
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
        className="absolute bottom-10 right-10"
      >
        <Binary className="w-8 h-8 text-purple-500/20" />
      </motion.div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              ANTRIXSH
            </h3>
            <p className="text-gray-400">
              Empowering careers through intelligent resume analysis.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((item) => (
                <motion.a
                  key={item}
                  href={`${item.toLowerCase() === 'home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}`}
                  className="text-gray-400 hover:text-white"
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect With Us</h4>
            <div className="flex space-x-4">
              {[
                { Icon: Github, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Mail, href: '#' }
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-white transform transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ANTRIXSH. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <motion.a href="/privacy" className="text-gray-400 hover:text-white text-sm" whileHover={{ x: 2 }}>
                Privacy Policy
              </motion.a>
              <motion.a href="/terms" className="text-gray-400 hover:text-white text-sm" whileHover={{ x: 2 }}>
                Terms of Service
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Navbar, Footer };