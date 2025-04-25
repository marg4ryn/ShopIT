import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      console.log('You have logged in successfully!');
      setError('');
    } else {
      setError('Incorrect email or password.');
    }
  };

  return (
    <div className="flex-grow flex pt-18 justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-2 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
            Log in
          </button>
        </form>
        <button 
            onClick={() => navigate(`/register`)}
            className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
        >
            Sign up
        </button>
        <div className="text-center mt-2 text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a>
          <a href="/reset-password" className="text-blue-600 hover:underline">reset</a>
          <a href="/verify-email" className="text-blue-600 hover:underline">verify email</a>
        </div>
      </div>
    </div>
  );
};
