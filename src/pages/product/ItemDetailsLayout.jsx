import React, { useState } from "react";
import { updateStatus } from "../../Services/operations/adminOperations";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ItemDetailsLayout = ({ data }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(data?.item?.itemImages[1]);
  const getDate = (time) => {
    const date = new Date(time);

    const normalDateTime = date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return normalDateTime;
  };
  return (
    <div className="max-w-6xl mx-auto bg-white mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT IMAGE SECTION */}
      <div className="p-6 flex flex-col items-center">
        {/* MAIN IMAGE */}
        <img
          src={activeImage}
          alt="product"
          className="max-h-[500px] object-contain mb-6 transition-all duration-300"
        />

        {/* THUMBNAILS */}
        <div className="flex gap-3">
          {data?.item?.itemImages?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumb"
              onClick={() => setActiveImage(img)}
              className={`h-20 w-20 object-cover cursor-pointer border rounded-md 
                ${
                  activeImage === img
                    ? "border-black scale-105"
                    : "border-gray-300 opacity-70 hover:opacity-100"
                }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT CONTENT SECTION */}
      <div className="p-10 space-y-6">
        <h1 className="text-3xl font-semibold">{data?.item?.itemName}</h1>

        <p className="text-2xl text-blue-600 font-medium">
          {data?.estimateRent}
        </p>

        <p className="text-gray-500">{data?.item?.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <p>
            <b>Lister Earning</b> {data?.listersEarning}
          </p>
          <p>
            <b>Listing Period</b> {data?.listingPeriod}
          </p>
          <p>
            <b>Platform Fee</b> {data?.platformFee}
          </p>
          <p>
            <b>Listed By</b> {data?.listedBy?.firstName}{" "}
            {data?.listedBy?.lastName}
          </p>
          <p>
            <b>Email</b> {data?.listedBy?.email}
          </p>
          <p>
            <b>Add On</b> {getDate(data?.createdAt)}
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => updateStatus(data?._id, "approved", token, navigate)}
            className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
          >
            Approved
          </button>

          <button className="border px-6 py-3 rounded hover:bg-gray-100">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsLayout;
