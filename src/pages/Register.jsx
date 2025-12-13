import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/backgrounds/registerbg.jpg";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import { setSignupData } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Sendotp } from "../Services/operations/Authoperations";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const changeHandler = (e) => {
  
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
 
  };

  const submithandler = (e) => {
    e.preventDefault();


    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const singupdata = {
      ...formData,
      accountType,
    };

    console.log(singupdata);
    // Dispatch signup action here
    dispatch(setSignupData(singupdata));
    dispatch(Sendotp(email, navigate));

    // reset form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.USER);
  };

  return (
    <div
      className="w-11/12 max-w-maxContent mx-auto flex items-center justify-center min-h-screen mt-8 rounded-xl"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(3px)",
          borderRadius: "15px",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 18px rgba(52, 58, 64, 0.15)",

          transition: "all 0.5s ease-in-out",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "white",
            marginBottom: "1.5rem",
          }}
        >
          Register Yourself
        </h1>

        <form
          onSubmit={submithandler}
          style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}
        >
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={changeHandler}
            placeholder="First Name"
            style={inputStyle}
          />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={changeHandler}
            placeholder="Last Name"
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={changeHandler}
            placeholder="Email"
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Create Password"
            name="password"
            value={password}
            onChange={changeHandler}
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeHandler}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle = {
  padding: "0.9rem",
  backgroundColor: "#212529",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1.2rem",
  fontWeight: "bold",
  cursor: "pointer",
};

export default Register;
