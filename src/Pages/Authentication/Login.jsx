import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { signInEmailPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handelLogin = (data) => {
    signInEmailPassword(data.email, data.password)
      .then((res) => {
        Swal.fire({
          title: "Login successful !",
          text: "You clicked the button!",
          icon: "success",
        });
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        console.log(error);
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
            Please Login Now !
          </h1>
          <form onSubmit={handleSubmit(handelLogin)} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="input"
              placeholder="Enter your password"
            />
            <button className="btn btn-neutral mt-4">Login Now !</button>
            <div>
              <p className="text-[14px] mb-4">
                Do not have any account? please{" "}
                <Link
                  to="/register"
                  className="font-bold text-[16px] underline text-blue-500"
                >
                  Register
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

export default Login;
