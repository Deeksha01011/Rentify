const plans = [1, 3, 6, 9, 12];

const RentPlans = ({ basePrice, selectedMonth, setSelectedMonth }) => {
  const getPrice = (month) => {
    if (month === 1) return basePrice;
    if (month === 3) return basePrice * 0.95;
    if (month === 6) return basePrice * 0.9;
    if (month === 9) return basePrice * 0.85;
    return basePrice * 0.8;
  };

  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">Choose Rental Duration</h3>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((month) => (
          <div
            key={month}
            onClick={() => setSelectedMonth(month)}
            className={`cursor-pointer border rounded-xl p-4 text-center transition
              ${
                selectedMonth === month
                  ? "border-black bg-gray-100"
                  : "hover:border-gray-400"
              }`}
          >
            <p className="font-semibold">{month} Months</p>
            <p className="text-sm text-gray-600">
              ₹{Math.round(getPrice(month))}/month
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentPlans;
