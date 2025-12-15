import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";
import profileReducer from "../slices/profileSlice.jsx"

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer
});
