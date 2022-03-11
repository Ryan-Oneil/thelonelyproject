import {
  useChangeRequestStatus,
  useSendConnectionRequest,
} from "../api/updateUserProfile";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import ProfilePicture from "./ProfilePicture";
import React from "react";
import { UserProfile } from "../types/Profile";
import { useAppSelector } from "../../../utils/hooks";

interface HeaderProps extends UserProfile {
  attemptingToConnect: boolean;
  connector: boolean;
  connectionStatus: string;
}

const ProfileHeader = ({
  id = "",
  name = "",
  profilePictureUrl = "",
  connectionStatus = "NONE",
  attemptingToConnect = false,
  connector = false,
}: HeaderProps) => {
  const userId = useAppSelector((state) => state.auth.user.uid);
  const ownsProfile = id === userId;

  const buttonStyle = {
    backgroundColor: "rgba(97, 94, 240, 0.1)",
    color: "#444BD3",
    size: "lg",
    m: "auto",
    mt: { base: "5", sm: "120" },
    _hover: { backgroundColor: "#b6bbcd" },
  };

  const ProfileButton = () => {
    const connectRequest = useSendConnectionRequest();
    const changeRequestStatus = useChangeRequestStatus();

    if (connectionStatus === "CONNECTED") {
      return <Button {...buttonStyle}>Message</Button>;
    }

    if (attemptingToConnect && !connector) {
      return (
        <Button
          {...buttonStyle}
          onClick={() =>
            changeRequestStatus.mutate({ profileId: id, status: "accept" })
          }
        >
          Accept Connection
        </Button>
      );
    }
    return (
      <Button
        {...buttonStyle}
        disabled={connectionStatus !== "NONE"}
        onClick={() => connectRequest.mutate(id)}
      >
        {connectionStatus === "NONE" ? "Connect" : "Pending"}
      </Button>
    );
  };

  return (
    <Flex p={"100px 5% 0"} direction={{ base: "column", sm: "row" }}>
      <ProfilePicture
        editMode={ownsProfile}
        profilePictureUrl={profilePictureUrl}
        name={name}
      />
      <Spacer />
      {!ownsProfile && <ProfileButton />}
    </Flex>
  );
};

export default ProfileHeader;
