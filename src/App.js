import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/home/page';
import { Footer, Navbar } from './components/Navbar';
import ResultsDisplay from './pages/Result/Result';
import ProtectedRoute from './components/ProtectedRoute';
import JobPositions from './pages/Dashboard/SelectJobPostion';
import AdminDashboard from './pages/Admin/AdminDashboard';
import DashboardLayout from './pages/Admin/DashboardLayout';
import UserDashboardLayout from './pages/user/UserDashboardLayout';

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 },
  };

  const pageTransition = { type: 'tween', ease: 'anticipate', duration: 0.5 };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><PageTransition><DashboardLayout /></PageTransition></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute><PageTransition><UserDashboardLayout /></PageTransition></ProtectedRoute>} />
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/res" element={<ProtectedRoute><PageTransition><ResultsDisplay /></PageTransition></ProtectedRoute>} />
        <Route path="/res/selectjob" element={<ProtectedRoute><PageTransition><JobPositions /></PageTransition></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/admin-dashboard" || location.pathname === "/user-dashboard";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavAndFooter && <Navbar />}
      <main className="flex-grow">
        <AnimatedRoutes />
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
