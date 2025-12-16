import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { userEndpoints } from "../apis";

export const getMylisting = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiconnector(
      "GET",
      userEndpoints.GET_LISTED_ITEMS,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_LISTED_ITEMS API RESPONSE", res);
    if (res.data.success) {
      toast.success("Listed Items fetched successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

export const getUserStats = async (token) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiconnector(
      "GET",
      userEndpoints.GET_USER_ANALYTICS,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_STATS API RESPONSE", res);
    if (res.data.success) {
      toast.success(" User Dashboard fetched successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};


export const getListItemDetails = async (id,token) => {
  const toastId = toast.loading("Loading...");

  try {
    const res = await apiconnector(
      "POST",
      userEndpoints.GET_LIST_ITEM_DETAIL,
      {id},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("ITEM_DETAILs API RESPONSE", res);
    if (res.data.success) {
      toast.success(" fetch item detail successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

