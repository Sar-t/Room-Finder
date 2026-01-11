import React, { useState } from "react";

const Card = ({
  imageSrc = "",
  title = "Property",
  description = "",
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  return (
  <div
    className={`
      group
      flex flex-col
      rounded-3xl
      border
      bg-white
      shadow-sm
      transition
      hover:shadow-lg
      md:hover:-translate-y-1
      w-full
      max-w-sm
      mx-auto
      min-h-[380px] sm:min-h-[420px]
      ${className}
    `}
  >
    {/* Image */}
    <div className="flex justify-center items-center p-4">
      <img
        src={
          !imgError && imageSrc
            ? imageSrc
            : "/placeholder.jpg"
        }
        alt={title}
        onError={() => setImgError(true)}
        loading="lazy"
        className="
          h-48 w-48
          sm:h-56 sm:w-56
          md:h-64 md:w-64
          object-cover
          rounded-xl
          transition-transform
          duration-300
          md:group-hover:scale-105
        "
      />
    </div>

    <hr className="mx-4" />

    {/* Text */}
    <div className="flex flex-col gap-2 px-4 py-5 text-center flex-grow">
      <h3 className="text-base sm:text-lg font-semibold text-slate-800 line-clamp-1">
        {title}
      </h3>

      <p className="text-sm text-slate-600 line-clamp-2">
        {description}
      </p>
    </div>
  </div>
);

};

export default Card;
