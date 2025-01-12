import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { notification } from 'antd';




const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const openNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
      placement: 'topRight',
      duration: 3,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        openNotification(
          'success',
          'Login Successful',
          'Welcome back! You are now being redirected.'
        );

        // Slight delay before redirect to show the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        openNotification(
          'error',
          'Login Failed',
          data.message || 'Invalid credentials'
        );
      }
    } catch (error) {
      openNotification(
        'error',
        'Error',
        'Error during login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
        </div>
        
        <div className="w-96 p-8 rounded-xl border-0 shadow-xl bg-white/80 backdrop-blur-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="username"
                  type="email"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/50 border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                           transition-colors duration-200"
                  placeholder="admin@gmail.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-3 py-2 rounded-lg bg-white/50 border border-gray-200 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                           transition-colors duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 
                       hover:shadow-blue-500/40 transform hover:-translate-y-0.5 
                       transition-all duration-150 focus:outline-none focus:ring-2 
                       focus:ring-blue-500 focus:ring-offset-2
                       ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="mt-4 text-sm text-gray-500 text-center">
              Demo credentials: admin@gmail.com / admin
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;