import React, { useState } from "react";
import { FaBell, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart, Settings, Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardAPI, verifyUserAPI } from "../../services/adminServices";
import { getAllComplaintsAPI, updateComplaintStatusAPI} from "../../services/complaintServices";

const Subscribers = () => {
  const location = useLocation();

  const pageTitles = {
    "/admin/user-management": "User Management",
    "/admin/feedback-support": "Feedback & Support",
    "/admin/subscribers": "Subscribers",
    "/admin/reports": "Reports",
  };

  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: dashboardAPI,
  });

  const handleLogout = () => {
    dispatch(logoutAction());
    // Clear all storage
    sessionStorage.clear();
    localStorage.clear(); // Add this if you use localStorage
    navigate("/login");
    window.location.reload(); // Force a full page refresh to reset all state
  };


  // const queryClient = useQueryClient()

  // const { mutate: resolveComplaint } = useMutation({
  //   mutationFn: updateComplaintStatusAPI,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["view-subscribers"]); // Refresh subscribers list
  //   },
  // });
const subscribers=data?.users
  
  
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
                  to="/admin/user-management"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/user-management" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> User Management
                </Link>
              </li>

              <li>
                <Link
                  to="/admin/feedback-support"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/feedback-support"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Feedback & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/subscribers"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/subscribers" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Subscribers
                </Link>
              </li>
              

              <li>
                <Link 
                to="/admin/report" 
                className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                  location.pathname === "/admin/report" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}>                  
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
          <div className="flex items-center space-x-6">
            <button onClick={handleLogout} className="hover:text-gray-400">
              <FaPowerOff />
            </button>
          </div>
        </nav>

        {/* User Management Content */}
        <main className="flex-1 p-6 mt-10 ">
          <div className="w-full p-6 bg-gray-100 min-h-screen">
            {/* User Table */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <table className="w-220 border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Plan</th>
                    
                    
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(subscribers) &&
                  subscribers
                    .filter(subscriber => subscriber.subscribed)
                    .map((subscriber) => (
                      <tr
                        key={subscriber._id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-2">{subscriber.username}</td>
                        <td className="py-2">{subscriber.email}</td>
                        <td className="py-2">{subscriber.plan}</td>
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

export default Subscribers;