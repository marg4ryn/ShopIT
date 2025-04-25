import React, { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setError('Please enter your email.');
      return;
    }

    console.log('Password reset link sent to:', email);
    setError('');
    setMessage('A password reset link has been sent to your email.');
  };

  return (
    <div className="flex-grow flex pt-18 justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Forgot your password?</h2>
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

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <button type="submit" className="w-full p-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Send reset link
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline"> Log in</a>
          </p>
          <p>
            Don't have an account yet?
            <a href="/register" className="text-blue-600 hover:underline"> Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};
