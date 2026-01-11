import React, { useState } from "react";

const RoomCard = ({
  image,
  title,
  location,
  rent,
  propertyType,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="
        bg-white
        rounded-2xl
        overflow-hidden
        border
        shadow-sm
        hover:shadow-lg
        transition
        w-full
        max-w-sm
        mx-auto
        cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="relative h-48 sm:h-52 md:h-56 bg-gray-100">
        <img
          src={!imgError && image ? image : "/placeholder.jpg"}
          alt={title}
          onError={() => setImgError(true)}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-300
            md:hover:scale-105
          "
        />

        {/* Property type badge */}
        {propertyType && (
          <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-xs font-medium px-3 py-1 rounded-full shadow">
            {propertyType}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
          {title}
        </h3>

        {/* Location */}
        <p className="text-sm text-slate-600 truncate mt-1">
          📍 {location}
        </p>

        {/* Price */}
        <p className="mt-3 text-blue-600 font-semibold text-base">
          ₹{rent} <span className="text-sm font-normal text-slate-600">/ month</span>
        </p>
      </div>
    </div>
  );
};

export default RoomCard;
