import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import ForbiddenPage from "../Components/ForbiddenPage";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const axiosSecure=useAxiosSecure();

    const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log(users);

  if (loading) {
    return (
      <span className="loading loading-spinner loading-xl"></span>
    );
  }

 
  if (!user) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  if (users?.role === "admin") {
    return children;
  }

  return <ForbiddenPage></ForbiddenPage> ;
};

export default AdminPrivateRoute;