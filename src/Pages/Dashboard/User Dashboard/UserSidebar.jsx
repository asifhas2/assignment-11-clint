import { Link } from "react-router";

const UserSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <ul className="space-y-4">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default UserSidebar;