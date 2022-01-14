import authReducer from "./authReducer";
import { combineReducers } from "@reduxjs/toolkit";

export default combineReducers({
  auth: authReducer,
});
