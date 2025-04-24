// import React from "react";
// import { LogOut, Users, BarChart, Settings, Home, Wallet } from "lucide-react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import { FaBell, FaUserCircle, FaPowerOff } from "react-icons/fa";

// import UserManagement from "./UserManagement";
// import { useQuery } from "@tanstack/react-query";
// import { dashboardAPI } from "../../services/adminServices";

// const AdminDashboard = () => {
//   const { data } = useQuery({
//     queryKey: ['admin-dashboard'],
//     queryFn: dashboardAPI,
//   });
//   const users = data?.activeUsers || [];
//   const userCount = users.length;

//   const transactions = data?.transactions || []; 
//   const totalIncome = transactions
//     .filter(transaction => 
//       transaction.type === 'income' 
//     )
//     .reduce((acc, transaction) => acc + transaction.amount, 0);
  
//   const transactionCount = transactions.length;
//   const location = useLocation();

//   // Page titles mapping
//   const pageTitles = {
//     "/admin": "Dashboard",
//     "/admin/user-management": "User Management",
//     "/admin/reports": "Reports",
//     "/admin/settings": "Settings",
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
//         <div>
//           {/* Logo */}
//           <div className="flex items-center gap-3 mb-6">
//             <img src="/logo-img.png" alt="Logo" className="h-6 w-6" />
//             <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
//           </div>

//           {/* Navigation */}
//           <nav>
//             <ul className="space-y-3">
//               <li>
//                 <Link
//                   to="/admin"
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === "/admin"
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <Home size={20} /> Dashboard
//                 </Link>
//               </li>
//               <li>
//               <Link
//                   to="/admin/user-management"
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === "/admin/user-management"
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <Users size={20} /> User Management
//               </Link>

//               </li>

//               <li>
//               <Link
//                   to="/admin/feedback-support"
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === "/admin/feedback-support"
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <Users size={20} /> Feedback & Support
//               </Link>

//               </li>
              
//               <li>
//               <Link
//                   to="/admin/feedback-support"
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === "/admin/subscribers"
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <Users size={20} /> Subscribers
//               </Link>

//               </li>
              

//               <li>
//                 <Link
//                   to="/admin/report"
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === ""
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <BarChart size={20} /> Reports
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to=""
//                   className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
//                     location.pathname === ""
//                       ? "bg-blue-500 text-white"
//                       : "hover:bg-gray-100"
//                   }`}
//                 >
//                   <Settings size={20} /> Settings
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Navbar */}
//         <nav className="py-4 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
//         {/* Page Title */}
//         <h2 className="text-xl font-semibold text-gray-800">
//           {pageTitles[location.pathname]}
//         </h2>

//       {/* Right-side Icons */}
//         <div className="flex items-center space-x-6">
//           {/* Notifications Icon */}
          

          
//           <Link to="/" className="text-xl hover:text-blue-400 cursor-pointer pt-1">
//             <FaPowerOff />
//           </Link>
//         </div>
// </nav>


//         {/* Page Content */}
//         <main className="flex-1 p-6 mt-16">
//           {/* Dashboard Overview */}
//           {location.pathname === "/admin" && (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
//                 <Wallet size={30} className="text-blue-500" />
//                 <div>
//                   <h3 className="text-lg font-semibold">Total Revenue</h3>
//                   <p className="text-gray-500">${totalIncome}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
//                 <Users size={30} className="text-green-500" />
//                 <div>
//                   <h3 className="text-lg font-semibold">Active Users</h3>
//                   <p className="text-gray-500">{userCount}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
//                 <BarChart size={30} className="text-orange-500" />
//                 <div>
//                   <h3 className="text-lg font-semibold">Total Transactions</h3>
//                   <p className="text-gray-500">{transactionCount}</p>
//                 </div>
//               </div>

//               <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
//                 <Settings size={30} className="text-purple-500" />
//                 <div>
//                   <h3 className="text-lg font-semibold">System Uptime</h3>
//                   <p className="text-gray-500">99.9%</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Dynamic Page Routes */}
//           <Routes>
//             <Route path="/user-management" element={<UserManagement />} />
//             <Route
//               path="/reports"
//               element={
//                 <div className="bg-white p-6 shadow-md rounded-lg">
//                   Reports Content
//                 </div>
//               }
//             />
//             <Route
//               path="/settings"
//               element={
//                 <div className="bg-white p-6 shadow-md rounded-lg">
//                   Settings Content
//                 </div>
//               }
//             />
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import {
  LogOut,
  Users,
  BarChart,
  Settings,
  Home,
  Wallet,
} from "lucide-react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import UserManagement from "./UserManagement";
import { useQuery } from "@tanstack/react-query";
import { dashboardAPI } from "../../services/adminServices";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: dashboardAPI,
  });

  const users = Array.isArray(data?.activeUsers) ? data.activeUsers : [];
  const userCount = users.length;

  const transactions = data?.transactions || [];
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const transactionCount = transactions.length;

  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/user-management": "User Management",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const pieData = [
    { name: "Active Users", value: userCount || 0 },
    { name: "Total Transactions", value: transactionCount || 0 },
  ];
  

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-6 w-6" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/user-management"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/user-management"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
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
                    location.pathname === "/admin/subscribers"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={20} /> Subscribers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/reports"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <BarChart size={20} /> Reports
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/settings"
                  className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${
                    location.pathname === "/admin/settings"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
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
        <nav className="py-4 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {pageTitles[location.pathname]}
          </h2>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl hover:text-blue-400 cursor-pointer pt-1">
              <FaPowerOff />
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1 p-6 mt-16">
          {location.pathname === "/admin" && (
            <>
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                  <Wallet size={30} className="text-blue-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-gray-500">${totalIncome}</p>
                  </div>
                </div>

                <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                  <Users size={30} className="text-green-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Active Users</h3>
                    <p className="text-gray-500">{userCount}</p>
                  </div>
                </div>

                <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                  <BarChart size={30} className="text-orange-500" />
                  <div>
                    <h3 className="text-lg font-semibold">Total Transactions</h3>
                    <p className="text-gray-500">{transactionCount}</p>
                  </div>
                </div>

                <div className="bg-white p-5 shadow-md rounded-lg flex items-center gap-4">
                  <Settings size={30} className="text-purple-500" />
                  <div>
                    <h3 className="text-lg font-semibold">System Uptime</h3>
                    <p className="text-gray-500">99.9%</p>
                  </div>
                </div>
              </div>

              {/* Pie Chart */}
              {/* Pie Chart */}
<div className="bg-white p-6 shadow-md rounded-lg w-full max-w-4xl mx-auto">
  <h3 className="text-xl font-semibold text-center mb-4">User & Transaction Overview</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

            </>
          )}

          {/* Dynamic Pages */}
          <Routes>
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/reports"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  Reports Content
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="bg-white p-6 shadow-md rounded-lg">
                  Settings Content
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
