import React from "react";
import { CiHeart } from "react-icons/ci"

const ItemCard = ({ itemData }) => {
  return (
    <div className="w-[90%] relative h-88  border border-gray-300 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-transform transition-all duration-300 cursor-pointer overflow-hidden flex flex-col">
      {/* Image Section */}

      <div className="h-7 w-7 rounded-full flex items-center justify-center border border-gray-500 absolute right-5 top-3">
        <CiHeart className="text-xl" />

      </div>
      <div className="w-full h-44">
        <img
          src={itemData.image}
          alt={itemData.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-2 p-4 rounded-t-xl absolute top-41 bg-white w-full">
        {/* Title + Category */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">
            {itemData.title}
          </h2>

          <h3 className="text-sm text-gray-500 border border-gray-400 w-fit px-1 py-1 rounded-sm mt-1">
            {itemData.category}
          </h3>
        </div>

        {/* Description */}
        <span className="text-sm text-gray-600 line-clamp-3 ">
          {itemData.description}
        </span>

        <div className="flex justify-between mt-3">
          <span className="text-m font-semibold text-gray-600">
            {itemData.price}/month
          </span>

          <div>
            <span className="text-m text-black hover:text-white bg-gray-100 border hover:border-transparent hover:bg-gray-900 px-3 py-1 rounded-lg transition-all cursor-pointer">
              Rent now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
