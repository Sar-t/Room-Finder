import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 pl-1 text-sm font-medium text-slate-600"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        {...props}
        className={`
          w-full
          px-3 py-2.5
          rounded-lg
          border border-gray-200
          bg-white
          text-slate-800
          text-[16px] sm:text-sm
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500
          focus:bg-gray-50
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  );
});

export default Input;
