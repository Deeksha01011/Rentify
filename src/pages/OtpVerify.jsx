import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIXED IMPORT
import bgImg from "../assets/backgrounds/bl1.jpg";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Signup } from "../Services/operations/Authoperations";

const OtpVerify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = React.useState("");
  const { signupData } = useSelector((state) => state.auth);
  console.log(signupData);
  const { loading } = useSelector((state) => state.auth);
  console.log(otp);
  useEffect(() => {
    if (!signupData) {
      navigate("/register");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } =
      signupData;
    dispatch(
      Signup(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

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
      {loading ? (
        <div className="text-gray-900 font-bold text-xl">Loading...</div>
      ) : (
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
            Verify Email
          </h1>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[58px] border-0 bg-[rgba(255,255,255,0.4)] rounded-[0.5rem] text-[#212529] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              renderSeparator={<span>-</span>}
              inputStyleStyle={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#212529")}
              onBlur={(e) => (e.target.style.borderColor = "#ced4da")}
            />
            <button
              type="submit"
              onMouseOver={(e) => (e.target.style.backgroundColor = "#495057")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#212529")}
              className="mt-7 w-full cursor-pointer transition-all duration-300  font-medium bg-[#212529] text-white p-[1rem] rounded-lg font-medium "
            >
              Verify Email
            </button>
          </form>

          {/* OTP Boxes
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
        </div> */}
          {/* 
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
        </button> */}
        </div>
      )}
    </div>
  );
};

export default OtpVerify;
