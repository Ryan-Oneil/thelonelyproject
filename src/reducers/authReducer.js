import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: "init",
    user: {
      name: "",
      avatar: "",
      uid: "",
    },
    role: "",
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.role = "";
    },
    setUserRole(state, action) {
      state.role = action.payload;
    },
  },
});
export default slice.reducer;
export const { login, logout, setUserRole } = slice.actions;
