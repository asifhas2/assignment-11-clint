import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "https://digital-life-lesson-server-rho.vercel.app",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
