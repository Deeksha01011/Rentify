const RentSummary = ({ product, months }) => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

      <div className="flex gap-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div>
          <p className="font-medium">{product.title}</p>
          <p className="text-sm text-gray-600">{months} Months Rental</p>
          <p className="text-sm text-gray-600">
            ₹{product.price}/month
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentSummary;
