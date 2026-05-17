import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  FaEdit,
  FaTrash,
  FaEye,
  FaLock,
  FaGlobe,
  FaCrown,
  FaHeart,
  FaCalendarAlt,
  FaHandHoldingHeart,
  FaSave,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // update modal
  const [selectedLesson, setSelectedLesson] = useState(null);

  // fetch my lessons
  const { data: lessons = [],refetch,isLoading } = useQuery({
      queryKey: ["lesson", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
        return res.data;
      },
    });

  // delete lesson
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(
        `/lessons/${id}`
      );

      if (res.data.deletedCount > 0) {
        toast.success("Lesson deleted");

        refetch();
      }
    }
  };

  // update lesson
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const updatedLesson = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      privacy: form.privacy.value,
      access: form.access.value,
      image: form.image.value,
    };

    const res = await axiosSecure.patch(
      `/lessons/${selectedLesson._id}`,
      updatedLesson
    );

    if (res.data.modifiedCount > 0) {
      toast.success("Lesson updated");

      refetch();

      document.getElementById("update_modal").close();
    }
  };

  // loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      {/* heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          📚 My Lessons
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your created lessons easily
        </p>
      </div>

      {/* table */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Lesson</th>
                  <th>Visibility</th>
                  <th>Access</th>
                  <th>Stats</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/* body */}
              <tbody>
                {lessons.map((lesson, index) => (
                  <tr key={lesson._id}>
                    {/* serial */}
                    <th>{index + 1}</th>

                    {/* lesson */}
                    <td>
                      <div className="flex items-center gap-4">
                        <img
                          src={lesson.image}
                          alt=""
                          className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div>
                          <h2 className="font-bold">
                            {lesson.title}
                          </h2>

                          <p className="text-sm text-gray-500">
                            {lesson.category}
                          </p>

                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <FaCalendarAlt />

                            {new Date(
                              lesson.createdAt
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* visibility */}
                    <td>
                      {lesson.privacy === "public" ? (
                        <div className="badge badge-success gap-2">
                          <FaGlobe />
                          Public
                        </div>
                      ) : (
                        <div className="badge badge-warning gap-2">
                          <FaLock />
                          Private
                        </div>
                      )}
                    </td>

                    {/* access */}
                    <td>
                      {lesson.access === "premium" ? (
                        <div className="badge badge-secondary gap-2">
                          <FaCrown />
                          Premium
                        </div>
                      ) : (
                        <div className="badge badge-primary">
                          Free
                        </div>
                      )}
                    </td>

                    {/* stats */}
                    <td>
                      <div className="space-y-2">
                        <div className="badge badge-outline">
                          <FaHandHoldingHeart></FaHandHoldingHeart> {lesson.reactions || 0}
                        </div>

                        <div className="badge badge-outline">
                         <FaSave />

                          {lesson.favorites || 0}
                        </div>
                      </div>
                    </td>

                    {/* actions */}
                    <td>
                      <div className="flex gap-2">
                        {/* details */}
                        <Link
                          to={`/public-lessons/${lesson._id}`}
                          className="btn btn-sm btn-info"
                        >
                          <FaEye />
                        </Link>

                        {/* update */}
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedLesson(lesson);

                            document
                              .getElementById(
                                "update_modal"
                              )
                              .showModal();
                          }}
                          className="btn btn-sm btn-warning"
                        >
                          <FaEdit />
                        </motion.button>

                        {/* delete */}
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            handleDelete(lesson._id)
                          }
                          className="btn btn-sm btn-error"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* empty state */}
            {!lessons.length && (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold">
                  No Lessons Found
                </h2>

                <p className="text-gray-500 mt-2">
                  Start creating your first lesson
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* update modal */}
      <dialog
        id="update_modal"
        className="modal"
      >
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-2xl mb-6">
            Update Lesson
          </h3>

          <form
            onSubmit={handleUpdate}
            className="space-y-4"
          >
            {/* title */}
            <div>
              <label className="label">
                Lesson Title
              </label>

              <input
                type="text"
                name="title"
                defaultValue={selectedLesson?.title}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* category */}
            <div>
              <label className="label">
                Category
              </label>

              <input
                type="text"
                name="category"
                defaultValue={selectedLesson?.category}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* image */}
            <div>
              <label className="label">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                defaultValue={selectedLesson?.image}
                className="input input-bordered w-full"
              />
            </div>

            {/* privacy */}
            <div>
              <label className="label">
                Visibility
              </label>

              <select
                name="privacy"
                defaultValue={selectedLesson?.privacy}
                className="select select-bordered w-full"
              >
                <option value="public">
                  Public
                </option>

                <option value="private">
                  Private
                </option>
              </select>
            </div>

            {/* access */}
            <div>
              <label className="label">
                Access Level
              </label>

              <select
                name="access"
                defaultValue={selectedLesson?.access}
                className="select select-bordered w-full"
              >
                <option value="free">
                  Free
                </option>

                <option value="premium">
                  Premium
                </option>
              </select>
            </div>

            {/* description */}
            <div>
              <label className="label">
                Description
              </label>

              <textarea
                name="description"
                defaultValue={
                  selectedLesson?.description
                }
                className="textarea textarea-bordered w-full h-32"
              ></textarea>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("update_modal")
                    .close()
                }
                className="btn"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Update Lesson
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyLessons;