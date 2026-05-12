import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Navber = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: users, isLoading } = useQuery({
    queryKey: ["upgrade", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log(users);

  const handelLogout = () => {
    logOut()
      .then(() => {})
      .catch(() => {});
  };

  const links = (
    <>
      <NavLink to="/">
        <li className="text-[16px] font-semibold btn btn-ghost">Home</li>
      </NavLink>

      <NavLink to="/dashboard">
        <li className="text-[16px] font-semibold btn btn-ghost">Dashboard</li>
      </NavLink>

      <NavLink to="/dashboard/add-lesson">
        <li className="text-[16px] font-semibold btn btn-ghost">Add Lesson</li>
      </NavLink>

      <NavLink to="/dashboard/my-lessons">
        <li className="text-[16px] font-semibold btn btn-ghost">My Lessons</li>
      </NavLink>

      <NavLink to="/public-lessons">
        <li className="text-[16px] font-semibold btn btn-ghost">
          Public Lessons
        </li>
      </NavLink>
      <NavLink  to="/upgrade">
        <li className="text-[16px] font-semibold btn btn-ghost">
          Upgrade
        </li>
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
       <div className="mx-3">
         {/* Conditional Upgrade Button */}
        {!isLoading && users?.plan !== "premium" && (
          <NavLink to="/upgrade">
            <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300">
              Free
            </button>
          </NavLink>
        )}

        {!isLoading && users?.plan === "premium" && (
          <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300">
            🚀 Go Premium
          </button>
        )}
       </div>
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <p className="text-[16px] font-semibold">{user?.displayName}</p>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="justify-between text-[16px] font-semibold"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to="/dashboard" className="text-[16px] font-semibold">
                  Dashboard
                </Link>
              </li>

              <li>
                <button
                  onClick={handelLogout}
                  className="text-[16px] font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login">
              <span className="btn">Login</span>
            </NavLink>

            <NavLink to="/register">
              <span className="btn">Signup</span>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
