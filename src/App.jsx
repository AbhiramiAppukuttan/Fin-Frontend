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
//      <BrowserRouter>
//       <Routes>
        
//         {/* Public Pages */}
//         <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
//         <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
//         <Route path="/features" element={<><Navbar /><Feature /><Footer /></>} />
//         <Route path="/login" element={<><Navbar /><Loginpage /><Footer /></>} />
//         <Route path="/signup" element={<><Navbar /><SignupPage /><Footer /></>} />
//         <Route path="/forgot-password" element={<><Navbar /><ForgotPassword/><Footer /></>} />
//         <Route path="/reset-password" element={<><Navbar /><ResetPassword/><Footer /></>} />
// </Routes>
//         {userRole==="individual"?(
// <Routes>
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
//         </Routes>
//         ): userRole==="admin"?

//         {/* Admin Dashboard */}
//         <Routes>
//         <Route path="/admin" element={<><AdminDashboard /><Footer /></>} />
//         <Route path="/user-management" element={<><UserManagement /><Footer /></>} />
//         <Route path="/feedback-support" element={<><FeedbackSupport /><Footer /></>} />
//         <Route path="/admin/subscribers" element={<><Subscribers /><Footer /></>} />
//         <Route path="/report" element={<><AdminReport /><Footer /></>} />
// </Routes> :(

//         <Route path="/*" element={<><DashboardNavbar /><PageNotFound/><Footer /></>} />
//       )}
//     </BrowserRouter>
//   );
// }

// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardNavbar from "./components/DashboardNavbar";

import Home from "./pages/user/Home";
import About from "./pages/user/About";
import Feature from "./pages/user/Feature";
import Loginpage from "./pages/user/Loginpage";
import SignupPage from "./pages/user/Signup";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import PageNotFound from "./pages/user/PageNotFound";

import Dashboard from "./pages/user/Dashboard";
import Transaction from "./pages/user/Transaction";
import Budget from "./pages/user/Budget";
import Saving from "./pages/user/Saving";
import Report from "./pages/user/Report";
import Profile from "./pages/user/Profile";
import NotificationPage from "./pages/user/NotificationPage";
import RecommendationsTips from "./pages/user/RecommendationsTips";
import FeedbackForm from "./pages/user/FeedbackForm";
import SubscriptionPage from "./pages/user/SubscriptionPage";
import PaymentPage from "./pages/user/Paymentpage";
import RecommendationSavings from "./pages/user/RecommendationSavings";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import FeedbackSupport from "./pages/admin/FeedbackSupport";
import Subscribers from "./pages/admin/Subscribers";
import AdminReport from "./pages/admin/AdminReport";

import { useSelector } from "react-redux";

function App() {
  const userRole = useSelector((state) => state.auth.role);

  // Common Layouts
  const PublicLayout = ({ children }) => (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );

  const UserLayout = ({ children }) => (
    <>
      <DashboardNavbar />
      {children}
      <Footer />
    </>
  );

  const AdminLayout = ({ children }) => (
    <>
      {children}
      <Footer />
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/features" element={<PublicLayout><Feature /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Loginpage /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignupPage /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
        <Route path="/reset-password" element={<PublicLayout><ResetPassword /></PublicLayout>} />

        {/* User Pages */}
        {userRole === "individual" && (
          <Route path="/user" element={<UserLayout />}>
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
        )}

        {/* Admin Pages */}
        {userRole === "admin" && (
          <Route path="/admin/" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="feedback-support" element={<FeedbackSupport />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="report" element={<AdminReport />} />
          </Route>
        )}

        {/* 404 Page */}
        <Route path="/*" element={<PublicLayout><PageNotFound /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
