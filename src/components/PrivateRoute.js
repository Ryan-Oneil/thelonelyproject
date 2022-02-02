import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_URL } from "../utils/urls";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const isUserLoggedIn = isAuthenticated && isAuthenticated !== "init";

  if (isUserLoggedIn) {
    return children;
  }
  return (
    <Navigate
      to={LOGIN_URL}
      state={{ redirectBack: true, redirectTo: pathname }}
    />
  );
};
export default PrivateRoute;
