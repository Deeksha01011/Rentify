import React from "react";
import { Link } from "react-router-dom";

const OtpSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f0ff] to-[#ffeef3] px-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-purple-100">
        
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center shadow-md">
            <span className="text-4xl">✔️</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-purple-700 mb-2">
          Registration Successful! 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for registering! Your OTP has been successfully verified.  
        </p>

        <p className="text-gray-700 font-medium mb-6">
          Complete your profile by logging in.
        </p>

        {/* Login Button */}
        <Link
          to="/login"
          className="inline-block py-2 px-6 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition-all mb-4"
        >
          Go to Login
        </Link>

        <div className="mt-6">
          <p className="text-gray-700 font-semibold mb-3">
            Explore more:
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/products"
              className="py-2 px-4 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-all"
            >
              Explore Our Products
            </Link>

            <Link
              to="/about"
              className="py-2 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
            >
              Learn About Us
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OtpSuccess;
