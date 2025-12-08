import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.jsx";

export const rootReducer = combineReducers({
  auth: authReducer,
});
