import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";   // ✅ FIXED IMPORT
import bgImg from "../assets/backgrounds/bl1.jpg";

const OtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();  

  const phone = location.state?.phone;

  // OTP boxes reference
  const inputs = useRef([]);

  // Move to next box
  const handleChange = (element, index) => {
    if (element.value.length > 0 && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  // Redirect to login after OTP verified
  const handleVerify = () => {
    navigate("/login");   
  };

  if (!phone) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        No phone number found. Please register first.
      </div>
    );
  }

  return (
    <div
    className="w-11/12 max-w-maxContent mx-auto rounded-xl mt-5"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(4px)",
          padding: "2rem",
          width: "90%",
          maxWidth: "420px",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(33,37,41,0.25)",
          textAlign: "center",
          color: "#f8f9fa",
        }}
      >
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Verify OTP
        </h1>

        <p style={{ marginBottom: "1.5rem", color: "#dee2e6" }}>
          OTP sent to: <b style={{ color: "#fff" }}>{phone}</b>
        </p>

        {/* OTP Boxes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "1.5rem",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              maxLength={1}
              ref={(ref) => (inputs.current[index] = ref)}
              onChange={(e) => handleChange(e.target, index)}
              style={{
                width: "48px",
                height: "58px",
                borderRadius: "10px",
                fontSize: "1.5rem",
                textAlign: "center",
                border: "2px solid #ced4da",
                background: "rgba(255,255,255,0.4)",
                color: "#212529",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#212529")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            />
          ))}
        </div>

        <button
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: "#212529",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onClick={handleVerify}  // ✅ CORRECT POSITION
          onMouseOver={(e) => (e.target.style.backgroundColor = "#495057")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#212529")}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
