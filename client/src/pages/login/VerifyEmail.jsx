import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setTimeout(() => {
          setIsVerified(true);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError('There was a problem verifying your email address.');
        setLoading(false);
      }
    };

    verifyEmail();
  }, []);

  const handleResendVerification = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('');
      setIsVerified(false);
      alert('The verification link has been resent to your email.');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex-grow flex pt-18 justify-center items-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-900">Email address verification</h2>
          <p className="text-center">Please wait... We are verifying your email address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow flex pt-18 justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Email address verification</h2>
        {isVerified ? (
          <div className="text-center text-green-600">
            <p>Your email address has been successfully verified!</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Log in
            </button>
          </div>
        ) : (
          <div className="text-center text-red-600">
            <p>{error || 'There was a problem verifying your email address.'}</p>
            <button
              onClick={handleResendVerification}
              className="mt-4 w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
            >
              Resend verification link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
