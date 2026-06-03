import React, { useState } from 'react';
import { User, ViewTab } from '../types';

interface RegisterPageProps {
  onLogin: (user: User) => void;
  onTabChange: (tab: ViewTab) => void;
}

export default function RegisterPage({ onLogin, onTabChange }: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'farmer'>('customer'); // Default to customer
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock registration logic
    // In a real application, this would involve an API call to a backend
    // and proper user creation/storage.
    if (username && email && password) {
      // Simulate successful registration and immediate login
      const newUser: User = {
        id: `user-${Date.now()}`,
        username,
        email,
        role,
      };
      onLogin(newUser);
    } else {
      setError('Please fill in all fields.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-emerald-800/10">
        <h2 className="text-2xl font-bold text-center text-[#154212] mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Register as:</label>
            <select
              id="role"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={role}
              onChange={(e) => setRole(e.target.value as 'customer' | 'farmer')}
            >
              <option value="customer">Customer</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <button 
            onClick={() => onTabChange('login')} 
            className="text-[#154212] hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}