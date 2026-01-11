import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  size = "md", // 👈 NEW
  ...props
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm sm:text-base",
    lg: "px-6 py-3 text-base sm:text-lg",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-medium
        transition
        duration-200
        ${sizes[size]}
        ${bgColor}
        ${textColor}
        hover:opacity-90
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
