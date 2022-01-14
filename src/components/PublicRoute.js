import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { HOMEPAGE_URL } from "./urls";

const PublicRoute = ({ children }) => {
  let location = useLocation();
  const redirectBack = location.state?.redirectBack;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const isUserLoggedIn = isAuthenticated !== "init";
  let redirectTo = HOMEPAGE_URL;

  if (isAuthenticated && redirectBack) {
    redirectTo = location.state.redirectTo;
  }

  if (isUserLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
export default PublicRoute;
