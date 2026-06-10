import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signInEmailPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ MAIN LOGIN (with full error handling)
  const handelLogin = async (data) => {
    try {
      setLoading(true);

      if (!data.email || !data.password) {
        return Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Email and password are required",
        });
      }

      await signInEmailPassword(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login successful!",
      });

      navigate(location.state?.from || "/");
    } catch (error) {
      console.log("LOGIN ERROR:", error);

      let message = "Something went wrong";

      if (error?.code === "auth/user-not-found") {
        message = "User not found";
      } else if (error?.code === "auth/wrong-password") {
        message = "Incorrect password";
      } else if (error?.code === "auth/invalid-email") {
        message = "Invalid email format";
      } else if (error?.code === "auth/network-request-failed") {
        message = "Network error. Check internet connection";
      } else if (error?.message) {
        message = error.message;
      }

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Demo Login (Reusable)
  const handleDemoLogin = async (type) => {
    let email = "";
    let password = "";

    if (type === "user") {
      email = "user@gmail.com";
      password = "User@12345";
    }

    if (type === "admin") {
      email = "admin@gmail.com";
      password = "Admin@12345";
    }

    try {
      setLoading(true);

      setValue("email", email);
      setValue("password", password);

      await signInEmailPassword(email, password);

      Swal.fire({
        icon: "success",
        title: `${type.toUpperCase()} login successful!`,
        timer: 1200,
        showConfirmButton: false,
      });

      navigate(location.state?.from || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Demo login failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">

          <h1 className="text-3xl font-bold text-center mb-3">
            Please Login Now!
          </h1>

          <form onSubmit={handleSubmit(handelLogin)} className="fieldset">

            {/* EMAIL */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="input"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message}
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
              })}
              className="input"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}

            {/* LOGIN BUTTON */}
            <button
              disabled={loading}
              className="btn btn-neutral mt-4 w-full"
            >
              {loading ? "Logging in..." : "Login Now!"}
            </button>

            {/* DEMO USER */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin("user")}
              className="btn btn-primary mt-2 w-full"
            >
              Demo User Login
            </button>

            {/* DEMO ADMIN */}
            <button
              type="button"
              disabled={loading}
              onClick={() => handleDemoLogin("admin")}
              className="btn btn-error mt-2 w-full"
            >
              Demo Admin Login
            </button>

            {/* REGISTER */}
            <div className="mt-4 text-center">
              <p className="text-[14px]">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 font-bold underline"
                >
                  Register
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

export default Login;