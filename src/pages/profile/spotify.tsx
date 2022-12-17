import React, { useEffect } from "react";
import { USER_PROFILE_URL } from "@/utils/urls";
import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";

const Spotify = () => {
  const { asPath, push } = useRouter();

  useEffect(() => {
    const tokenDetails = asPath
      .substring(asPath.indexOf("#") + 1)
      .split("&")
      .filter(
        (query) => query.substring(0, query.indexOf("=")) === "access_token"
      );

    let token = "";

    if (tokenDetails.length > 0) {
      token = tokenDetails[0].replace("access_token=", "");
    }

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
    push(USER_PROFILE_URL);
  }, []);

  return <Spinner />;
};
export default Spotify;
