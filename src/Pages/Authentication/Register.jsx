import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "./SocialLogin";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { registerEmailPassword } = useAuth();

  const handelRegister = (data) => {
    registerEmailPassword(data.email, data.password)
      .then((res) => {
        console.log(user);

        const userInfo = {
          displayName: data.name,
          email: data.email,
          photoURL: data.photo,
          password: data.password,
        };

        // console.log(userInfo);

        axiosSecure.post("/users", userInfo).then((res) => {
          // console.log(res.data);
          navigate(location.state?.from || "/");
          Swal.fire({
            title: "Register successful !",
            text: "You clicked the button!",
            icon: "success",
          });
        });

        // update user profile

        const userProfile = {
          displayName: data.name,
          email: data.email,
          photoURL: data.photo,
          password: data.password,
          role: "user",
        };
        updateUserProfile(userProfile)
          .then(() => {
            // console.log("user profile updated");
            Swal.fire({
              title: "Update Profile Successful !",
              text: "You clicked the button!",
              icon: "success",
            });
          })
          .catch((error) => {
            // console.log(error);
          });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  ">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-3">
            Please Register Now !
          </h1>
          <form onSubmit={handleSubmit(handelRegister)} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Enter your name"
            />

            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              {...register("photo", { required: true })}
              className="input"
              placeholder="Enter your Photo URL"
            />

            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4">Register Now !</button>
            <div>
              <p className="text-[14px] mb-4">
                Already have an account? please{" "}
                <Link
                  to="/login"
                  className="font-bold text-[16px] underline text-blue-500"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
