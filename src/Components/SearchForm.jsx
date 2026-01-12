import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";

const SearchForm = ({ defaultValues = {} }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      location: "",
      fromPrice: "",
      toPrice: "",
      property_type: "",
      tenant_preference: "",
      ...defaultValues,
    },
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const query = new URLSearchParams(data).toString();
    navigate(`/search?${query}`);
  };

  return (
    <div className="w-full flex justify-center px-4 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-6
          gap-4
          items-end
          bg-white
          shadow-md
          rounded-2xl
          p-4 sm:p-5
          w-full
          max-w-6xl
        "
      >
        {/* Location */}
        <Input
          label="Location"
          placeholder="City / Area"
          {...register("location")}
        />

        {/* Price From */}
        <Input
          label="Min Price"
          placeholder="₹ From"
          type="number"
          {...register("fromPrice")}
        />

        {/* Price To */}
        <Input
          label="Max Price"
          placeholder="₹ To"
          type="number"
          {...register("toPrice")}
        />

        {/* Property Type */}
        <Select
          label="Property Type"
          options={["Any", "1BHK", "2BHK", "3BHK"]}
          {...register("property_type")}
        />

        {/* Tenant Preference */}
        <Select
          label="Tenant Preference"
          options={["Any", "Family", "Bachelor", "Girls", "Working"]}
          {...register("tenant_preference")}
        />

        {/* Search Button */}
        <div className="w-full">
          <Button
            type="submit"
            size="md"
            className="w-full"
          >
            🔍 Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
