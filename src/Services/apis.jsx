const REACT_APP_API_URL = "http://localhost:3000/api/v1";
export const authEndpoints = {
  SENDOTP: REACT_APP_API_URL + "/auth/send-otp",
  SIGNUP: REACT_APP_API_URL + "/auth/signup",
  LOGIN: REACT_APP_API_URL + "/auth/login",
};

export const categoriesEndpoint = {
  GETCATEGORIES: REACT_APP_API_URL + "/items/getallcategories",
  GETCATEGORYDETAIL: REACT_APP_API_URL + "/items/getcategorydetails",
};

export const profileEndpoint = {
  UPDATE_PROFILE_PICTURE: REACT_APP_API_URL + "/profile/uploadprofileimage",
  UPDATE_PROFILE_URL: REACT_APP_API_URL + "/profile/updateprofile",
  UPDATE_PASSWORD_URL: REACT_APP_API_URL + "/profile/changepassword",
  DELETE_ACCOUNT_URL: REACT_APP_API_URL + "/profile/deleteaccount",
  GET_USER_DETAILS: REACT_APP_API_URL + "/profile/getuserdeatils",
};

export const itemsEndpoint = {
  CREATE_ITEM: REACT_APP_API_URL + "/items/createitem",
  LIST_ITEMS: REACT_APP_API_URL + "/items/listitem"

}

export const adminEndpoint = {
  GET_PENDING_LIST : REACT_APP_API_URL + "/admin/getpendinglists",
  GET_APPROVED_LIST : REACT_APP_API_URL + "/admin/getapprovedlists",
  GET_REJECTED_LIST : REACT_APP_API_URL + "/admin/rejectedLists",
  UPDATE_STATUS : REACT_APP_API_URL + "/admin/updatestatus",
}
