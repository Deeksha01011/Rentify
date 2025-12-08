import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Recycle,
  Search,
  Calendar,
  Truck,
  CheckCircle,
  Book,
  Tv,
  Sofa,
  Car,
  Home as HomeIcon,
  MapPin,
} from "lucide-react";

const About = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-14 space-y-16">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">About Rentify</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Rentify is India’s modern peer-to-peer rental marketplace where users can
          rent products at affordable prices or list their own items to earn money.
        </p>
      </motion.div>


      {/* Working Principles */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Working Principles</h2>

        <div className="grid md:grid-cols-3 gap-8 bg-[#f8f9fa] p-6 rounded-xl">
          {[
            {
              icon: <ShieldCheck size={40} />,
              title: "Transparency",
              desc: "Clear pricing, secure payments & zero hidden charges.",
            },
            {
              icon: <Users size={40} />,
              title: "Trust & Safety",
              desc: "Verified users, safe exchange & dedicated support.",
            },
            {
              icon: <Recycle size={40} />,
              title: "Sustainability",
              desc: "Promoting a smart, eco-friendly sharing economy.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-xl shadow-md bg-[#ced4da] text-center bg-[#ced4da]"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-gray-700 flex justify-center mb-3">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* How It Works */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">How Rentify Works?</h2>

        <div className="grid md:grid-cols-3 gap-8 bg-[#f8f9fa] p-6 rounded-xl">
          {[
            {
              icon: <Search size={38} />,
              title: "1. Search or List",
              desc: "Search any product or list your own with ease.",
            },
            {
              icon: <Calendar size={38} />,
              title: "2. Choose Duration",
              desc: "Daily, weekly, monthly rental flexibility.",
            },
            {
              icon: <Truck size={38} />,
              title: "3. Pickup / Delivery",
              desc: "Smooth communication & easy returns.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl shadow-md bg-[#ced4da] text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-gray-700 flex justify-center mb-3">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Why Choose Us */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Rentify?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Affordable Rentals",
            "Wide Category Range",
            "Verified Users",
            "Easy Listing",
            "Secure Payments",
            "24×7 Support",
          ].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow"
            >
              <CheckCircle className="text-green-600" />
              <p className="text-gray-700 font-medium">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Top Categories */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Top Categories We Serve</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: <Book size={32} />, name: "Books" },
            { icon: <Tv size={32} />, name: "Electronics" },
            { icon: <Sofa size={32} />, name: "Furniture" },
            { icon: <Car size={32} />, name: "Automobiles" },
            { icon: <HomeIcon size={32} />, name: "Home Appliances" },
          ].map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              className="p-6 bg-[#ced4da] rounded-xl shadow-md text-center"
            >
              <div className="mb-3 flex justify-center text-gray-700">{cat.icon}</div>
              <p className="font-semibold">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Cities We Serve */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Cities We Serve</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {["Delhi", "Mumbai", "Bangalore", "Pune", "Hyderabad", "Jaipur"].map(
            (city, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white p-4 rounded-xl shadow"
              >
                <MapPin className="text-green-700" />
                <p className="text-gray-700 font-medium">{city}</p>
              </motion.div>
            )
          )}
        </div>
      </section>


      {/* Mission & Vision */}
      <section className="space-y-10]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-6 bg-[#dee2e6] rounded-xl shadow-md"
        >
          <h2 className="text-3xl font-bold mb-3">Our Vision</h2>
          <p className="text-gray-600 text-lg">
            To build India’s smartest renting ecosystem where people can earn,
            save and contribute to a sustainable environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="p-6 bg-[#dee2e6] rounded-xl shadow-md mt-5"
        >
          <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            Making renting as simple and trusted as buying — through technology,
            transparency and user convenience.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
