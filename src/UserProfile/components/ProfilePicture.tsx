import React from "react";
import { Box, Heading, IconButton, Image, VStack } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { EditIcon } from "@chakra-ui/icons";
import { uploadProfilePicture } from "../userProfileReducer";
import FileUploader from "./FileUploader";

const ProfilePicture = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const { name, profilePictureUrl } = useAppSelector(
    (state) => state.profile.users.entities[userId]
  ) || { name: "", profilePictureUrl: "" };
  const dispatch = useAppDispatch();

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
            uploadAction={(file: File) =>
              dispatch(uploadProfilePicture(file, userId))
            }
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
