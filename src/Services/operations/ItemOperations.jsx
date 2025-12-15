import { categoriesEndpoint } from "../apis";
import { apiconnector } from "../apiConnector";
import toast from "react-hot-toast";

export const getAllCategories = async (token) => {
  const toastId = toast.loading("loading...");

  try {
    const response = await apiconnector(
      "GET",
      categoriesEndpoint.GETCATEGORIES,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) {
      console.log(response.data);
      toast.success("Categories Fetched Successfully");
    }
  } catch (error) {
    console.log(error.message);
    toast.error("Failed to fetch categories");
  }
  toast.dismiss(toastId);
};
