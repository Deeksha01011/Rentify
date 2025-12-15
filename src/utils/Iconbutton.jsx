import React from "react";

const Iconbutton = ({
  text,
  children,
  disabled,
  type,
  onclick,
  outline = false,
  customClasses,
}) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      type={type}
      className={`flex items-center ${
        outline ? "border bg-gray-900 bg-transparent" : "bg-gray-900"
      } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-white  ${customClasses}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Iconbutton;
