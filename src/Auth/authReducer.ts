import { createSlice } from "@reduxjs/toolkit";
import { AuthStage } from "./enums/AuthStages";
import { RegisterStatus } from "./enums/RegisterStatus";

interface User {
  uid: string;
  avatar: string;
  name: string;
  role: string;
}

interface Auth {
  status: AuthStage;
  registeredStatus: RegisterStatus;
  user: User;
}

const initialState: Auth = {
  status: AuthStage.INIT,
  registeredStatus: RegisterStatus.NOT_REGISTERED,
  user: {
    uid: "",
    avatar: "",
    name: "",
    role: "",
  },
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.registeredStatus = action.payload.registeredStatus;
      state.status = AuthStage.LOGGED_IN;
    },
    logout(state) {
      state.status = AuthStage.LOGGED_OUT;
      state.user = initialState.user;
    },
    setUserRole(state, action) {
      state.user.role = action.payload;
    },
  },
  extraReducers: {
    "userProfile/profileCompleted": (state, action) => {
      state.registeredStatus = RegisterStatus.REGISTERED;
    },
  },
});
export default slice.reducer;
export const { login, logout, setUserRole } = slice.actions;
