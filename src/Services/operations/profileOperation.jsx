import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiConnector";
import { profileEndpoint } from "../apis";
import { Logout } from "./Authoperations";

export const updateProfilePicture = (token, formData) => async (dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      profileEndpoint.UPDATE_PROFILE_PICTURE,
      formData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
      response
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Display Picture Updated Successfully");
    const userImage = response.data.data.image
      ? response.data.data.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

    const updatedUser = { ...response.data.data, image: userImage };
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    toast.error("Could Not Update Profile Picture");
  }
  toast.dismiss(toastId);
};

export const updateProfile = (token, data) => async (dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      profileEndpoint.UPDATE_PROFILE_URL,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("UPDATE_PROFILE_API API RESPONSE............", response);
    if (response.data.succes) {
      toast.success("Profile Updated Successfully");
      dispatch(setUser(response.data.data));
    } else {
      throw new Error(response.data.message);
    }
    const userImage = response.data.data.image
      ? response.data.data.image
      : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
    dispatch(setUser({ ...response.data.data, image: userImage }));
  } catch (error) {
    console.error(error);
    toast.error("Could Not Update Profile");
  }
  toast.dismiss(toastId);
};

export const resetPassword = (token, data) => async () => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector(
      "POST",
      profileEndpoint.UPDATE_PASSWORD_URL,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("RESET_PASSWORD_API API RESPONSE............", res);
    if (res.data.success) {
      toast.success("Password Updated Successfully");
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Could Not Reset Password");
  }
  toast.dismiss(toastId);
};

export const deleteAccount = (token, navigate) => async (dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector(
      "DELETE",
      profileEndpoint.DELETE_ACCOUNT_URL,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE_ACCOUNT_API API RESPONSE............", res);
    if (res.data.success) {
      toast.success("Account Deleted Successfully");
      dispatch(setUser({}));
      dispatch(Logout(navigate));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Could Not Delete Account");
  }
  toast.dismiss(toastId);
};
export const getUserDetails = async (token) => {
  try {
    const res = await apiconnector(
      "GET",
      profileEndpoint.GET_USER_DETAILS,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("GET_USER_DETAILS_API API RESPONSE............", res);
    if (res.data.success) {
      // dispatch(setUser(res.data.data));
      return res.data.data;
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error("Could Not Get User Details");
  }
};
