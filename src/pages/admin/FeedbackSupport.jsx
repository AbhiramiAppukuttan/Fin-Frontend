import React, { useState } from "react";
import { FaBell, FaUserCircle, FaPowerOff } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart, Settings, Edit } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dashboardAPI, verifyUserAPI } from "../../services/adminServices";
import { getAllComplaintsAPI, updateComplaintStatusAPI} from "../../services/complaintServices";

const FeedbackSupport = () => {
  const location = useLocation();

  const { data: complaints, error } = useQuery({
    queryKey: ['view-complaints'],
    queryFn: getAllComplaintsAPI,
  });

  const pageTitles = {
    "/admin/user-management": "User Management",
    "/admin/feedback-support": "Feedback & Support",
  };

  const { data } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: dashboardAPI,
  });

  const queryClient = useQueryClient()

  const { mutate: resolveComplaint } = useMutation({
    mutationFn: updateComplaintStatusAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["view-complaints"]); // Refresh complaints list
    },
  });
  
  
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
                    location.pathname === "/admin/subscibers" ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Subscribers
                </Link>
              </li>
              

              <li>
                <Link to="/admin/report" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              <li>
                <Link to="/admin" className="flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <Settings size={20} /> Settings
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
            {/* Logout Button */}
              <Link to="/" className="text-xl hover:text-blue-400 cursor-pointer pt-1">
                <FaPowerOff />
              </Link>
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
                  <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-2">Issue</th>
                    <th className="p-3 text-left">Status</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(complaints) &&
                    complaints.map((complaint) => (
                      <tr
                        key={complaint._id}
                        className="border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="py-2">{new Date(complaint.date).toLocaleDateString()}</td>
                        <td className="py-2">{complaint.user.username}</td>
                        <td className="py-2">{complaint.type}</td>
                        <td className="py-2 text-left break-all whitespace-normal max-w-xs">
                          {complaint.description}
                        </td>
                        <td className="py-2">
                          {complaint.status === "Resolved" ? (
                            <span className="text-green-500 font-bold">Resolved</span>
                          ) : (
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                              onClick={() => resolveComplaint(complaint._id)}
                            >
                              Resolve
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

export default FeedbackSupport;