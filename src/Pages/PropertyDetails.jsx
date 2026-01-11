import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../../Supabase/supabaseClient";
import { useSelector } from "react-redux";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userData = useSelector((state)=>state.auth.userData);
  const loggedInUserId = userData?.userData?.id;
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("Room")
        .select(`
          *,
          owner (
            id,
            email,
            phone_no
          )
        `)
        .eq("id", id)
        .single();

      if (error) {
        setError("Property not found");
      } else {
        setProperty(data);
      }
      setIsOwner(loggedInUserId === data?.owner?.id);
      console.log("isOwner", isOwner);
      setLoading(false);
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-600 text-sm">Loading property...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
  <div className="bg-gray-50 min-h-screen py-10">
    <div className="max-w-6xl mx-auto px-4">

      {/* IMAGE SECTION (TOP CENTER) */}
      <div className="mb-10">
        {property.images?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Property"
                className="w-full h-72 object-cover rounded-2xl shadow"
              />
            ))}
          </div>
        )}
      </div>

      {/* TITLE & PRICE */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          {property.title}
        </h1>
        <p className="text-slate-600 mb-4 text-lg">
          📍 {property.location}
        </p>

        <p className="text-3xl font-semibold text-blue-600">
          ₹{property.rent} <span className="text-base font-normal text-slate-600">/ month</span>
        </p>
      </div>

      {/* DETAILS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PROPERTY INFO */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Property Details
          </h2>

          <div className="flex flex-col gap-3 text-slate-700">
            <div className="flex justify-between">
              <span className="font-medium">Property Type</span>
              <span>{property.property_type}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium">Tenant Preference</span>
              <span>{property.tenant_preference}</span>
            </div>
          </div>
        </div>

        {/* OWNER INFO */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Owner Contact
          </h2>

          <div className="flex flex-col gap-2 text-slate-700">
            {property.owner?.phone_no && (
              <a
                href={`tel:${property.owner.phone_no}`}
                className="text-blue-600 hover:underline text-lg"
              >
                📞 {property.owner.phone_no}
              </a>
            )}

            {property.owner?.email && (
              <a
                href={`mailto:${property.owner.email}`}
                className="text-blue-600 hover:underline"
              >
                ✉️ {property.owner.email}
              </a>
            )}
          </div>
        </div>
      </div>
            {/* OWNER ACTIONS */}
      {isOwner && (
        <div className="flex justify-center gap-4 mt-8">
          <Link
            to={`/property/${property.id}/edit`}
            className="px-6 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
          >
            ✏️ Edit Property
          </Link>

          <Link
            to={`/property/${property.id}/delete`}
            className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition font-medium"
          >
            🗑️ Delete Property
          </Link>
        </div>
      )}

      {/* CALL TO ACTION */}
      <div className="mt-10 flex justify-center">
        <a
          href={`tel:${property.owner?.phone_no || ""}`}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold text-lg"
        >
          Contact Owner
        </a>
      </div>

    </div>
  </div>
);

};

export default PropertyDetails;
