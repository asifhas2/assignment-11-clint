import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
  FaFlag,
  FaEye,
  FaShareAlt,
} from "react-icons/fa";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const LessonDetails = () => {
  const lesson = useLoaderData();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();

  const { data, refetch } = useQuery({
    queryKey: ["lesson", id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/${id}`);
      return res.data;
    },

    // auto refetch every 2 second
    refetchInterval: 2000,
  });

  const { data: creatorLessons = [] } = useQuery({
    queryKey: ["lesson", data?.email],

    enabled: !!data?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${data.email}`);

      return res.data;
    },
  });
  // comment

  // COMMENT QUERY
  const { data: comments = [], refetch: commentsRefetch } = useQuery({
    queryKey: ["comments", id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/${id}`);

      return res.data;
    },
  });

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(data?.reactions || 0);

  //   const [comments, setComments] = useState([
  //     {
  //       id: 1,
  //       name: "Rahim",
  //       comment: "Very inspiring lesson ❤️",
  //     },
  //     {
  //       id: 2,
  //       name: "Karim",
  //       comment: "This helped me a lot!",
  //     },
  //   ]);

  const { register, handleSubmit, reset } = useForm();

  const handleLike = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
      });

      navigate("/login");

      return;
    }

    try {
      const res = await axiosSecure.patch(`/lessons/like/${data._id}`);

      if (res.data.modifiedCount > 0) {
        refetch();

        Swal.fire({
          icon: "success",
          title: "Liked Successfully",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // favorite handler
  const handleFavorite = async () => {
    const favoriteInfo = {
      lessonId: data._id,

      userEmail: user?.email,

      title: data?.title,
      category: data?.category,
        tone:data?.tone,
      image: data?.image,

      createdAt: new Date(),
    };

    const res = await axiosSecure.patch(
      `/lessons/favorite/${data._id}`,
      favoriteInfo,
    );

    if (res.data.updateResult.modifiedCount > 0) {
      refetch();

      Swal.fire({
        icon: "success",
        title: "Added To Favorite",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  // report handler
  const handleReport = async () => {
    const { value: reason } = await Swal.fire({
      title: "Report Lesson",
      input: "select",
      inputOptions: {
        inappropriate: "Inappropriate Content",
        hate: "Hate Speech or Harassment",
        falseInfo: "Misleading or False Information",
        spam: "Spam or Promotional Content",
        sensitive: "Sensitive or Disturbing Content",
        other: "Other",
      },
      inputPlaceholder: "Select reason",
      showCancelButton: true,
    });

    if (reason) {
      // backend payload
      const reportData = {
        lessonId: data._id,
        reportedUserEmail: data?.email,
        reason,
        timestamp: new Date(),
      };

      const res = await axiosSecure.post("/report", reportData);

      Swal.fire({
        icon: "success",
        title: "Report Submitted",
      });
    }
  };

  // comment submit
  const onSubmit = async (formData) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Please Login First",
      });

      navigate("/login");

      return;
    }

    const commentInfo = {
      lessonId: id,

      userName: user?.displayName,

      userEmail: user?.email,

      userPhoto: user?.photoURL,

      comment: formData.comment,

      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/comments", commentInfo);

      if (res.data.insertedId) {
        commentsRefetch();

        reset();

        Swal.fire({
          icon: "success",
          title: "Comment Added",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* PREMIUM BANNER */}

      {/* HERO SECTION */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge badge-primary mb-4">{data?.category}</span>

          <h1 className="text-5xl font-bold leading-tight">{data?.title}</h1>

          <p className="mt-6 text-lg text-gray-500">{data?.description}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="badge badge-outline badge-lg">{data?.tone}</div>

            <div className="badge badge-outline badge-lg">⏱ 5 min read</div>

            <div className="badge badge-outline badge-lg">{data?.privacy}</div>
          </div>
        </div>

        <div>
          <img
            src={lesson?.image}
            alt=""
            className="w-full rounded-3xl shadow-2xl object-cover"
          />
        </div>
      </div>

      {/* METADATA */}
      <div className="grid md:grid-cols-4 gap-5 mt-10">
        <div className="bg-base-200 p-5 rounded-2xl">
          <h3 className="font-bold">Created</h3>
          <p>{data?.createdAt}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-2xl">
          <h3 className="font-bold">Updated</h3>
          <p>{data?.updatedAt}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-2xl">
          <h3 className="font-bold">Visibility</h3>
          <p>{data?.privacy}</p>
        </div>

        <div className="bg-base-200 p-5 rounded-2xl">
          <h3 className="font-bold">Reading Time</h3>
          <p>5 Minutes</p>
        </div>
      </div>

      {/* AUTHOR SECTION */}
      <div className="bg-base-200 mt-12 p-8 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-5">
          <img
            src={data?.creatorPhoto}
            alt=""
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">{data?.creatorName}</h2>

            <p className="text-[20px] font-semibold ">
              Total Lessons : {creatorLessons.length}
            </p>
          </div>
        </div>

        <button className="btn btn-primary rounded-full">
          View All Lessons
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-5 mt-10">
        <div className="bg-base-200 rounded-2xl p-8 text-center">
          <FaHeart className="text-4xl mx-auto mb-3 text-red-500" />
          <h2 className="text-3xl font-bold">{data?.reactions}</h2>
          <p>Likes</p>
        </div>

        <div className="bg-base-200 rounded-2xl p-8 text-center">
          <FaBookmark className="text-4xl mx-auto mb-3 text-warning" />
          <h2 className="text-3xl font-bold">{data?.saves}</h2>
          <p>Favorites</p>
        </div>

        <div className="bg-base-200 rounded-2xl p-8 text-center">
          <FaEye className="text-4xl mx-auto mb-3 text-primary" />
          <h2 className="text-3xl font-bold">{/* {views} */}</h2>
          <p>Views</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4 mt-10">
        <button
          onClick={handleFavorite}
          className="btn btn-warning rounded-full"
        >
          {saved ? (
            <>
              <FaBookmark />
              Saved
            </>
          ) : (
            <>
              <FaRegBookmark />
              Save
            </>
          )}
        </button>

        <button
          onClick={handleLike}
          className="btn btn-error rounded-full text-white"
        >
          {liked ? (
            <>
              <FaHeart />
              Liked
            </>
          ) : (
            <>
              <FaRegHeart />
              Like
            </>
          )}
        </button>

        <button onClick={handleReport} className="btn btn-outline rounded-full">
          <FaFlag />
          Report
        </button>

        {/* SHARE */}
        <div className="flex items-center gap-3">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>

          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
        </div>
      </div>

      {/* COMMENT SECTION */}
      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-8">Comments</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-200 p-6 rounded-3xl"
        >
          <textarea
            {...register("comment", {
              required: true,
            })}
            className="textarea textarea-bordered w-full h-32"
            placeholder="Write your comment..."
          ></textarea>

          <button className="btn btn-primary mt-4 rounded-full">
            Post Comment
          </button>
        </form>
      </div>
      <div className="space-y-5 mt-8">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-base-200 p-5 rounded-2xl">
            <div className="flex items-center gap-4">
              <img
                src={comment?.userPhoto}
                alt=""
                className="w-14 h-14 rounded-full"
              />

              <div>
                <h3 className="font-bold text-lg">{comment?.userName}</h3>

                <p className="text-sm text-gray-500">
                  {new Date(comment?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-500">{comment?.comment}</p>
          </div>
        ))}
      </div>

      {/* SIMILAR LESSONS */}
      <div className="mt-20">
        <h2 className="text-4xl font-bold mb-10">Similar Lessons</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="card bg-base-200 shadow-xl hover:-translate-y-2 duration-300"
            >
              <figure>
                <img
                  src="https://i.ibb.co/F4s3wJm/pexels.jpg"
                  alt=""
                  className="h-52 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                <div className="badge badge-secondary">Mindset</div>

                <h2 className="card-title">Never Give Up On Yourself</h2>

                <p>Small daily progress creates big future success.</p>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm rounded-full">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonDetails;
