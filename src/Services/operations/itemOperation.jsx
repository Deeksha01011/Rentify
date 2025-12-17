import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { categoriesEndpoint, itemsEndpoint, renterEndpoints } from "../apis";

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

export const getLatestApprovedListings = async () => {
  let result = [];
  try {
    const res = await apiconnector("GET", itemsEndpoint.APPROVED_LIST);

    if (res?.data?.success) {
      result = res.data.data;
    } else {
      toast.error("Failed to fetch listings");
    }
  } catch (error) {
    console.log("GET APPROVED LISTINGS ERROR", error);
    toast.error("Something went wrong");
  }
  return result;
};
export const getAllItems = async (token) => {
  try {
    const response = await apiconnector(
      "GET",
      itemsEndpoint.GET_ALL_LISTED_ITEMS,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) {
      console.log("ALL ITEMS LISTED HERE", response.data);

      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getListedItemDetail = async (token) => {
  try {
    const response = await apiconnector(
      "GET",
      itemsEndpoint.GET_LISTED_ITEM_DETAILS,

      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.data.success) {
      console.log("ALL ITEMS LISTED HERE", response.data);

      return response;
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const CREATE_ORDER_SUMMARY = async (data, token) => {
  try {
    const response = await apiconnector(
      "POST",
      renterEndpoints.CREATE_ORDER_SUMMARY,
      data,

      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE_ORDER_SUMMARY", response.data);

    if (response.data.success) {
      toast.success("Order Summary Created Successfully");
      return response.data.summary;
    }
  } catch (error) {
    console.log(error);
  }
};
export const GET_ORDER_SUMMARY = async (id, token) => {

  try {
    const response = await apiconnector(
      "POST",
      renterEndpoints.GET_ORDER_SUMMARY,
      {id},

      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (response.data.success) {
      toast.success("Order Summary fetched Successfully");
      console.log("GET_ORDER_SUMMARY", response.data.data);
      return response.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};
