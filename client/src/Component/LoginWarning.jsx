import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginWarning = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white px-4">
      <div className="bg-[#1f1f1f] p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-500">Oops! 😓</h1>
        <p className="text-lg mb-2">
          You need to <span className="font-semibold text-blue-400">log in</span> to watch videos.
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Click on the <strong className="text-white">Sign in with Google</strong> option to continue.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg text-white font-medium"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
};

export default LoginWarning;
