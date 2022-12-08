import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { USER_PROFILE_URL } from "@/utils/urls";

const SpotifySetup = () => {
  const { hash } = useLocation();

  const token = hash
    .replace("#", "")
    .split("&")
    .filter(
      (query) => query.substring(0, query.indexOf("=")) === "access_token"
    )[0]
    .replace("access_token=", "");

  if (token) {
    window.opener.postMessage(
      JSON.stringify({
        type: "access_token",
        access_token: token,
      }),
      window.location.origin + "/profile"
    );
  }
  window.close();

  return <Navigate to={USER_PROFILE_URL} />;
};
export default SpotifySetup;
