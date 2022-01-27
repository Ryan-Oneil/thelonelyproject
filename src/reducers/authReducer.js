import { createSlice } from "@reduxjs/toolkit";
import { Alert, AlertIcon, Button, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export const slice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: "init",
    user: {
      name: "",
      avatar: "",
      id: "",
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
