import authReducer from "./authReducer";
import { combineReducers } from "@reduxjs/toolkit";
import userProfileReducer from "./userProfileReducer";

export default combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
});
