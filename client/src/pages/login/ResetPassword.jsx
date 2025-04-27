import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === '' || confirmPassword === '') {
      setError('Please enter both passwords.');
      return;
    }

    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    console.log('Password has been reset:', password);
    setError('');
    setSuccess('Your password has been successfully reset!');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="flex-grow flex pt-18 justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Password Reset</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">New password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <button type="submit" className="w-full p-3 mt-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
          Reset Password
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          <p>
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline"> Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};
