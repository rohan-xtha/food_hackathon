import React, { useState } from 'react';
import { User, ViewTab } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
  onTabChange: (tab: ViewTab) => void;
}

export default function LoginPage({ onLogin, onTabChange }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication logic
    // In a real application, this would involve an API call to a backend
    if (email === 'customer@example.com' && password === 'customer@123') {
      onLogin({ id: '1', username: 'Customer User', email: 'customer@example.com', role: 'customer' });
    } else if (email === 'farmer@example.com' && password === 'farmer@123') {
      onLogin({ id: '2', username: 'Farmer User', email: 'farmer@example.com', role: 'farmer' });
    } else if (email === 'admin@example.com' && password === 'admin@123') {
      onLogin({ id: '3', username: 'Admin User', email: 'admin@example.com', role: 'admin' });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-emerald-800/10">
        <h2 className="text-2xl font-bold text-center text-[#154212] mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <button 
            onClick={() => onTabChange('register')} 
            className="text-[#154212] hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}