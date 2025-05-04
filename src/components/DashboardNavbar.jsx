
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle, FaBell, FaPowerOff } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import NotificationPage from "../pages/user/NotificationPage";
import { viewNotificationAPI } from "../services/notificationServices";
import { logoutAction } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const navigate = useNavigate()
  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: viewNotificationAPI,
  });
const dispatch=useDispatch()


const handleLogout = () => {
  dispatch(logoutAction());
  // Clear all storage
  sessionStorage.clear();
  localStorage.clear(); // Add this if you use localStorage
  navigate("/login");
  // window.location.reload(); // Force a full page refresh to reset all state
};

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <>
      <nav className="bg-black text-white fixed top-0 left-0 w-full h-18 z-50 px-6 md:px-16 lg:px-24 shadow-md">
        <div className="container mx-auto py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-1">
            <img src="/logo-img.png" alt="FinTrack Logo" className="w-10 h-7 object-contain" />
            <div className="text-2xl font-bold">FinTrack</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/user/dashboard" className="hover:text-gray-400">Home</Link>
            <Link to="/user/transactions" className="hover:text-gray-400">Transactions</Link>
            <Link to="/user/budget" className="hover:text-gray-400">Budget</Link>
            <Link to="/user/savings" className="hover:text-gray-400">Savings</Link>
            <Link to="/user/reports" className="hover:text-gray-400">Reports</Link>

            {/* Notification Icon */}
            <div className="relative cursor-pointer" onClick={() => setIsNotifOpen(true)}>
              <FaBell className="text-2xl hover:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>

            {/* Profile Icon */}
            <Link to="/user/profile">
              <FaUserCircle className="text-2xl hover:text-gray-400 cursor-pointer" />
            </Link>
            <Link to="/login" className="text-xl hover:text-blue-400 cursor-pointer pt-1">
              <FaPowerOff />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-black text-white flex flex-col items-center space-y-4 py-4">
            <Link to="/user/dashboard" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/user/profile" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Profile</Link>
            <Link to="/user/settings" className="hover:text-gray-400" onClick={() => setIsOpen(false)}>Settings</Link>
            <button onClick={handleLogout} className="hover:text-gray-400">
      <FaPowerOff />
    </button>  </div>
        )}
      </nav>

      {/* Notification Sidebar */}
      <NotificationPage isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};

export default DashboardNavbar;
