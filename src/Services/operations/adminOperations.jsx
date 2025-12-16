import toast from "react-hot-toast";
import { apiconnector } from "../apiConnector";
import { adminEndpoint } from "../apis";

export const getPendingList = async (token) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector(
      "GET",
      adminEndpoint.GET_PENDING_LIST,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_PENDING_LIST API RESPONSE", res);
    if (res.data.success) {
      toast.success("Pending List fetched successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

export const getApprovedList = async (token) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector(
      "GET",
      adminEndpoint.GET_APPROVED_LIST,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_APPROVED_LIST API RESPONSE", res);
    if (res.data.success) {
      toast.success("Approved List fetched successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateStatus = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector("POST", adminEndpoint.UPDATE_STATUS, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE_STATUS API RESPONSE", res);
    if (res.data.success) {
      toast.success("Status updated successfully");
      //   return res.data.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    toast.dismiss(toastId);
  }
};

export const getRejectedItem = async (token) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await apiconnector(
      "GET",
      adminEndpoint.GET_REJECTED_LIST,
      {},
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_REJECTED_LIST API RESPONSE", res);
    if (res.data.success) {
      toast.success("Rejected List fetched successfully");
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  } finally {
    toast.dismiss(toastId);
  }
};
