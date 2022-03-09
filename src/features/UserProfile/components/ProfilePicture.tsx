import React from "react";
import { Box, Heading, IconButton, Image, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../../../utils/hooks";
import { EditIcon } from "@chakra-ui/icons";
import FileUploader from "./FileUploader";
import { UserProfile } from "../types/Profile";
import { useUploadProfilePicture } from "../api/updateUserProfile";

const ProfilePicture = ({ id, name, profilePictureUrl }: UserProfile) => {
  const currentId = useAppSelector((state) => state.auth.user.uid);
  const editMode = currentId === id;
  const profilePicture = useUploadProfilePicture();

  return (
    <VStack>
      <Box position="relative">
        <Image
          objectFit="cover"
          borderRadius="full"
          boxSize="200px"
          src={profilePictureUrl}
          alt={"User profile avatar"}
        />
        {editMode && (
          <FileUploader
            accept={"image/*"}
            uploadAction={(file: File) => profilePicture.mutate(file)}
          >
            <IconButton
              isRound
              bg="white"
              size="sm"
              _hover={{ transform: "scale(1.1)" }}
              sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
              transition="all 0.15s ease"
              icon={<EditIcon transition="all 0.15s ease" />}
              boxShadow="base"
              position="absolute"
              bottom="4"
              right="4"
              aria-label={"Upload new profile picture"}
            />
          </FileUploader>
        )}
      </Box>

      <Heading>{name}</Heading>
    </VStack>
  );
};
export default ProfilePicture;
