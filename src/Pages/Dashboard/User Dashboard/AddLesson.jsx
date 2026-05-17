import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FaLock, FaCrown } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const AddLesson = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const { data } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const lessonData = {
      ...data,
      createdAt: new Date(),
      reactions: 0,
      saves: 0,
      creatorName: user?.displayName,
      creatorPhoto: user?.photoURL,
      plan: data.plan,
      email:user?.email,

    };

    console.log(lessonData);

    const res = await axiosSecure.post("/lessons", lessonData);

    console.log(res.data.insertedId);

    if (res.data.insertedId) {
        Swal.fire({
          title: "Add Lesson Successful",
          icon: "success",
          draggable: true,
        });
      reset();
      navigate("/dashboard/my-lessons");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-2xl rounded-3xl p-8">
        <h2 className="text-4xl font-bold text-center mb-2">Add New Lesson</h2>

        <p className="text-center text-gray-500 mb-8">
          Share your real life experience and inspire others
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Lesson Title */}
          <div>
            <label className="font-semibold mb-2 block">Lesson Title</label>

            <input
              type="text"
              placeholder="Enter lesson title"
              className="input input-bordered w-full"
              {...register("title", {
                required: "Lesson title is required",
              })}
            />

            {errors.title && (
              <p className="text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold mb-2 block">
              Full Description / Story / Insight
            </label>

            <textarea
              rows={6}
              placeholder="Write your lesson..."
              className="textarea textarea-bordered w-full"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>

            {errors.description && (
              <p className="text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category + Tone */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="font-semibold mb-2 block">Category</label>

              <select
                className="select select-bordered w-full"
                {...register("category", {
                  required: "Select a category",
                })}
              >
                <option value="">Select Category</option>
                <option value="Personal Growth">Personal Growth</option>
                <option value="Career">Career</option>
                <option value="Relationships">Relationships</option>
                <option value="Mindset">Mindset</option>
                <option value="Mistakes Learned">Mistakes Learned</option>
              </select>

              {errors.category && (
                <p className="text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="font-semibold mb-2 block">Emotional Tone</label>

              <select
                className="select select-bordered w-full"
                {...register("tone", {
                  required: "Select emotional tone",
                })}
              >
                <option value="">Select Tone</option>
                <option value="Motivational">Motivational</option>
                <option value="Sad">Sad</option>
                <option value="Realization">Realization</option>
                <option value="Gratitude">Gratitude</option>
              </select>

              {errors.tone && (
                <p className="text-red-500 mt-1">{errors.tone.message}</p>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="font-semibold mb-2 block">Image (Optional)</label>

            <input
              type="text"
              placeholder="Enter your image URL"
              className="file-input file-input-bordered w-full"
              {...register("image")}
            />
          </div>

          {/* Privacy + Access */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Privacy */}
            <div>
              <label className="font-semibold mb-2 block">Privacy</label>

              <select
                className="select select-bordered w-full"
                {...register("privacy")}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Access Level */}
            <div>
              <label className="font-semibold mb-2 block">Access Level</label>

              <div
                className="tooltip w-full"
                data-tip={
                  data?.plan === "free"
                    ? "Upgrade to Premium to create paid lessons"
                    : ""
                }
              >
                <select
                  className="select select-bordered w-full"
                  disabled={data?.plan === "free"}
                  {...register("access")}
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {data?.plan === "free" && (
                <p className="text-orange-500 mt-2 flex items-center gap-2">
                  <FaLock />
                  Upgrade to Premium to unlock paid lessons
                </p>
              )}
            </div>
          </div>

          {/* Premium Badge */}
          <div className="flex justify-end">
            {data?.plan === "premium" ? (
              <div className="badge badge-warning gap-2 p-4">
                <FaCrown />
                Premium User
              </div>
            ) : (
              <div className="badge badge-outline p-4">Free User</div>
            )}
          </div>

          {/* Submit Button */}
          <button className="btn btn-primary w-full text-lg">Add Lesson</button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;
