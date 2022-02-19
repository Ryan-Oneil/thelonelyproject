import React from "react";
import { Center, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import { useAppSelector } from "../../utils/hooks";
import { AddIcon } from "@chakra-ui/icons";
import FileUploader from "./FileUploader";

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

  return (
    <ProfileCard>
      <Heading size={"md"}>Gallery</Heading>
      <SimpleGrid
        pt={3}
        columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
        spacing={2}
      >
        {medias.map((image) => (
          <Image
            src={image.url}
            borderRadius={"lg"}
            width={"100%"}
            key={image.url}
            draggable={false}
            userSelect={"none"}
          />
        ))}
        {editMode && (
          <FileUploader
            accept={"image/*"}
            uploadAction={(file: File) => console.log(file)}
          >
            <Center
              bg={"#fafafa"}
              borderRadius={"lg"}
              border={"1px dashed #d9d9d9"}
              cursor={"pointer"}
              _hover={{ borderColor: "#b6bbcd" }}
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
