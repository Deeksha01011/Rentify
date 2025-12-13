const FormWrapper = ({ title, subtitle, children }) => {
  return (
    <div className="
      bg-[#212529]
      p-10
      rounded-3xl
      shadow-2xl
      w-full max-w-md
      border border-[#343a40]
      backdrop-blur-md
      hover:shadow-[0_0_40px_rgba(173,181,189,0.08)]
      transition-all duration-500
      animate-fadeIn
    ">

      <h2 className="text-[#f8f9fa] text-2xl font-bold tracking-wide mb-2">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[#dee2e6] text-sm mb-6">
          {subtitle}
        </p>
      )}

      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
};

export default FormWrapper;
