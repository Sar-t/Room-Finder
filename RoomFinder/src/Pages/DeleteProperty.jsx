import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { supabase } from "../../Supabase/supabaseClient";

const DeleteProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const loggedInUserId = userData?.userData?.id;

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      const { data, error } = await supabase
        .from("Room")
        .select("id, title, location, rent, owner")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Property not found");
      } else if (data.owner !== loggedInUserId) {
        setError("You are not authorized to delete this property");
      } else {
        setProperty(data);
      }

      setLoading(false);
    };

    fetchProperty();
  }, [id, loggedInUserId]);

  const handleDelete = async () => {
    setDeleting(true);

    const { error } = await supabase
      .from("Room")
      .delete()
      .eq("id", id);

    if (error) {
      setError("Failed to delete property. Try again.");
      setDeleting(false);
    } else {
      navigate("/", { replace: true });
    }
  };

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Delete Property
        </h2>

        {/* Property Preview */}
        <div className="bg-gray-100 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-slate-800">
            {property.title}
          </h3>
          <p className="text-slate-600 text-sm">
            📍 {property.location}
          </p>
          <p className="text-slate-700 font-medium mt-1">
            ₹{property.rent} / month
          </p>
        </div>

        {/* Warning */}
        <p className="text-red-600 text-sm mb-6 text-center">
          ⚠️ This action is permanent and cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-600 hover:bg-red-700 transition text-white rounded-xl py-2 font-semibold"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProperty;
