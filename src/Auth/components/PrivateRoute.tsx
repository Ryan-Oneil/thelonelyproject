import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LOGIN_URL, PROFILE_SETUP_URL } from "../../utils/urls";
import { useAppSelector } from "../../utils/hooks";
import { AuthStage } from "../enums/AuthStages";
import { RegisterStatus } from "../enums/RegisterStatus";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { status, registeredStatus } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const isUserLoggedIn = status === AuthStage.LOGGED_IN;

  if (
    isUserLoggedIn &&
    registeredStatus !== RegisterStatus.REGISTERED &&
    pathname !== PROFILE_SETUP_URL
  ) {
    return <Navigate to={PROFILE_SETUP_URL} />;
  }

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
