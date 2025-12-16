import React from "react";
import { Link } from "react-router-dom";

const ListerCard = ({ itemData }) => {
  console.log("item ka data",itemData);
  return (
    <Link
      to={"/"}
      className="w-[40%] relative h-88  border border-gray-300 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-transform transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Image Section */}

      {/* <div className="h-7 w-7 rounded-full flex items-center justify-center border border-gray-500 absolute right-5 top-3">
        <CiHeart className="text-xl" />
      </div> */}
      <div className="w-full h-44">
        <img
          src={itemData?.item?.itemImages[3]}
          alt={itemData?.item?.itemName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-2 p-4 rounded-t-xl absolute top-41 bg-white w-full">
        {/* Title + Category */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">
            {itemData?.item?.itemName}
          </h2>

          <h3 className="text-sm text-gray-500 border border-gray-400 w-fit px-1 py-1 rounded-sm mt-1">
            {itemData.item?.category.name}
          </h3>
        </div>

        {/* Description */}
        <span className="text-sm text-gray-600 line-clamp-3 ">
          {itemData?.item?.description}
        </span>

        <div className="flex justify-between mt-3">
          <span className="text-m font-semibold text-gray-600">
            {itemData?.listersEarning}/month
          </span>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm
    ${
      itemData.status === "pending"
        ? "bg-yellow-200/40 text-yellow-800"
        : itemData.status === "rejected"
        ? "bg-red-200/40 text-red-800"
        : itemData.status === "approved"
        ? "bg-green-200/40 text-green-800"
        : ""
    }
  `}
            >
              {itemData.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListerCard;
