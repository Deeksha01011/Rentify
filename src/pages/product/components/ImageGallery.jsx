import React from "react";

const ImageGallery = ({ images }) => {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <img
        src={images[0]}
        alt="product"
        className="w-full h-[420px] object-contain"
      />
    </div>
  );
};

export default ImageGallery;
