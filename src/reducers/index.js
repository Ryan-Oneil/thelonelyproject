import authReducer from "../Auth/authReducer";
import { combineReducers } from "@reduxjs/toolkit";
import userProfileReducer from "./userProfileReducer";
import chatReducer from "../Chat/chatReducer";

export default combineReducers({
  auth: authReducer,
  profile: userProfileReducer,
  chat: chatReducer,
});
