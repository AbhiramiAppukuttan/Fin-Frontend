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

// function App() {
//   const userRole = useSelector((state)=>state.auth.role)
//   return (
//     <Router>
//       <Routes>
        
//         {/* Public Pages */}
//         <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
//         <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
//         <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
//         <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
//         <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />
//         <Route path="/forgot-password" element={<><Navbar /><ForgotPassword/><Footer /></>} />
//         <Route path="/reset-password" element={<><Navbar /><ResetPassword/><Footer /></>} />

//         {userRole==="individual"?(

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

//         </Route>
//         ): (userRole==="admin")&&(

//         {/* Admin Dashboard */}
        
//         <Route path="/admin" element={<><AdminDashboard /><Footer /></>} />
//         <Route path="/user-management" element={<><UserManagement /><Footer /></>} />
//         <Route path="/feedback-support" element={<><FeedbackSupport /><Footer /></>} />
//         <Route path="/admin/subscribers" element={<><Subscribers /><Footer /></>} />
//         <Route path="/report" element={<><AdminReport /><Footer /></>} />

//         )}

//         <Route path="/*" element={<><DashboardNavbar /><PageNotFound/><Footer /></>} />

//       </Routes>
//     </Router>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";  // Make sure to import useSelector
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardNavbar from "./components/DashboardNavbar";

import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Feature from "./pages/user/Feature";
import Loginpage from "./pages/user/Loginpage";
import SignupPage from "./pages/user/Signup";

import Dashboard from "./pages/user/Dashboard";
import Transaction from "./pages/user/Transaction";
import Budget from "./pages/user/Budget";
import Saving from "./pages/user/Saving";
import Report from "./pages/user/Report";
import Profile from "./pages/user/Profile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import FeedbackSupport from "./pages/admin/FeedbackSupport";
import NotificationPage from "./pages/user/NotificationPage";
import PageNotFound from "./pages/user/PageNotFound";
import RecommendationsTips from "./pages/user/RecommendationsTips";
import FeedbackForm from "./pages/user/FeedbackForm";
import SubscriptionPage from "./pages/user/SubscriptionPage";
import PaymentPage from "./pages/user/Paymentpage";
import RecommendationSavings from "./pages/user/RecommendationSavings";
import Subscribers from "./pages/admin/Subscribers";
import AdminReport from "./pages/admin/AdminReport";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";

function App() {
  const userRole = useSelector((state) => state.auth.role);  // Accessing user role from Redux state
console.log(userRole);

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />
        <Route path="/forgot-password" element={<><Navbar /><ForgotPassword /><Footer /></>} />
        <Route path="/reset-password" element={<><Navbar /><ResetPassword /><Footer /></>} />

        {/* Conditional Routes for User Role */}
        {userRole === "individual" ? (
          <Route path="/" element={<><DashboardNavbar /><Footer /></>}>
            {/* User Dashboard Pages */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transaction />} />
            <Route path="budget" element={<Budget />} />
            <Route path="savings" element={<Saving />} />
            <Route path="reports" element={<Report />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route path="recommendationstips" element={<RecommendationsTips />} />
            <Route path="recommendationsavings" element={<RecommendationSavings />} />
            <Route path="feedbackform" element={<FeedbackForm />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="payment" element={<PaymentPage />} />
          </Route>
        ) : userRole === "admin" ? (
          <Route path="/" element={<><Footer /></>}>
            {/* Admin Dashboard */}
            <Route path="admin" element={<><AdminDashboard /></>}/>
            <Route path="user-management" element={<UserManagement />} />
            <Route path="feedback-support" element={<FeedbackSupport />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="report" element={<AdminReport />} />
          </Route>
        ) : null}

        {/* Catch All Route for Invalid Pages */}
        <Route path="/*" element={<><PageNotFound /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
