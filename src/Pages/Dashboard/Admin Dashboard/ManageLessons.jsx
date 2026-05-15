import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaTrash,
  FaCheckCircle,
  FaStar,
  FaFlag,
  FaBookOpen,
  FaLock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [flagFilter, setFlagFilter] = useState("all");

  // fetch all lessons
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["manage-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/lessons");
      return res.data;
    },
  });
  console.log(lessons);

  const { data: reports = [] } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/report");
      return res.data;
    },
  });

  console.log(reports);
  // delete lesson
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete It!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/lessons/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Lesson has been removed.",
            icon: "success",
          });

          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // make featured
  const handleFeatured = async (id) => {
    try {
      const res = await axiosSecure.patch(`/lessons/featured/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Lesson marked as featured.",
          icon: "success",
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // reviewed
  const handleReviewed = async (id) => {
    try {
      const res = await axiosSecure.patch(`/lessons/reviewed/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Reviewed!",
          text: "Lesson marked as reviewed.",
          icon: "success",
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // filtering
  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      const categoryMatch =
        categoryFilter === "all" || lesson.category === categoryFilter;

      const visibilityMatch =
        visibilityFilter === "all" || lesson.privacy === visibilityFilter;

    

      return categoryMatch && visibilityMatch ;
    });
  }, [lessons, categoryFilter, visibilityFilter]);

  // stats
  const publicLessons = lessons.filter(
    (lesson) => lesson.privacy === "public",
  ).length;

  const privateLessons = lessons.filter(
    (lesson) => lesson.privacy === "private",
  ).length;



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen">
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Manage Lessons</h2>
        <p className="text-gray-500 mt-2">
          Moderate all platform lessons and keep the community safe.
        </p>
      </motion.div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* public */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-gradient-to-r from-primary to-secondary text-black shadow-xl"
        >
          <div className="card-body">
            <FaBookOpen className="text-4xl" />
            <h2 className="text-3xl font-bold">{publicLessons}</h2>
            <p>Public Lessons</p>
          </div>
        </motion.div>

        {/* private */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-xl"
        >
          <div className="card-body">
            <FaLock className="text-4xl" />
            <h2 className="text-3xl font-bold">{privateLessons}</h2>
            <p>Private Lessons</p>
          </div>
        </motion.div>

        {/* flagged */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="card bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-xl"
        >
          <div className="card-body">
            <FaFlag className="text-4xl" />
            <h2 className="text-3xl font-bold">{reports.length}</h2>
            <p>Flagged Content</p>
          </div>
        </motion.div>
      </div>

      {/* filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-base-100 rounded-2xl p-5 shadow-lg mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* category */}
          <select
            className="select select-bordered w-full"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Career">Career</option>
            <option value="Mindset">Mindset</option>
            <option value="Personal Growth">Personal Growth</option>
            <option value="Relationships">Relationships</option>
          </select>

          {/* visibility */}
          <select
            className="select select-bordered w-full"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          {/* flagged */}
          <select
            className="select select-bordered w-full"
            value={flagFilter}
            onChange={(e) => setFlagFilter(e.target.value)}
          >
            <option value="all">All Content</option>
            <option value="flagged">Flagged Only</option>
          </select>
        </div>
      </motion.div>

      {/* table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl"
      >
        <table className="table">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Category</th>
              <th>Visibility</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons.map((lesson, index) => (
              <motion.tr
                key={lesson._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover"
              >
                <th>{index + 1}</th>

                <td>
                  <div>
                    <h3 className="font-bold">{lesson.title}</h3>
                    <p className="text-xs text-gray-500">
                      {lesson.creatorName}
                    </p>
                  </div>
                </td>

                <td>{lesson.category}</td>

                <td>
                  <span
                    className={`badge ${
                      lesson.access === "public"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {lesson.access}
                  </span>
                </td>

                <td>
                  <div className="flex flex-wrap gap-2">
                    {lesson.featured && (
                      <span className="badge badge-primary">Featured</span>
                    )}

                    {lesson.reviewed && (
                      <span className="badge badge-success">Reviewed</span>
                    )}

                    {lesson.flagged && (
                      <span className="badge badge-error">Flagged</span>
                    )}
                  </div>
                </td>

                {/* actions */}
                <td>
                  <div className="flex gap-2">
                    {/* featured */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleFeatured(lesson._id)}
                      className="btn btn-sm btn-primary"
                    >
                      <FaStar />
                    </motion.button>

                    {/* reviewed */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReviewed(lesson._id)}
                      className="btn btn-sm btn-success"
                    >
                      <FaCheckCircle />
                    </motion.button>

                    {/* delete */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredLessons.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No lessons found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageLessons;
