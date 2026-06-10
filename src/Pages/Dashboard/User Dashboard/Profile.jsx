import { useState } from "react";
import {
  FaCrown,
  FaEnvelope,
  FaBookOpen,
  FaHeart,
  FaEdit,
  FaEye,
  FaLock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const myLessons = [
  {
    _id: "1",
    title: "Learning from Failure",
    category: "Mindset",
    tone: "Motivational",
    likes: 120,
    date: "2026-05-12",
    image: "https://i.ibb.co.com/6bQ7Q8Y/pexels-photo-3756679.jpg",
  },
  {
    _id: "2",
    title: "How I Improved My Career",
    category: "Career",
    tone: "Realization",
    likes: 95,
    date: "2026-05-10",
    image: "https://i.ibb.co.com/fG6V0VL/pexels-photo-1184572.jpg",
  },
  {
    _id: "3",
    title: "Relationship Lessons",
    category: "Relationships",
    tone: "Sad",
    likes: 60,
    date: "2026-05-08",
    image: "https://i.ibb.co.com/fN6x5xD/pexels-photo-4065158.jpg",
  },
];

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   console.log(user);

  const { data = [] } = useQuery({
    queryKey: ["lesson", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ["favorite", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorite?email=${user.email}`,
      );
      return res.data;
    },
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  console.log(users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const userInfo = {
      displayName: data?.name,
      photoURL: data?.photo,
    };

    updateUserProfile(userInfo)
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [sortType, setSortType] = useState("newest");

  const sortedLessons = [...data].sort((a, b) => {
    if (sortType === "popular") {
      return b.reactions - a.reactions;
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-base-100 rounded-3xl shadow-xl p-8 mb-10"
      >
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left */}
          <div className="relative">
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-primary"
            />

            {/* Premium Badge */}
            {/* Admin / Premium Badge */}
            {users?.role === "admin" ? (
              <div className="absolute -top-2 -right-2 badge badge-error gap-1 p-4 text-white font-bold">
                Admin
              </div>
            ) : users?.plan === "premium" ? (
              <div className="absolute -top-2 -right-2 badge badge-warning gap-1 p-4 text-base-content font-bold">
                <FaCrown />
                Premium
              </div>
            ) : null}
          </div>

          {/* Right */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-3">{user?.displayName}</h2>

            <div className="flex items-center gap-2 text-lg text-gray-500 mb-6">
              <FaEnvelope />
              <p>{user?.email}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary text-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaBookOpen className="text-3xl" />
                  <div>
                    <h3 className="text-2xl font-bold">{data?.length}</h3>
                    <p>Lessons Created</p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary text-white rounded-2xl p-5 shadow-lg">
                <div className="flex items-center gap-3">
                  <FaHeart className="text-3xl" />
                  <div>
                    <h3 className="text-2xl font-bold">{favorites?.length}</h3>
                    <p>Lessons Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-5 flex items-center gap-2">
            <FaEdit />
            Update Profile
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {/* Display Name */}
            <div>
              <input
                type="text"
                placeholder="Display Name"
                className="input input-bordered w-full"
                {...register("name", {
                  required: "Name is required",
                })}
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <input
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                {...register("photo", {
                  required: "Photo URL is required",
                })}
              />

              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email Disabled */}
            <input
              type="email"
              value={user?.email}
              disabled
              className="input input-bordered w-full md:col-span-2"
            />

            {/* Button */}
            <button className="btn btn-primary md:w-52">Save Changes</button>
          </form>
        </div>
      </motion.div>
      {/* Sort Dropdown */}
      <select
        className="select select-bordered"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="popular">Most Popular</option>
      </select>

      <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6 bg-base-200 min-h-screen">
        {sortedLessons?.map((lesson, index) => {
          const isLocked =
            lesson.access === "premium" && users?.plan !== "premium";

          const publicCard = lesson.privacy === "public";

          return (
            <>
              {publicCard && (
                <motion.div
                  key={lesson._id || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card bg-base-100 shadow-xl relative overflow-hidden"
                >
                  <div
                    className={isLocked ? "blur-sm pointer-events-none" : ""}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{lesson.title}</h2>

                      <p className="text-sm opacity-70">
                        {lesson.description?.slice(0, 80)}...
                      </p>

                      <div className="flex gap-2 flex-wrap mt-2">
                        <span className="badge badge-primary">
                          {lesson.category}
                        </span>
                        <span className="badge badge-secondary">
                          {lesson.tone}
                        </span>
                        <span
                          className={`badge ${
                            lesson.access === "premium"
                              ? "badge-warning"
                              : "badge-success"
                          }`}
                        >
                          {lesson.access}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mt-4">
                        <img
                          src={lesson.creatorPhoto}
                          className="w-10 h-10 rounded-full"
                          alt="creator"
                        />
                        <div>
                          <p className="text-sm font-semibold">
                            {lesson.creatorName}
                          </p>
                          <p className="text-xs opacity-60">
                            {lesson.createdAt}
                          </p>
                        </div>
                      </div>

                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={
                            isLocked
                              ? "/upgrade"
                              : `/public-lessons/${lesson._id}`
                          }
                          className={`btn btn-primary btn-sm ${
                            isLocked ? "opacity-50" : ""
                          }`}
                        >
                          See Details
                        </Link>
                      </div>
                    </div>
                  </div>

                  {isLocked && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white z-10">
                      <FaLock className="text-4xl mb-2" />
                      <p className="font-bold text-lg">Premium Lesson</p>
                      <p className="text-sm mb-3">
                        Upgrade to view full content
                      </p>

                      <Link
                        to="/upgrade"
                        className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300"
                      >
                        Upgrade Now
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
