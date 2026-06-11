import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
// import useAuth from "../Hooks/useAuth";

const UserSettings = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
    emailNotification: true,
    publicProfile: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // API call here

    Swal.fire({
      icon: "success",
      title: "Settings Updated",
      text: "Your changes have been saved successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">
        User Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Profile Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Profile Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">
                    Photo URL
                  </span>
                </label>

                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Notifications
            </h3>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Email Notifications
                </span>

                <input
                  type="checkbox"
                  name="emailNotification"
                  checked={formData.emailNotification}
                  onChange={handleChange}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Privacy Settings
            </h3>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Public Profile
                </span>

                <input
                  type="checkbox"
                  name="publicProfile"
                  checked={formData.publicProfile}
                  onChange={handleChange}
                  className="toggle toggle-success"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Appearance
            </h3>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Dark Mode
                </span>

                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="toggle toggle-info"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Account Information
            </h3>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Account Type:</strong> User
            </p>

            <p>
              <strong>Status:</strong> Active
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;