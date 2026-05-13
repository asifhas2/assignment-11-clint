import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { FaTrash, FaEye } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const initialLessons = [
  {
    _id: "1",
    title: "Learning from mistakes",
    category: "Mindset",
    tone: "Realization",
    createdAt: "2026-05-10",
  },
  {
    _id: "2",
    title: "Never give up",
    category: "Career",
    tone: "Motivational",
    createdAt: "2026-05-11",
  },
  {
    _id: "3",
    title: "Relationship balance",
    category: "Relationships",
    tone: "Sad",
    createdAt: "2026-05-12",
  },
];

const MyFavorite = () => {
  const [favorites, setFavorites] = useState(initialLessons);

  const [category, setCategory] = useState("All");
  const [tone, setTone] = useState("All");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user);

  const { data } = useQuery({
    queryKey: ["favorite", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/lessons/favorite?email=${user.email}`,
      );
      return res.data;
    },
  });
  console.log(data);

  // Remove from favorites
  const handleRemove = (id) => {
    const updated = favorites.filter((item) => item._id !== id);
    setFavorites(updated);
  };

  // Filter logic
  const filteredLessons = data?.filter((lesson) => {
    const categoryMatch = category === "All" || lesson.category === category;
    const toneMatch = tone === "All" || lesson.tone === tone;
    return categoryMatch && toneMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Favorite Lessons</h2>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select
          className="select select-bordered"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option >Personal Growth</option>
          <option >Career</option>
          <option >Relationships</option>
          <option >Mindset</option>
          <option >Mistakes Learned</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Tone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredLessons?.length > 0 ? (
              filteredLessons.map((lesson) => (
                <tr key={lesson._id}>
                  <td className="font-medium">{lesson.title}</td>
                  <td>{lesson.category}</td>
                  <td>{lesson.tone}</td>
                  <td>{lesson.createdAt}</td>

                  <td className="flex gap-3">
                    {/* Details */}
                    <Link
                      to={`/lesson/${lesson._id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEye />
                    </Link>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(lesson._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No favorite lessons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFavorite;
