import React, { useRef } from "react";
import {
  Box,
  Heading,
  IconButton,
  Image,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { EditIcon } from "@chakra-ui/icons";
import { uploadProfilePicture } from "../userProfileReducer";

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
  const ref = useRef<HTMLInputElement>(null);

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
          <>
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
              onClick={() => ref?.current?.click()}
            />
            <Input
              accept="image/*"
              size="lg"
              type={"file"}
              ref={ref}
              display={"none"}
              onChange={(event) => {
                const file = event.currentTarget.files?.item(0);

                if (file) {
                  dispatch(uploadProfilePicture(file, userId));
                }
              }}
            />
          </>
        )}
      </Box>

      <Heading>{name}</Heading>
    </VStack>
  );
};
export default ProfilePicture;
