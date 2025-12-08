import React from "react";
import { Link } from "react-router-dom";
import LOGIN_IMAGE from "../assets/backgrounds/loginbg.jpg";
import Google_Icon from "../assets/icons/icons8-google-50.svg";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-start mt-2 rounded-xl">

      {/* Left Image Section */}
      <div className="relative w-1/2 h-full flex flex-col">
        <div className="absolute top-[22%] left-[10%] flex flex-col max-w-[70%] 
          text-2xl text-[#dee2e6] mt-4 tracking-wide font-light
          drop-shadow-md bg-black/20 p-6 rounded-2xl shadow-xl"
        >
          <h1 className="text-5xl font-extrabold leading-tight tracking-wide text-[#f8f9fa] drop-shadow-lg">
            Rent from anywhere
          </h1>

          <p className="text-2xl text-[#dee2e6] mt-4 tracking-wide font-light drop-shadow-md">
            Aao bhai rent or list karo
          </p>
        </div>

        <img
          src={LOGIN_IMAGE}
          alt="Login Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Login Form */}
      <div className="w-1/2 h-full bg-[#e9ecef] flex flex-col p-20 justify-between items-center">

        <div className="w-full flex flex-col max-w-[400px]">

          {/* Heading */}
          <div className="w-full flex flex-col">
            <h3 className="text-3xl font-semibold mb-2 text-[#212529]">Log In</h3>
            <p className="text-base mb-6 text-[#495057]">
              Welcome back! Apne credentials daalo
            </p>
          </div>

          {/* Inputs */}
          <div className="w-full flex flex-col">
            <input
              type="email"
              placeholder="Email dalo"
              className="w-full text-black py-2 my-3 bg-transparent border-b border-black outline-none"
            />

            <input
              type="password"
              placeholder="Password dalo"
              className="w-full text-black py-2 my-3 bg-transparent border-b border-black outline-none"
            />
          </div>

          {/* Remember + Forgot Password */}
          <div className="w-full flex items-center justify-between mt-2">

            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 mr-2" />
              <p className="text-sm text-[#495057]">Mujhe bhoolna mat</p>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 text-[#343a40] hover:text-black transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Login Button */}
          <div className="w-full flex flex-col my-6 gap-4">
            <button className="w-full text-white bg-black rounded-md py-3 text-center cursor-pointer hover:bg-[#343a40] transition">
              Log In
            </button>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/30"></div>
            <p className="absolute text-lg text-[#343a40] bg-[#e9ecef] px-3">
              or
            </p>
          </div>

          {/* Google Login */}
          <button className="relative w-full text-black my-3 bg-white border border-black/40 rounded-md py-3 text-center flex justify-center items-center hover:bg-gray-100 transition cursor-pointer">
            <img
              src={Google_Icon}
              alt="Google Icon"
              className="w-6 h-6 absolute left-4"
            />
            Log In with Google
          </button>

        </div>

        {/* Register Link */}
        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-sm text-[#343a40]">
            Account nhi hai?
            <Link
              to="/register"
              className="font-semibold underline underline-offset-2 cursor-pointer ml-1 hover:text-black transition"
            >
              Register
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
