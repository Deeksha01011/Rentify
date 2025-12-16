const AddressCard = () => {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Delivery Address</h3>

      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">Deeksha</p>
          <p className="text-sm text-gray-600">
            IKGPTU, Kapurthala<br />
            Pin: 144601<br />
            Punjab, India
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Phone: 9988776655
          </p>
        </div>

        <span className="text-xs bg-gray-200 px-3 py-1 rounded-full">
          HOME
        </span>
      </div>
    </div>
  );
};

export default AddressCard;
