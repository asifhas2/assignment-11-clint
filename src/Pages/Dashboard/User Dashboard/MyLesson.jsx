import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaEdit,
  FaPenFancy,
  FaRegHeart,
  FaRegTrashAlt,
  FaSave,
} from "react-icons/fa";
import { label } from "framer-motion/client";

const MyLesson = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const { data: lessons = [] } = useQuery({
    queryKey: ["lesson", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(lessons);

  return (
    <div className="overflow-x-auto rounded-box  border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>visibility</th>
            <th>level </th>
            <th>Details</th>
            <th>Action</th>
            <th>Stats</th>
            <th>Create Time</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {lessons.map((lesson, index) => (
            <tr>
              <th>{index + 1}</th>
              <td>{lesson.title}</td>
              <td>{lesson.privacy}</td>
              <td>{lesson.access}</td>
              <td>
                <button className="btn btn-primary">Details</button>
              </td>
              <td>
                <button className="btn mr-3 mb-2">
                  <FaEdit />
                </button>
                <button className="btn ">
                  <FaRegTrashAlt />
                </button>
              </td>

              <td>
                <button className="btn mr-3 mb-2">
                  {lesson.reactions} <FaRegHeart />
                </button>
                <button className="btn mr-3">
                  {lesson.saves} <FaSave />
                </button>
              </td>
              <td>{lesson.createdAt}</td>
            </tr>
          ))}

          {/* row 2 */}
        </tbody>
      </table>
    </div>
  );
};

export default MyLesson;
