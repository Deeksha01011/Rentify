const Button = ({ text, type="button", variant="primary" }) => {

  const base =
    "w-full py-3 rounded-xl font-semibold tracking-wide transition-all duration-300";

  const variants = {
    primary: "bg-[#f8f9fa] text-[#212529] hover:bg-[#ced4da] hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]",
    dark: "bg-[#343a40] text-[#f8f9fa] hover:bg-[#495057] hover:scale-[1.02]",
    disabled: "bg-[#ced4da] text-[#6c757d] cursor-not-allowed",
  };

  return (
    <button type={type} className={`${base} ${variants[variant]}`}>
      {text}
    </button>
  );
};

export default Button;
