import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { categoriesEndpoint, itemsEndpoint } from "../apis";

export const getAllCategories = async () => {
  try {
    const response = await apiconnector(
      "GET",
      categoriesEndpoint.GETCATEGORIES,
      {}
    );
    if (response.data.success) {
      console.log(response.data);

      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const createItem = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiconnector("POST", itemsEndpoint.CREATE_ITEM, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CREATE_ITEM API RESPONSE", res);
    if (res.data.success) {
      toast.success("Item created successfully");
    }

    return res.data;
  } catch (error) {
    console.log(error);
    // toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};

export const listItem = async (data, token, navigate) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiconnector("POST", itemsEndpoint.LIST_ITEMS, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("LIST_ITEMS API RESPONSE", res);
    if (res.status) {
      toast.success("Item listed successfully");
      navigate("/dashboard/listed-items");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};
