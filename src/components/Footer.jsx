import React from "react";
import { Link } from "react-router-dom";

import {
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};


const Footer = () => {
  return (
    <footer className="bg-[#343a40] text-gray-300 py-14 mt-10">
      <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Rentify</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            India’s trusted peer-to-peer rental marketplace where you can rent 
            anything or list your unused items to earn money.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            {[Facebook, Instagram, Twitter, MessageCircle].map((Icon, i) => (
              <Icon
                key={i}
                size={22}
                className="cursor-pointer hover:text-white transition"
              />
            ))}
          </div>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/">Home</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/about">About</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/#categories">Categories</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products">Featured Products</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/#reviews">Reviews</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/contact">Contact</Link>
            </li>

          </ul>
        </div>


        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Top Categories</h3>
          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products?category=books">Books</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products?category=electronics">Electronics</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products?category=furniture">Furniture</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products?category=home-appliances">Home Appliances</Link>
            </li>

            <li className="hover:text-white transition flex items-center gap-1">
              <ArrowRight size={16} />
              <Link to="/products?category=automobiles">Automobiles</Link>
            </li>

          </ul>
        </div>


        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-400 hover:text-white transition">
              <Mail size={20} /> support@rentify.com
            </li>
            <li className="flex items-center gap-3 text-gray-400 hover:text-white transition">
              <Phone size={20} /> +91 99887 76655
            </li>
            <li className="flex items-center gap-3 text-gray-400 hover:text-white transition">
              <MapPin size={20} /> Bihar, India
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} <span className="text-white font-semibold">Rentify</span>.  
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
