import React, { useState, useEffect } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import bgVideo from "../../assets/bgvideos/3773488-hd_1920_1080_30fps.mp4";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    setSent(true);
  };

  return (
<div className="relative min-h-screen flex items-center justify-center overflow-hidden w-11/12 mx-auto mt-6">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/30"
      >

        {/* Back button */}
        <Link
          to="/login"
          className="flex items-center gap-1 text-sm text-white/80 mb-6 hover:text-white transition"
        >
          <ArrowLeft size={18} /> Back to Login
        </Link>

        <h1 className="text-3xl font-bold text-white mb-2">
          Forgot Password?
        </h1>

        <p className="text-white/70 mb-6 text-sm">
          Enter your email and we’ll send you a password reset link.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <Mail className="absolute left-3 top-3 text-gray-500" size={20} />
              <input
                type="email"
                placeholder="Enter your email"
                className="pl-10 pr-3 py-3 w-full rounded-lg border border-white/40 bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-black transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#212529] text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-black transition"
            >
              Send Reset Link
            </motion.button>

          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-500/20 text-green-200 border border-green-400/40 px-4 py-3 rounded-lg mt-4 text-sm"
          >
            Reset link sent to <b>{email}</b>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
};

export default ForgotPassword;
