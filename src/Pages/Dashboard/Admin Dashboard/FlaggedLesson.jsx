import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaShieldAlt, FaFlag } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const FlaggedLesson = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedLesson, setSelectedLesson] = useState(null);
  const [ignore,setIgnore]=useState(false);

  // fetch reported lessons
  const {
    data: lessons = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/report");
      return res.data;
    },
  });
  console.log(lessons);
  // delete lesson
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Lesson?",
      text: "This lesson will be permanently removed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/report/${id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Lesson removed successfully",
            icon: "success",
          });

          refetch();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // ignore reports
  const handleIgnore = async (id) => {
    try {
      const res = await axiosSecure.patch(`/report/ignore/${id}`);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Ignored!",
          text: "Reports cleared successfully",
          icon: "success",
        });

        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <FaShieldAlt className="text-error" />
          Reported Lessons
        </h2>

        <p className="text-gray-500 mt-2">
          Review community flagged lessons and maintain platform safety.
        </p>
      </motion.div>

      {/* table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto bg-base-100 rounded-2xl shadow-xl"
      >
        <table className="table">
          <thead className="bg-base-300">
            <tr>
              <th>#</th>
              <th>Lesson</th>
              <th>Reports</th>
              <th>Status</th>
              <th>View Reasons</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <motion.tr
                key={lesson._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="hover"
              >
                <th>{index + 1}</th>

                {/* lesson */}
                <td>
                  <div>
                    <h3 className="font-bold">{lesson.title}</h3>

                    <p className="text-xs text-gray-500">
                      {lesson.creatorName}
                    </p>
                  </div>
                </td>

                {/* report count */}
                <td>
                  <div className="badge badge-error gap-2">
                    <FaFlag />
                    {lesson.reportCount}
                  </div>
                </td>

                {/* status */}
                <td>
                  <span className="badge badge-warning">Reported</span>
                </td>

                {/* modal btn */}
                <td>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedLesson(lesson._id)}
                    className="btn btn-sm btn-info"
                  >
                    <FaEye />
                  </motion.button>
                </td>

                {/* actions */}
                <td>
                  <div className="flex gap-2">
                    {/* delete */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(lesson._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </motion.button>

                    {/* ignore */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleIgnore(lesson._id)}
                      className="btn btn-sm btn-success"
                    >
                  ignore
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {lessons.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No reported lessons found.</p>
          </div>
        )}
      </motion.div>

      {/* modal */}
      {selectedLesson && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-2xl mb-4">Report Reasons</h3>

            <div className="space-y-4">
              {selectedLesson.lessons?.map((report, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-xl p-4 bg-base-200"
                >
                  <h4 className="font-bold">Reporter:</h4>

                  <p className="text-sm text-gray-500">{report.reporterName}</p>

                  <p className="text-sm text-gray-500 mb-2">
                    {report.reportedUserEmail}
                  </p>

                  <h4 className="font-bold">Reason:</h4>

                  <p>{report.reason}</p>
                </motion.div>
              ))}
            </div>

            <div className="modal-action">
              <button onClick={() => setSelectedLesson(null)} className="btn">
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default FlaggedLesson;
