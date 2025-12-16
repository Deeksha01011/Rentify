const PriceBreakdown = ({ basePrice, selectedMonth }) => {
  const rent = basePrice * selectedMonth;
  const deposit = basePrice * 2;
  const gst = rent * 0.18;

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h4 className="font-semibold mb-2">Price Breakdown</h4>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Rent: ₹{rent}</p>
        <p>Refundable Deposit: ₹{deposit}</p>
        <p>GST (18%): ₹{Math.round(gst)}</p>
        <hr />
        <p className="font-semibold text-black">
          Total: ₹{Math.round(rent + deposit + gst)}
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
