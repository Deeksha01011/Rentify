import React from "react";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import bannerImg from "../assets/backgrounds/reg2.jpg";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between min-h-screen text-white">
      
      <div
        className="w-11/12 h-[50vh] bg-cover bg-center flex flex-col justify-center items-center rounded-xl mt-8"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <h1 className="text-5xl font-bold drop-shadow-xl">Contact Us</h1>
        <p className="mt-2 text-gray-300 drop-shadow-lg">Home / Contact</p>
      </div>

      {/* ----------- main content vala section ----------- */}
<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-16 px-6 bg-white shadow-xl backdrop-blur-md">

        {/* get in touch vala form */}
        <div className="bg-[#e9ecef] p-7 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-[#343a40]">Get In Touch</h2>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 bg-transparent border border-gray-500 rounded-md text-black"
            />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="p-3 bg-transparent border border-gray-500 rounded-md text-black"
            />
            <input
              type="text"
              placeholder="Title"
              className="p-3 bg-transparent border border-gray-500 rounded-md text-black"
            />
            <textarea
              placeholder="Type here..."
              rows="5"
              className="p-3 bg-transparent border border-gray-500 rounded-md text-black"
            ></textarea>

            <button className="bg-[#343a40] text-[#f8f9fa] py-3 rounded-md font-semibold hover:bg-[#6c757d] cursor-pointer">
              Send Now
            </button>
          </form>
        </div>

        {/* right hand side vala information section */}
        <div className="text-[#343a40] bg-[#e9ecef] p-7 rounded-xl shadow-lg  ">

          <p className="mb-8 leading-relaxed">
            Apne sare queries ke liye hmse contact kar sakte ho. Hm apki madad ke liye 24/7 available hain.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <Phone size={30} />
            <div>
              <h4 className="text-lg font-semibold">Phone Number</h4>
              <p>9999 8888 77</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Mail size={30} />
            <div>
              <h4 className="text-lg font-semibold">Email Address</h4>
              <p>Rentify@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <MessageCircle size={30} />
            <div>
              <h4 className="text-lg font-semibold">Whatsapp</h4>
              <p>9999 8888 77</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <MapPin size={30} />
            <div>
              <h4 className="text-lg font-semibold">Our Office</h4>
              <p>Bihar, India</p>
            </div>
          </div>
<div className=" bg-[#adb5bd] p-7 rounded-xl shadow-lg">
          {/* map area yaha lagaenge */}
         <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2716.142054161598!2d85.7103022!3d26.458534999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec519344f350b7%3A0xdafe6e56514d6d23!2sTHAKUR%20ENTERPRISES!5e1!3m2!1sen!2sin!4v1764915032478!5m2!1sen!2sin"
  width="100%"
  height="350"
  style={{ border: 0 }}
  
  allowFullScreen={true}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
</div>
        </div>
      </div>

      {/* bottom vala part- yaha pe baki ka banner v paste karenge*/}
      <div
        className="w-full h-[40vh] bg-cover bg-center flex items-center justify-center rounded-"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white drop-shadow-xl">
            We Are Always Ready To Help You
          </h2>
          <Link to="/register">
          <button className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-300 cursor-pointer">
            
            Get Started
          </button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Contact;
