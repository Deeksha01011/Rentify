import { authEndpoints } from "../apis";
import { apiconnector } from "../apiConnector";
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

export const Sendotp = (email, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading...");

  dispatch(setLoading(true));
  try {
    const response = await apiconnector("POST", authEndpoints.SENDOTP, {
      email,
    });
    console.log(response.data);
    if (response.status === 200) {
      toast.success("OTP sent successfully", { id: toastId });
      navigate("/verify-otp");
    }
  } catch (error) {
    console.error(error.message);
    toast.error("Failed to send OTP");
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

export const Signup =
  (firstName, lastName, email, password, confirmPassword, otp, navigate) =>
  async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiconnector("POST", authEndpoints.SIGNUP, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      if (response.data.success) {
        toast.success("Signup successful", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
      console.error("Error Response:", error.response?.data); // Log server error details
      toast.error(error.response?.data?.message || "Signup failed");
      navigate("/register");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };

export const Signin = (email, password, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading...");

  console.log("idhar AA gaya mai");
  dispatch(setLoading(true));
  try {
    const response = await apiconnector("POST", authEndpoints.LOGIN, {
      email,
      password,
    });

    if (!response.data.success) {
      throw new Error("Login failed");
    }

    const userImage = response.data.data.image
      ? response.data.data.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

    const userData = {
      ...response.data.data,
      image: userImage,
    };

    toast.success("Login successful", { id: toastId });

    dispatch(setToken(response.data.token));
    dispatch(setUser(userData));

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(userData));

    navigate("/dashboard/my-profile");
  } catch (error) {
    console.error(error.message);
    console.error(error.message);
    toast.error("Login failed");
  }
};

export const Logout = (navigate) => (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setToken(null));
    toast.success("Logged Out Successfully");
    navigate("/login");
  } catch (error) {
    console.error(error);
    toast.error("Failed to Logout");
  }
};
