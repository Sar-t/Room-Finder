import React, { useState } from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice.js";
import { supabase } from "../../Supabase/supabaseClient.js";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setLoading(true);

    const { data: authData, error } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

    if (error || !authData?.user) {
      setMessage(error?.message || "Invalid credentials");
      setLoading(false);
      return;
    }

    dispatch(login(authData.user));
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">

        {/* IMAGE SECTION */}
        <div className="hidden sm:block md:w-1/2 relative h-56 md:h-auto">
          <img
            src="https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome Back
            </h2>
            <p className="text-sm opacity-90 leading-snug">
              Find verified rooms. Connect with trusted owners.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="w-full md:w-1/2 px-6 py-8 sm:px-10 sm:py-10 flex flex-col justify-center">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-800">
              Sign In
            </h2>
            <p className="text-center text-slate-500 text-sm mb-3">
              Login to continue
            </p>

            {/* Email */}
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}

            {/* Password */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}

            {/* Button */}
            <Button
              type="submit"
              disabled={loading}
              size="md"
              className="mt-2 w-full"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {message && (
              <span className="text-red-600 text-center text-sm">
                {message}
              </span>
            )}

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;
