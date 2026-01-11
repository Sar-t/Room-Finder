import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { options, label, className = "", ...props },
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

      <select
        id={id}
        ref={ref}
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
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
