import React, { useState } from "react";
import Input from "./Input";
import Select from "./Select";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "../../Supabase/supabaseClient";

const Signup = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);

    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
          data: {
            type: data.type,
            name: data.name,
            phone_no: data.phone_no,
          },
        },
      });
    
    if (!authError && authData.user) {
      setMessage("Signup successful! Please verify your email.");
      reset();
    }else {
      setMessage("Signup error: " + authError.message);
    }

    setLoading(false);
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

      {/* LEFT IMAGE */}
      <div className="hidden sm:block md:w-1/2 relative h-64 md:h-auto">
        <img
          src="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg"
          alt="Signup visual"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Join Our Community
          </h2>
          <p className="text-sm opacity-90 leading-relaxed">
            Find rooms • Meet verified owners • Rent with confidence
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center">
            Create Account
          </h2>
          <p className="text-center text-slate-500 text-sm mb-4">
            Sign up to get started
          </p>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register("name", { required: "Full name is required" })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm">
              {errors.name.message}
            </span>
          )}

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-red-600 text-sm">
              {errors.email.message}
            </span>
          )}

          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <span className="text-red-600 text-sm">
              {errors.password.message}
            </span>
          )}

          <Input
            label="Phone Number"
            placeholder="10-digit mobile number"
            {...register("phone_no", { required: "Phone number required" })}
          />
          {errors["phone_no"] && (
            <span className="text-red-600 text-sm">
              {errors["phone_no"].message}
            </span>
          )}

          <Select
            label="User Type"
            options={["Room Seeker", "Room Owner"]}
            {...register("type")}
          />

          <Button
            type = "submit"
            disabled={loading}
            className="mt-2 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          {message && (
            <span className="text-center text-sm text-green-600">
              {message}
            </span>
          )}

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>

    </div>
  </div>
);

};

export default Signup;
