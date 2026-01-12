import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../Supabase/supabaseClient";
import ShowProperty from "../Components/ShowProperty";
import { Link } from "react-router-dom";

const MyProperties = () => {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const userId = userData?.userData?.id;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMyProperties = async () => {
      const { data, error } = await supabase
        .from("Room")
        .select(`
          *,
          owner (
            email,
            phone_no
          )
        `)
        .eq("owner", userId)
        .order("created_at", { ascending: false });

      if (!error) {
        setProperties(data);
      }

      setLoading(false);
    };

    fetchMyProperties();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            My Properties
          </h1>

          <Link
            to="/add-property"
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            + Add Property
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-slate-600">Loading your properties…</p>
        ) : properties.length === 0 ? (
          <div className="text-center text-slate-600 mt-20">
            <p className="text-lg mb-4">You haven’t added any properties yet.</p>
            <Link
              to="/add-property"
              className="text-blue-600 hover:underline"
            >
              Add your first property →
            </Link>
          </div>
        ) : (
          <ShowProperty properties={properties} />
        )}
      </div>
    </div>
  );
};

export default MyProperties;
