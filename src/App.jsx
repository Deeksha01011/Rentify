import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
import ListItem from "./pages/dashboard/ListItem";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard.jsx";
import PendingList from "./pages/dashboard/admin/PendingList.jsx";
import ApprovedList from "./pages/dashboard/admin/ApprovedList.jsx";
import RejectedList from "./pages/dashboard/admin/RejectedList.jsx";
import Added_Item from "./pages/dashboard/lister/Added_Item.jsx";


const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.accountType !== "admin") {
    return <Navigate to="/dashboard/my-profile" replace />;
  }
  return children;
};


const App = () => {





  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />

          <Route path="/product/:productId" element={<ProductDescription />} />


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
            <Route path="/dashboard/listed-items" element={<Added_Item/>}/>
            <Route path="/dashboard/listitems" element={<ListItem />} />
            
            <Route path="/dashboard/admin/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/dashboard/pending-list" element={<PendingList />} />
            <Route path="/dashboard/approved-list" element={<ApprovedList />} />
            <Route path="/dashboard/rejected-list" element={<RejectedList />} />


          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
