import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "../assets/backgrounds/registerbg.jpg";

const Register = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSendOTP = () => {
    if (!phone || phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    navigate("/otp", { state: { phone } });
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
          transform: isVisible ? "translateY(0)" : "translateY(40px)",
          opacity: isVisible ? 1 : 0,
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

        <form style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          <input type="text" placeholder="First Name" style={inputStyle} />
          <input type="text" placeholder="Last Name" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <input type="password" placeholder="Create Password" style={inputStyle} />
          <input type="password" placeholder="Re-enter Password" style={inputStyle} />

          <button type="button" style={buttonStyle} onClick={handleSendOTP}>
            Send OTP
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
