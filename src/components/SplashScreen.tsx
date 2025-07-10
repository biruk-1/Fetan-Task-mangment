import React from 'react';
import { Outlet } from 'react-router-dom';

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Logo */}
          <div className="md:w-1/3 p-8 flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2">Taskify</h1>
            <div className="h-0.5 w-12 bg-pink-500 mb-6"></div>
          </div>
          
          {/* Right side - Auth Forms */}
          <div className="md:w-2/3 p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 