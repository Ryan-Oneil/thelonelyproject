import React from "react";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { getAuth, signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { HOMEPAGE_URL } from "@/utils/urls";

const LogoutButton = () => {
  const router = useRouter();

  const handleClick = () => {
    const auth = getAuth();
    signOut(auth).then(() => router.push(HOMEPAGE_URL));
  };

  return (
    <Tooltip label={"Log out"}>
      <IconButton
        variant="ghost"
        aria-label={"Sign out"}
        fontSize="20px"
        onClick={handleClick}
        icon={<FaSignOutAlt size={24} />}
        color={"red"}
      />
    </Tooltip>
  );
};
export default LogoutButton;
