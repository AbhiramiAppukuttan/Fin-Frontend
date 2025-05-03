// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import DashboardNavbar from "./components/DashboardNavbar";

// import Home from "./pages/user/Home";
// import About from "./pages/user/About";
// import Feature from "./pages/user/Feature";
// import Loginpage from "./pages/user/Loginpage";
// import SignupPage from "./pages/user/Signup";

// import Dashboard from "./pages/user/Dashboard";
// import Transaction from "./pages/user/Transaction";
// import Budget from "./pages/user/Budget";
// import Saving from "./pages/user/Saving";
// import Report from "./pages/user/Report";
// import Profile from "./pages/user/Profile";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import UserManagement from "./pages/admin/UserManagement";
// import FeedbackSupport from "./pages/admin/FeedbackSupport";
// import NotificationPage from "./pages/user/NotificationPage";
// import PageNotFound from "./pages/user/PageNotFound";
// import RecommendationsTips from "./pages/user/RecommendationsTips";
// import FeedbackForm from "./pages/user/FeedbackForm";
// import SubscriptionPage from "./pages/user/SubscriptionPage";
// import PaymentPage from "./pages/user/Paymentpage";
// import RecommendationSavings from "./pages/user/RecommendationSavings";
// import Subscribers from "./pages/admin/Subscribers";
// import AdminReport from "./pages/admin/AdminReport";
// import ForgotPassword from "./pages/user/ForgotPassword";
// import ResetPassword from "./pages/user/ResetPassword";
// import { useSelector } from "react-redux";

// function App() {
//     const userRole = useSelector((state)=>state.auth?.user?.role)
//   return (
//     <Router>
      
//         {userRole==="individual"?(
//           <Routes>
//         <Route path="/user">
//         {/* User Dashboard Pages */}
//               <Route path="dashboard" element={<><DashboardNavbar /><Dashboard /><Footer /></>} />
//               <Route path="transactions" element={<><DashboardNavbar /><Transaction /><Footer /></>} />
//               <Route path="budget" element={<><DashboardNavbar /><Budget /><Footer /></>} />
//               <Route path="savings" element={<><DashboardNavbar /><Saving /><Footer /></>} />
//               <Route path="reports" element={<><DashboardNavbar /><Report /><Footer /></>} />
//               <Route path="profile" element={<><DashboardNavbar /><Profile /><Footer /></>} />
//               <Route path="notifications" element={<><DashboardNavbar /><NotificationPage/><Footer /></>} /> {/* New Route */}
//               <Route path="recommendationstips" element={<><DashboardNavbar /><RecommendationsTips/><Footer /></>} />
//               <Route path="recommendationsavings" element={<><DashboardNavbar /><RecommendationSavings/><Footer /></>} />
//               <Route path="feedbackform" element={<><DashboardNavbar /><FeedbackForm/><Footer /></>} />
//               <Route path="subscription" element={<><DashboardNavbar /><SubscriptionPage/><Footer /></>} />
//               <Route path="payment" element={<><DashboardNavbar /><PaymentPage/><Footer /></>} />
//               <Route path="*" element={<><DashboardNavbar /><PageNotFound/><Footer /></>} />

//         </Route>
//         </Routes>
//         ): userRole === "admin" ? (
//       <Routes>
//         {/* Admin Dashboard */}
//         <Route path="/admin" element={<><AdminDashboard /><Footer /></>} />
//         <Route path="/admin/user-management" element={<><UserManagement /><Footer /></>} />
//         <Route path="/admin/feedback-support" element={<><FeedbackSupport /><Footer /></>} />
//         <Route path="/admin/subscribers" element={<><Subscribers /><Footer /></>} />
//         <Route path="/admin/report" element={<><AdminReport /><Footer /></>} />
//         <Route path="*" element={<><DashboardNavbar /><PageNotFound/><Footer /></>} />
//       </Routes>

//       ):
//       <Routes>
      
//         {/* Public Pages */}
//         <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
//         <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
//         <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
//         <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
//         <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />
//         <Route path="/forgot-password" element={<><Navbar /><ForgotPassword/><Footer /></>} />
//         <Route path="/reset-password" element={<><Navbar /><ResetPassword/><Footer /></>} />
//         <Route path="*" element={<><Navbar /><Loginpage /><Footer /></>} />

//       </Routes>
//       }
//     </Router>
//   );
// }

// export default App;


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardNavbar from "./components/DashboardNavbar";

// User Pages
import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Feature from "./pages/user/Feature";
import Loginpage from "./pages/user/Loginpage";
import SignupPage from "./pages/user/Signup";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";

import Dashboard from "./pages/user/Dashboard";
import Transaction from "./pages/user/Transaction";
import Budget from "./pages/user/Budget";
import Saving from "./pages/user/Saving";
import Report from "./pages/user/Report";
import Profile from "./pages/user/Profile";
import NotificationPage from "./pages/user/NotificationPage";
import RecommendationsTips from "./pages/user/RecommendationsTips";
import RecommendationSavings from "./pages/user/RecommendationSavings";
import FeedbackForm from "./pages/user/FeedbackForm";
import SubscriptionPage from "./pages/user/SubscriptionPage";
import PaymentPage from "./pages/user/Paymentpage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import FeedbackSupport from "./pages/admin/FeedbackSupport";
import Subscribers from "./pages/admin/Subscribers";
import AdminReport from "./pages/admin/AdminReport";

// Common
import PageNotFound from "./pages/user/PageNotFound";

// ✅ Inline Protected Route Component
const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.auth?.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />
        <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
        <Route path="/reset-password" element={<><Navbar /><ResetPassword /><Footer /></>} />

        {/* Protected User Routes */}
        <Route path="/user/dashboard" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Dashboard /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/transactions" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Transaction /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/budget" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Budget /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/savings" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Saving /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/reports" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Report /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/profile" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><Profile /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/notifications" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><NotificationPage /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/recommendationstips" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><RecommendationsTips /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/recommendationsavings" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><RecommendationSavings /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/feedbackform" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><FeedbackForm /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/subscription" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><SubscriptionPage /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/user/payment" element={
          <ProtectedRoute role="individual">
            <><DashboardNavbar /><PaymentPage /><Footer /></>
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <><AdminDashboard /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/admin/user-management" element={
          <ProtectedRoute role="admin">
            <><UserManagement /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/admin/feedback-support" element={
          <ProtectedRoute role="admin">
            <><FeedbackSupport /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/admin/subscribers" element={
          <ProtectedRoute role="admin">
            <><Subscribers /><Footer /></>
          </ProtectedRoute>
        } />
        <Route path="/admin/report" element={
          <ProtectedRoute role="admin">
            <><AdminReport /><Footer /></>
          </ProtectedRoute>
        } />

        {/* 404 Page */}
        <Route path="*" element={<><Navbar /><PageNotFound /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
