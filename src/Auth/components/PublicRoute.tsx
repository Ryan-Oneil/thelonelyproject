import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { HOMEPAGE_URL } from "../../utils/urls";
import { useAppSelector } from "../../utils/hooks";
import { AuthStage } from "../enums/AuthStages";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation() as any;
  const redirectBack = location.state?.redirectBack;
  const { status } = useAppSelector((state) => state.auth);
  const isUserLoggedIn = status === AuthStage.LOGGED_IN;
  let redirectTo = HOMEPAGE_URL;

  if (isUserLoggedIn && redirectBack) {
    redirectTo = location.state.redirectTo;
  }

  if (isUserLoggedIn) {
    return <Navigate to={redirectTo} />;
  }
  return children;
};
export default PublicRoute;
