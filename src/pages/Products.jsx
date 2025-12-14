import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ItemCard from "../components/ItemCard";
import categories from "../data/categories";
import allProducts from "../data/products";

import bgVid from "../assets/bgvideos/3770033-hd_1920_1080_25fps.mp4";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  FaLaptop,
  FaCouch,
  FaCar,
  FaBlender,
  FaBook,
  FaLayerGroup,
} from "react-icons/fa";

/* ================= CATEGORY ICONS ================= */
const categoryIcons = {
  all: <FaLayerGroup />,
  electronics: <FaLaptop />,
  furniture: <FaCouch />,
  automobiles: <FaCar />,
  homeappliances: <FaBlender />,
  stationery: <FaBook />,
};

/* ================= CATEGORY META ================= */
const categoryMeta = {
  all: {
    title: "Our Products",
    description:
      "Discover an exclusive collection of premium rental products curated just for you. Enjoy flexibility, affordability, and quality across multiple categories — designed to make renting simple, smart, and seamless.",
  },
  electronics: {
    title: "Electronics",
    description:
      "Latest laptops, cameras, smartphones and smart gadgets available on flexible rentals.",
  },
  furniture: {
    title: "Furniture",
    description:
      "Comfortable, stylish and affordable furniture to transform your living and working spaces.",
  },
  automobiles: {
    title: "Automobiles",
    description:
      "Cars, bikes and scooters available for daily, weekly and monthly rentals.",
  },
  homeappliances: {
    title: "Home Appliances",
    description:
      "Essential home appliances to simplify your everyday lifestyle with ease.",
  },
  stationery: {
    title: "Study Materials",
    description:
      "Books, notes and learning essentials for students and professionals.",
  },
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const [collapsed, setCollapsed] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  /* ================= FADE ANIMATION ================= */
  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(t);
  }, [selectedCategory]);

  /* ================= FILTER LOGIC (FINAL FIX) ================= */
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return allProducts;
    return allProducts.filter(
      (item) => item.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">

      {/* ================= HEADER WITH VIDEO ================= */}
      <div className="relative w-11/12 mx-auto mt-6 rounded-xl overflow-hidden h-[32vh]">
        <video
          src={bgVid}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 h-full flex items-start justify-center pt-10">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
              {categoryMeta[selectedCategory]?.title}
            </h1>
            <p className="text-[#ced4da] text-base md:text-lg mt-4 max-w-3xl mx-auto">
              {categoryMeta[selectedCategory]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="w-11/12 max-w-maxContent mx-auto py-10 flex gap-8">

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`bg-white border border-gray-300 rounded-xl p-4 h-fit sticky top-28
          transition-all duration-300
          ${collapsed ? "w-[80px]" : "w-[260px]"}`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h3 className="font-semibold text-lg text-[#212529]">
                Categories
              </h3>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md hover:bg-[#dee2e6]"
            >
              {collapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>

          {/* CATEGORY LIST */}
          <div className="flex flex-col gap-2">
            {categories.map((cat) => {
              const active = cat.value === selectedCategory;
              return (
                <a
                  key={cat.value}
                  href={`/products?category=${cat.value}`}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                  ${
                    active
                      ? "bg-[#495057] text-white"
                      : "text-[#343a40] hover:bg-[#dee2e6]"
                  }`}
                >
                  <span className="text-lg">
                    {categoryIcons[cat.value]}
                  </span>
                  {!collapsed && (
                    <span className="text-sm font-medium">
                      {cat.label}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </aside>

        {/* ================= PRODUCTS GRID ================= */}
        <section className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center text-[#6c757d] mt-20 text-lg">
              No products available in this category
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
              transition-all duration-500
              ${fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {filteredProducts.map((item) => (
                <ItemCard key={item.id} itemData={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
