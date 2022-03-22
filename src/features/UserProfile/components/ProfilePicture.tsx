import React from "react";
import { Box, Heading, IconButton, Image, VStack } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import FileUploader from "./FileUploader";
import { useUploadProfilePicture } from "../api/updateUserProfile";

const ProfilePicture = ({
  editMode,
  name,
  profilePictureUrl,
}: {
  editMode: boolean;
  name: string;
  profilePictureUrl: string;
}) => {
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
