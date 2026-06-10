import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { registerEmailPassword, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handelRegister = async (data) => {
    try {
      // 1️⃣ Create user
      const res = await registerEmailPassword(data.email, data.password);

      if (!res?.user) {
        throw new Error("User registration failed");
      }

      // 2️⃣ User info
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: data.photo,
        role: "user",
      };

      // 3️⃣ Save in DB
      await axiosSecure.post("/users", userInfo);

      // 4️⃣ Update profile
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photo,
      });

      // 5️⃣ Success UI
      Swal.fire({
        title: "Registration Successful!",
        icon: "success",
      });

      reset();
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Registration Failed!",
        text: error.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center mb-3">
            Please Register Now!
          </h1>

          <form onSubmit={handleSubmit(handelRegister)} className="fieldset">

            {/* NAME */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="input"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}

            {/* EMAIL */}
            <label className="label mt-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}

            {/* PHOTO */}
            <label className="label mt-2">Photo URL</label>
            <input
              type="text"
              {...register("photo", {
                required: "Photo URL is required",
              })}
              className="input"
              placeholder="Enter your Photo URL"
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">
                {errors.photo.message}
              </p>
            )}

            {/* PASSWORD */}
            <label className="label mt-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message:
                    "Must include uppercase, lowercase, and number",
                },
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* SUBMIT BUTTON */}
            <button
              disabled={isSubmitting}
              className="btn btn-neutral mt-4 w-full"
            >
              {isSubmitting ? "Registering..." : "Register Now!"}
            </button>

            {/* LOGIN LINK */}
            <div className="mt-4 text-center">
              <p className="text-[14px]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-blue-500 underline"
                >
                  Login
                </Link>
              </p>
            </div>

          </form>

          {/* SOCIAL LOGIN */}
          <SocialLogin />

        </div>
      </div>
    </div>
  );
};

export default Register;