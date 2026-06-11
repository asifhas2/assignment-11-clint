import React, { useState } from "react";
import Swal from "sweetalert2";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "LifeStoryHub",
    emailNotification: true,
    lessonApprovalNotification: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Settings Updated",
      text: "Your settings have been saved successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">
        Admin Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* Site Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Site Settings
            </h3>

            <div>
              <label className="label">
                <span className="label-text">
                  Website Name
                </span>
              </label>

              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Notification Settings
            </h3>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Email Notifications
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  name="emailNotification"
                  checked={settings.emailNotification}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">
                  Lesson Approval Notifications
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  name="lessonApprovalNotification"
                  checked={settings.lessonApprovalNotification}
                  onChange={handleChange}
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
                  Enable Dark Mode
                </span>

                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              Security
            </h3>

            <button
              type="button"
              className="btn btn-warning"
            >
              Change Password
            </button>
          </div>
        </div>

        {/* System Info */}
        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-4">
              System Information
            </h3>

            <p>
              <strong>Platform:</strong> LifeStoryHub
            </p>

            <p>
              <strong>Version:</strong> 1.0.0
            </p>

            <p>
              <strong>Role:</strong> Administrator
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;