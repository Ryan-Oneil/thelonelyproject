import { createSlice } from "@reduxjs/toolkit";
import { AuthStage } from "./enums/AuthStages";

interface User {
  uid: string;
  avatar: string;
  name: string;
  role: string;
}

interface Auth {
  status: AuthStage;
  user: User;
}

const initialState: Auth = {
  status: AuthStage.INIT,
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
      state.user = action.payload;
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
});
export default slice.reducer;
export const { login, logout, setUserRole } = slice.actions;
