const Select = ({ label, options }) => {
  return (
    <div className="flex flex-col gap-1 group">
      <label className="text-[#dee2e6] text-sm tracking-wide">
        {label}
      </label>

      <select
        className="
          bg-[#343a40]
          text-[#f8f9fa]
          px-4 py-3
          rounded-xl
          border border-[#495057]
          focus:outline-none
          focus:ring-2
          focus:ring-[#adb5bd]
          focus:border-[#adb5bd]
          group-hover:shadow-[0_0_15px_rgba(173,181,189,0.15)]
          transition-all duration-300
        "
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-[#212529]">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
