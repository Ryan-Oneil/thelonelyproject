import React from "react";
import {
  Box,
  Center,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Tooltip,
} from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import FileUploader from "./FileUploader";
import { deleteProfileMedia, uploadProfileMedia } from "../userProfileReducer";

const ProfileGallery = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const medias =
    useAppSelector((state) => state.profile.users.entities[userId]?.medias) ||
    [];
  const dispatch = useAppDispatch();

  return (
    <ProfileCard>
      <Heading size={"md"} pb={3}>
        Gallery
      </Heading>
      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={2}
        maxH={"40vh"}
        overflow={"auto"}
      >
        {medias.map((image) => (
          <Box position="relative" key={image.id}>
            <Image
              src={image.url}
              borderRadius={"lg"}
              width={"100%"}
              draggable={false}
              userSelect={"none"}
              maxH={180}
              objectFit="cover"
            />
            {editMode && (
              <Tooltip label={"Delete"}>
                <IconButton
                  isRound
                  bg="white"
                  size="sm"
                  _hover={{ transform: "scale(1.1)" }}
                  sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
                  transition="all 0.15s ease"
                  icon={
                    <DeleteIcon transition="all 0.15s ease" color={"red"} />
                  }
                  position="absolute"
                  top="1"
                  right="1"
                  aria-label={"Delete media"}
                  onClick={() => dispatch(deleteProfileMedia(image.id, userId))}
                />
              </Tooltip>
            )}
          </Box>
        ))}
        {editMode && (
          <FileUploader
            accept={"image/*"}
            uploadAction={(file: File) =>
              dispatch(uploadProfileMedia(file, userId))
            }
          >
            <Center
              bg={"#fafafa"}
              borderRadius={"lg"}
              border={"1px dashed #d9d9d9"}
              cursor={"pointer"}
              _hover={{ borderColor: "#b6bbcd" }}
              minH={150}
              minW={150}
            >
              <AddIcon />
            </Center>
          </FileUploader>
        )}
      </SimpleGrid>
    </ProfileCard>
  );
};
export default ProfileGallery;
