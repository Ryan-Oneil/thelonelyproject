import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";

import { useAppDispatch } from "../../utils/hooks";
import { logout } from "../authReducer";
import { FaSignOutAlt } from "react-icons/fa";

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
        icon={<FaSignOutAlt size={32} />}
      />
    </Tooltip>
  );
};
export default LogoutButton;
