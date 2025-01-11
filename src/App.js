import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import './App.css';
import Home from './pages/home/page';
import { Footer, Navbar } from './components/Navbar';
import ResultsDisplay from './pages/Result/Result';

function App() {
  return (<>
    <Navbar />
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home/>} />
          <Route path="/res" element={<ResultsDisplay/>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
    <Footer />
    </>
  );
}

export default App;

