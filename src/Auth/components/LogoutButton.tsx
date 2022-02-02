import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";

import { useAppDispatch } from "../../utils/hooks";
import { logout } from "../authReducer";

const LogoutButton = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  return (
    <Tooltip label={"Log out"}>
      <IconButton
        variant="ghost"
        aria-label={"Sign out"}
        fontSize="20px"
        onClick={handleClick}
        icon={
          <FontAwesomeIcon
            icon={faSignOutAlt}
            color={"black"}
            className={"fa-2x"}
          />
        }
      />
    </Tooltip>
  );
};
export default LogoutButton;
