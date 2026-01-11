import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import { supabase } from "../../Supabase/supabaseClient";
import { uploadImages } from "../../Supabase/imageUtil";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const loggedInUserId = userData?.userData?.id;
    const [property, setProperty] = useState(null);
    const [newImages, setNewImages] = useState([]);
  const { register, handleSubmit, reset } = useForm();
    const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PROPERTY ================= */
    const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setNewImages(files);
};

  useEffect(() => {
    const fetchProperty = async () => {
  
      const { data, error } = await supabase
        .from("Room")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        setError("Property not found");
      } else if (data.owner !== loggedInUserId) {
        setError("You are not allowed to edit this property");
      } else {
        reset({
          title: data.title,
          location: data.location,
          rent: data.rent,
          property_type: data.property_type,
          tenant_preference: data.tenant_preference,
        });
        setProperty(data);
      }

      setLoading(false);
    };

    if (loggedInUserId) fetchProperty();
  }, [id, loggedInUserId, reset]);

  /* ================= UPDATE PROPERTY ================= */

  const onSubmit = async (formData) => {
  try {
    setEditing(true);
    let updatedImages = property.images || [];

    // Upload new images if selected
    if (newImages.length > 0) {
      const uploadedUrls = await uploadImages(
        newImages,
        import.meta.env.VITE_SUPABASE_BUCKET // or BUCKET
      );

      updatedImages = [...updatedImages, ...uploadedUrls];
    }

    const { error } = await supabase
      .from("Room")
      .update({
        title: formData.title,
        location: formData.location,
        rent: Number(formData.rent),
        property_type: formData.property_type,
        tenant_preference: formData.tenant_preference,
        images: updatedImages,
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    navigate(`/property/${id}`);
  } catch (err) {
    console.error(err);
    setError("Failed to update property");
  }
  setEditing(false);
};


  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
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
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white max-w-lg w-full rounded-2xl shadow p-8"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Edit Property
        </h2>

        <div className="flex flex-col gap-4">
          <input
            className="input"
            placeholder="Title"
            {...register("title", { required: true })}
          />

          <input
            className="input"
            placeholder="Location"
            {...register("location", { required: true })}
          />

          <input
            type="number"
            className="input"
            placeholder="Monthly Rent"
            {...register("rent", { required: true })}
          />

          <select className="input" {...register("property_type")}>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>

          <select className="input" {...register("tenant_preference")}>
            <option value="Family">Family</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Girls">Girls</option>
            <option value="Working">Working</option>
          </select>
        </div>
        {/* EXISTING IMAGES */}
{property.images?.length > 0 && (
  <div className="mt-4">
    <p className="text-sm font-medium text-slate-600 mb-2">
      Existing Images
    </p>

    <div className="grid grid-cols-3 gap-3">
      {property.images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          className="h-24 w-full object-cover rounded-lg"
          alt="Property"
        />
      ))}
    </div>
  </div>
)}

{/* ADD NEW IMAGES */}
<div className="mt-6">
  <label className="label">Add New Images</label>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={handleImageChange}
    className="input"
  />

  {newImages.length > 0 && (
    <p className="helper-text">
      {newImages.length} new image(s) selected
    </p>
  )}
</div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl py-2 font-semibold"
          >
            {editing ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProperty;
