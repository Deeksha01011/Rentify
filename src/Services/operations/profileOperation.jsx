import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiConnector";
import { profileEndpoint } from "../apis";


export const updateProfilePicture = (token, formData) => async (dispatch) => {
  console.log("Setting file and token: ", token, formData);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      profileEndpoint.UPDATE_PROFILE_PICTURE,
      formData,
      {
        "Content-Type": "multipart/form-data",
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
    dispatch(setUser(response.data.data));
  } catch (error) {
    console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
    toast.error("Could Not Update Profile Picture");
  }
  toast.dismiss(toastId);
};