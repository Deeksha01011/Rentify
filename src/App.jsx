import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import Navbar from './components/Navbar.jsx'
import LogIn from './pages/LogIn.jsx'
import Register from './pages/Register.jsx'
import OtpVerify from './pages/OtpVerify.jsx'
import OtpSuccess from './pages/OtpSuccess.jsx'
import Footer from './components/Footer.jsx'
import Category from './pages/Category.jsx'
import ForgotPassword from "./pages/auth/ForgetPassword.jsx";


const App = () => {
  return (
        <div className="min-h-screen flex flex-col">

    <BrowserRouter>
      <Navbar/>

      <main className="flex-grow">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/otp' element={<OtpVerify />} />
        <Route path='/otp-success' element={<OtpSuccess />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/category' element={<Category />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
        </div>
  )
}

export default App
