import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadImages } from "../../Supabase/imageUtil";
import { useSelector } from "react-redux";
import { supabase } from "../../Supabase/supabaseClient";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let imgUrl = [];

    if (data.images && data.images.length > 0) {
      const imageFiles = Array.from(data.images);
      imgUrl = await uploadImages(imageFiles, import.meta.env.BUCKET);
    }

    if (imgUrl.length > 0) {
      const { data:PropData, error:PropError} = await supabase.from("Room").insert({
        title: data.description,
        location: data.location,
        rent: data.price,
        property_type: data.property_type,
        tenant_preference: data.tenant_pref,
        images: imgUrl,
        owner: userData.userData.id,
      }).select().single(); //to get the inserted row as object
      if (PropError) {
        console.error("Error adding property:", PropError);
      }else{
        alert("Property added successfully!");
        navigate("/property/" + PropData.id);
      }

    }
    setLoading(false)    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">
          Add Property
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Description */}
          <div className="md:col-span-2">
            <label className="label">Property Description</label>
            <input
              className="input"
              placeholder="Spacious 2BHK near metro..."
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="label">Location</label>
            <input
              className="input"
              placeholder="City / Area"
              {...register("location", { required: "Location is required" })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="label">Monthly Rent</label>
            <input
              type="number"
              className="input"
              placeholder="₹ Rent"
              {...register("price", { required: "Price is required" })}
            />
          </div>

          {/* Property Type */}
          <div>
            <label className="label">Property Type</label>
            <select
              className="input"
              {...register("property_type", { required: true })}
            >
              <option value="">Select</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
            </select>
          </div>

          {/* Tenant Preference */}
          <div>
            <label className="label">Tenant Preference</label>
            <select
              className="input"
              {...register("tenant_pref", { required: true })}
            >
              <option value="">Select</option>
              <option value="Family">Family</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Girls">Girls</option>
              <option value="Working">Working</option>
            </select>
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="label">Property Images</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0 file:bg-blue-50
                         file:text-blue-600 hover:file:bg-blue-100"
              {...register("images", { required: true })}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold"
            >
              {loading? "Adding": "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
