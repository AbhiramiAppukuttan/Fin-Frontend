import React, { useState } from "react";
import { FaUserPlus, FaSearch, FaFilter, FaEdit, FaCheckCircle, FaTrash, FaTimes, FaUserCheck } from "react-icons/fa";
import { FaBell, FaUserCircle, FaPowerOff } from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart, Settings, Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardAPI, verifyUserAPI } from "../../services/adminServices";

const UserManagement = () => {
  const [showActiveUsers, setShowActiveUsers] = useState(false); 
  const location = useLocation();


const queryClient = useQueryClient();

const verifyUserMutation = useMutation({
  mutationFn: verifyUserAPI,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['admin-dashboard'] });
  },
});

  const pageTitles = {
    "/user-management": "User Management",
  };

  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: dashboardAPI,
  });
console.log(data);

  const users = data?.users || [];
  const activeUsers = data?.activeUsers || [];

  // Determine which users to display
  const [searchTerm, setSearchTerm] = useState('');
  
  const displayedUsers = showActiveUsers ? activeUsers : users;

  const filteredUsers = displayedUsers.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  


  return (
    <div className="flex  bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/user-management"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/user-management" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> User Management
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback-support"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/feedback-support"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Feedback & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/subscribers"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/subscribers"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Subscribers
                </Link>
              </li>
              
              <li>
                <Link to="/report" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className=" py-4 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {pageTitles[location.pathname]}
          </h2>

          {/* Right-side Icons */}
          <div className="flex items-center space-x-6 ">
            <Link to="/" className="text-xl hover:text-blue-400 cursor-pointer pt-1">
              <FaPowerOff />
            </Link>
          </div>
        </nav>

        {/* User Management Content */}
        <main className="flex-1 p-6 mt-10 ">
          <div className="w-full p-6 bg-gray-100 min-h-screen">
            {/* Search & Filter Section */}
            <div className="flex justify-between bg-white p-4 shadow-md rounded-lg mb-4">
              <div className="flex gap-2">
              <input 
  type="text" 
  placeholder="Search users..." 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="px-4 py-2 border rounded-md w-64 focus:ring focus:ring-blue-300"
/>
                <button className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                  <FaSearch />
                </button>
              </div>
              <button 
                className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => setShowActiveUsers(!showActiveUsers)} // Toggle active users
              >
                <FaFilter /> {showActiveUsers ? "Show All Users" : "Show Active Users"}
              </button>
            </div>

            {/* User Table */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Subscribed</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
                    <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-2">{user.username}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{user.subscribed ? "Subscribed" : "Not Subscribed"}</td>
                      <td className="py-2">
  {user.verified ? (
    <span className="inline-flex items-center justify-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1 rounded-full shadow-sm w-[130px]">
      <FaCheckCircle className="text-green-600" />
      Verified
    </span>
  ) : (
    <button
      onClick={() => verifyUserMutation.mutate(user._id)}
      className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full hover:bg-blue-600 transition duration-200 w-[130px]"
    >
      <FaUserCheck />
      Verify User
    </button>
  )}
</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserManagement;