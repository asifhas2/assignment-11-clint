import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UsersManegment = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handelMakeAdmin = (user) => {
    // console.log(user);
    const roleInfo = {
      role: "admin",
    };

    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: "Admin Successful!",
          text: "You clicked the button!",
          icon: "success",
        });
      }
    });
  };
  const handelRemoveAdmin = (user) => {
    // console.log(user);
    const roleInfo = {
      role: "user",
    };

    axiosSecure.patch(`/users/${user._id}`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch()
        Swal.fire({
          title: "Admin remove successful Successful!",
          text: "You clicked the button!",
          icon: "success",
        });
      }
    });
  };

  console.log(users);
  return (
    <div>
      <h1 className="text-3xl font-bold">Manage users :{users.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created lessons</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                    {
                        user?.role === 'admin'? <button onClick={() => handelRemoveAdmin(user)} className="btn">
                    {user.role}
                  </button>: <button onClick={() => handelMakeAdmin(user)} className="btn">
                    {user.role}
                  </button>
                    }
                 
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManegment;
