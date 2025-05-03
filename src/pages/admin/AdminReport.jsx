import React from "react";
import { FaBell, FaPowerOff, FaUserAlt, FaChartLine } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { viewReportAPI } from "../../services/adminServices";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart as ReBarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// ✅ Group Transactions by Month (Jan to Dec)
const groupTransactionStatsByMonth = (transactions = []) => {
  const monthlyCount = {};
  transactions.forEach((txn) => {
    const date = new Date(txn.date);
    const month = date.getMonth();
    monthlyCount[month] = (monthlyCount[month] || 0) + 1;
  });


  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return Array.from({ length: 12 }, (_, index) => ({
    month: monthNames[index],
    transactions: monthlyCount[index] || 0,
  }));
};

// ✅ User growth over time with month-year label for X-axis
const mapUserTimeline = (users = []) => {
  return users
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((user, index) => {
      const fullDate = new Date(user.createdAt);
      return {
        date: fullDate.toISOString().split("T")[0], // full date for tooltip
        label: fullDate.toLocaleString("default", { month: "short", year: "numeric" }), // e.g., Apr 2025
        count: index + 1,
      };
    });
};

const AdminReport = () => {
  const location = useLocation();
  const { data: report } = useQuery({
    queryKey: ["admin-report"],
    queryFn: viewReportAPI,
  });

  const navigate = useNavigate(); // Add this
  const dispatch = useDispatch(); // Add this
  
  const handleLogout = () => {
    dispatch(logoutAction());
    // Clear all storage
    sessionStorage.clear();
    localStorage.clear(); // Add this if you use localStorage
    navigate("/login");
    window.location.reload(); // Force a full page refresh to reset all state
  };
  
  const userTimeline = mapUserTimeline(report?.users || []);
  const transactionStats = groupTransactionStatsByMonth(report?.transactions || []);

  const maxTransactionValue = Math.max(...transactionStats.map(t => t.transactions), 0);
  let xAxisInterval = 0;
  if (maxTransactionValue <= 5) xAxisInterval = 0;
  else if (maxTransactionValue <= 10) xAxisInterval = 1;
  else if (maxTransactionValue <= 20) xAxisInterval = 2;
  else xAxisInterval = 3;

  const pageTitles = {
    "/admin/user-management": "User Management",
    "/admin/feedback-support": "Feedback & Support",
    "/admin/subscribers": "Subscribers",
    "/admin/report": "Reports",
  };

  return (
    <div className="flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg flex flex-col p-5 min-h-screen">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img src="/logo-img.png" alt="Logo" className="h-8 w-8" />
            <h1 className="text-xl font-bold text-gray-800">Finance Admin</h1>
          </div>
          <nav>
            <ul className="space-y-3">
              <li>
                <Link to="/admin" className={`flex items-center gap-3 p-3 rounded-lg transition ${location.pathname === "/admin" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
                  <Home size={20} /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/user-management" className={`flex items-center gap-3 p-3 rounded-lg transition ${location.pathname === "/admin/user-management" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
                  <Users size={20} /> User Management
                </Link>
              </li>
              <li>
                <Link to="/admin/feedback-support" className={`flex items-center gap-3 p-3 rounded-lg transition ${location.pathname === "/admin/feedback-support" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
                  <Users size={20} /> Feedback & Support
                </Link>
              </li>
              <li>
                <Link to="/admin/subscribers" className={`flex items-center gap-3 p-3 rounded-lg transition ${location.pathname === "/admin/subscribers" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
                  <Users size={20} /> Subscribers
                </Link>
              </li>
              <li>
                <Link to="/admin/report" className={`flex items-center gap-3 p-3 rounded-lg transition ${location.pathname === "/admin/report" ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"}`}>
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
        <nav className="py-4 px-6 bg-white shadow-md flex justify-between items-center fixed top-0 left-72 right-0 z-10">
          <h2 className="text-xl font-semibold text-gray-800">{pageTitles[location.pathname]}</h2>
          <div className="flex items-center space-x-6">
                    <button onClick={handleLogout} className="hover:text-gray-400">
                      <FaPowerOff />
                    </button>
                </div>
        </nav>

        {/* Report Content */}
        <main className="flex-1 p-6 mt-16 bg-gray-100 min-h-screen">
          {/* Summary Cards */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-gradient-to-br from-blue-100 to-blue-300 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <FaUserAlt size={30} className="text-blue-600 mb-2" />
              <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
              <p className="text-3xl font-bold text-blue-700">{report?.users?.length ?? 0}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-300 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <FaChartLine size={30} className="text-green-600 mb-2" />
              <h3 className="text-lg font-medium text-gray-700">Total Transactions</h3>
              <p className="text-3xl font-bold text-green-700">{report?.transactions?.length ?? 0}</p>
            </div>
          </motion.div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Users Over Time */}
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Users Over Time</h3>
              {userTimeline.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userTimeline}>
                    <CartesianGrid stroke="#e5e7eb" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-3 rounded shadow text-sm">
                              <p><strong>Date:</strong> {payload[0].payload.date}</p>
                              <p><strong>Users:</strong> {payload[0].payload.count}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-10">No user registration data available</p>
              )}
            </motion.div>

            {/* Monthly Transactions */}
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Monthly Transactions</h3>
              {transactionStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <ReBarChart data={transactionStats}>
                    <CartesianGrid stroke="#e5e7eb" />
                    <XAxis dataKey="month" interval={xAxisInterval} tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#10b981" barSize={40} />
                  </ReBarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-gray-500 text-center py-10">No transaction data available</p>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminReport;
