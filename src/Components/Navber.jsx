import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navber = () => {
  const { user,logOut } = useAuth();
  console.log(user);

  const handelLogout=()=>{
    logOut()
    .then(res=>{

    })
    .catch(error=>{

    })
  }

  const links = (
    <>
      <NavLink to="/">
        <li className="text-[16px] font-semibold btn btn-ghost">Home</li>
      </NavLink>
      <NavLink to="/dashboard">
        <li className="text-[16px] font-semibold btn btn-ghost">Dashboard</li>
      </NavLink>
      <NavLink to="/dashboard/add-lesson">
        <li className="text-[16px] font-semibold btn btn-ghost">add-lesson</li>
      </NavLink>
      <NavLink to="/dashboard/my-lessons">
        <li className="text-[16px] font-semibold btn btn-ghost">my-lessons</li>
      </NavLink>
      <NavLink to="/Public-lessons">
        <li className="text-[16px] font-semibold btn btn-ghost">
          Public Lessons
        </li>
      </NavLink>
      <NavLink to="/upgrade">
        <li className="text-[16px] font-semibold btn btn-ghost">upgrade</li>
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
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
                <p className="text-[16px] font-semibold ">{user.displayName}</p>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="justify-between text-[16px] font-semibold "
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
                <button onClick={handelLogout} className="text-[16px] font-semibold ">Logout</button>
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
