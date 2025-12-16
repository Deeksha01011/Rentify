const REACT_APP_API_URL = "http://localhost:3000/api/v1";
export const authEndpoints = {
  SENDOTP: REACT_APP_API_URL + "/auth/send-otp",
  SIGNUP: REACT_APP_API_URL + "/auth/signup",
  LOGIN: REACT_APP_API_URL + "/auth/login",
};

export const categoriesEndpoint = {
  GETCATEGORIES: "/items/getallcategories",
  GETCATEGORYDETAIL: "/items/getcategorydetails",
};

export const profileEndpoint = {
  UPDATE_PROFILE_PICTURE: "/profile/uploadprofileimage"
}

export const adminEndpoints ={
  ADMIN_ANALYTICS :  REACT_APP_API_URL+"/admin/adminanalytics"
}