import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Cart from "./pages/Cart.jsx";
import Navbar from "./components/Navbar.jsx";
import LogIn from "./pages/LogIn.jsx";
import Register from "./pages/Register.jsx";
import OtpVerify from "./pages/OtpVerify.jsx";
import OtpSuccess from "./pages/OtpSuccess.jsx";
import Footer from "./components/Footer.jsx";
import Category from "./pages/Category.jsx";
import ForgotPassword from "./pages/auth/ForgetPassword.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import Profile from "./pages/dashboard/Profile.jsx";
import BusinessDashboard from "./pages/dashboard/lister/BusinessDashboard.jsx";
import IndividualDashboard from "./pages/dashboard/lister/IndividualDashboard.jsx";
import RenterDashboard from "./pages/dashboard/renter/RenterDashboard.jsx";
import Setting from "./components/Setting/Setting.jsx";

const App = () => {
  // const { user } = useSelector((state) => state.auth);

  // ===========================
  // CONDITIONAL DASHBOARD LOGIC
  // ===========================
  // const getDashboard = () => {
  //   if (!user) return <Navigate to="/login" replace />;

  //   if (!user.isProfileComplete) {
  //     return <Navigate to="/dashboard/profile" replace />;
  //   }

  //   if (user.additionalDetails?.isLister) {
  //     if (user.additionalDetails.listerType === "business") {
  //       return <BusinessDashboard />;
  //     }
  //     if (user.additionalDetails.listerType === "individual") {
  //       return <IndividualDashboard />;
  //     }
  //   }

  //   return <RenterDashboard />;
  // };

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<OtpVerify />} />
          <Route path="/otp-success" element={<OtpSuccess />} />
          <Route path="/category" element={<Category />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* DASHBOARD */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard/my-profile" element={<Profile />} />
            <Route path="/dashboard/setting" element={<Setting/>}/>
            {/* <Route  element={<} /> */}
          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
