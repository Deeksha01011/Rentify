import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import slider1 from "../assets/backgrounds/bg1.jpg";
import slider2 from "../assets/backgrounds/bg2.jpg";
import slider3 from "../assets/backgrounds/bg3.jpg";

import book from "../assets/products/stationery/geeta.jpg";
import tv from "../assets/products/homeappliances/tv1.jpg";
import fryer from "../assets/products/homeappliances/microwave1.jpg";
import bike from "../assets/products/automobiles/bike10.jpg";
import sofa from "../assets/products/furnitures/sofa1.jpg";
import ac from "../assets/products/homeappliances/ac1.png";

import Bgvid from "../assets/bgvideos/3773486-hd_1920_1080_30fps.mp4";

import { Book, Tv, Home as HomeIcon, Car, Sofa } from "lucide-react";
import ItemCard from "../components/ItemCard";

// Featured Products Data
const itemData = [
  {
    id: 1,
    title: "Classic Literature Set",
    category: "Books",
    image: book,
    description: "A timeless collection of novels for book lovers.",
    price: "190"
  },
  {
    id: 2,
    title: "Smart LED TV",
    category: "Electronics",
    image: tv,
    description: "4K Ultra HD Smart TV for next-level entertainment.",
    price: "1200"
  },
  {
    id: 3,
    title: "Air Fryer",
    category: "Home Appliances",
    image: fryer,
    description: "Healthy cooking with quick & oil-free technology.",
    price: "300"
  },
  {
    id: 4,
    title: "Electric Bike",
    category: "Automobiles",
    image: bike,
    description: "Eco-friendly electric bike with powerful battery.",
    price: "750"
  },
  {
    id: 5,
    title: "Modern Sofa Set",
    category: "Furniture",
    image: sofa,
    description: "Premium cushioned sofa set for your living room.",
    price: "450"
  },
  {
    id: 6,
    title: "Air Conditioner",
    category: "Electronics",
    image: ac,
    description: "Stay cool with this energy-efficient air conditioner.",
    price: "900"
  },
];

const Home = () => {
  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const categories = [
    { name: "Study Materials", icon: <Book size={30} /> },
    { name: "Electronics", icon: <Tv size={30} /> },
    { name: "Home Appliances", icon: <HomeIcon size={30} /> },
    { name: "Automobiles", icon: <Car size={30} /> },
    { name: "Furniture", icon: <Sofa size={30} /> },
  ];

  return (
    <div className="w-11/12 max-w-maxContent mx-auto">

      {/* Slider Section */}
      <div className="mt-8">
        <Slider {...settings}>
          <div>
            <img src={slider1} className="rounded-xl h-96 w-full object-cover" />
          </div>
          <div>
            <img src={slider2} className="rounded-xl h-96 w-full object-cover" />
          </div>
          <div>
            <img src={slider3} className="rounded-xl h-96 w-full object-cover" />
          </div>
        </Slider>
      </div>

      {/* Category Section */}
      <section id="categories">
      <h2 className="text-2xl text-center font-bold mt-10 mb-6">Categories</h2>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-[#adb5bd] shadow-md rounded-xl p-5 flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer"
          >
            <div className="text-gray-700">{cat.icon}</div>
            <h3 className="text-md font-semibold text-gray-800">{cat.name}</h3>
          </div>
        ))}
      </div>
      </section>

      {/* Featured Products Section */}
      <h2 className="text-3xl font-bold text-center mt-14 mb-10 text-gray-800">
        Featured Products
      </h2>

     <div className="flex flex-wrap gap-8 mb-20">
  {itemData.map((product) => (
    <div
      key={product.id}
      className="
        w-full          // mobile: 1 per row
        // sm:w-1/2        // tablet: 2 per row
        // lg:w-1/3        // laptop: 3 per row
        // xl:w-1/5        // big screen: 5 per row
      "
    >
      <ItemCard itemData={product} />
    </div>
  ))}
</div>

      {/* Rent & List Video Banner Section */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-20">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-75"
        >
          <source src={Bgvid} type="video/mp4" />
        </video>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full py-16 flex flex-col items-center text-white"
        >
          <h2 className="text-4xl font-bold drop-shadow-lg">
            Rent What You Need. List What You Don’t.
          </h2>

          <p className="mt-2 text-center max-w-xl text-gray-200">
            Get any product at affordable rental prices or start earning by listing 
            your unused items on <span className="font-bold">Rentify</span>.
          </p>

          <div className="mt-6 flex gap-6">
            <button className="px-8 py-3 rounded-xl bg-[#343a40] text-white font-semibold shadow-md hover:bg-[#495057] transition cursor-pointer">
              Rent a Product
            </button>
            <button className="px-8 py-3 rounded-xl bg-white/30 backdrop-blur-md border border-gray-200 text-white font-semibold shadow-md hover:bg-white/40 transition cursor-pointer">
              List Your Product
            </button>
            
          </div>
        </motion.div>
      </div>



      {/* Reviews & Ratings Section */}
      <section id='reviews'>
<h2 className="text-3xl font-bold italic mt-16 mb-10 text-gray-800 ">
  What Our Users Say....
</h2>
<div className="py-5">

<Slider
  dots={true}
  infinite={true}
  autoplay={true}
  autoplaySpeed={2200}
  speed={800}
  slidesToShow={3}
  slidesToScroll={1}
  responsive={[
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 640, settings: { slidesToShow: 1 } },
  ]}
>
  {[
    {
      name: "Aarav Sharma",
      location: "Delhi",
      image: slider1,
      review: "Amazing service! Got a premium sofa for a great price.",
      rating: 5,
      price: "₹499 / month",
    },
    {
      name: "Meera Singh",
      location: "Mumbai",
      image: slider2,
      review: "The sofa was in perfect condition. Hassle-free rental!",
      rating: 4,
      price: "₹999 / month",
    },
    {
      name: "Rohan Patel",
      location: "Ahmedabad",
      image: slider3,
      review: "Loved the dining table! Very convenient & affordable.",
      rating: 5,
      price: "₹1999 / 3 months",
    },
    {
      name: "Simran Kaur",
      location: "Chandigarh",
      image: sofa,
      review: "Furniture quality was excellent. Highly recommended!",
      rating: 5,
      price: "₹3999 / 6 months",
    },
  ].map((item, index) => (
    <div key={index} className="px-4">
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.06, translateY: -8 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mx-3"
    >
      
      <div className="p-5 rounded-2xl bg-[#adb5bd] backdrop-blur-md border border-white/40
                      shadow-lg hover:shadow-2xl transition-all duration-300
                      relative overflow-hidden  cursor-pointer">
        
        {/* Glow Border (Animated) */}
        <div className="absolute inset-0 rounded-2xl border-[1px] border-[#adb5bd] 
                        shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
        </div>

        {/* Floating Animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <img
            src={item.image}
            className="h-40 w-full object-cover rounded-xl mb-4 "
          />
        </motion.div>

        {/* User Info */}
        <h3 className="text-lg font-bold text-white">{item.name}</h3>
        <p className="text-sm text-gray-200">{item.location}</p>

        {/* Review */}
        <p className="mt-3 text-gray-100 text-sm italic">"{item.review}"</p>

        {/* Star Rating Animation */}
        <div className="flex mt-3">
          {[...Array(item.rating)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 }}
              className="text-yellow-400 text-xl"
            >
              ★
            </motion.span>
          ))}
        </div>

        {/* Price */}
        <p className="mt-3 font-semibold text-white">{item.price}</p>
      </div>
    </motion.div>
    </div>
  ))}
</Slider>


</div>
</section>
    </div>
  );
};


export default Home;
