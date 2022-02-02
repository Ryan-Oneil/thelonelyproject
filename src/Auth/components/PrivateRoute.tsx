import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_URL } from "../../utils/urls";
import { useAppSelector } from "../../utils/hooks";
import { AuthStage } from "../enums/AuthStages";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const isUserLoggedIn = status === AuthStage.LOGGED_IN;

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
