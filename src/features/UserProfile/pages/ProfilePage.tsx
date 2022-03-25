import React from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import ProfileGallery from "../components/ProfileGallery";
import ProfileInterests from "../components/ProfileInterests";
import ProfilePrompts from "../components/ProfilePrompts";
import { useAppSelector } from "../../../utils/hooks";
import BaseAppPage from "../../../Base/pages/BaseAppPage";
import { useUserProfile } from "../api/getUserProfile";
import ProfileHeader from "../components/ProfileHeader";
import { UserProfile } from "../types/Profile";
import EditableCard from "../components/EditableCard";
import { useUpdateProfileAbout } from "../api/updateUserProfile";

const ProfilePage = () => {
  const userId = useAppSelector((state) => state.auth.user.uid);
  const params = useParams();
  const profileId = params.userId || userId;
  const enableEdit = profileId === userId;

  const { data, isLoading } = useUserProfile(profileId);
  const {
    about = "",
    medias = [],
    interests = [],
    prompts = [],
  } = (data as UserProfile) || {
    about: "",
    medias: [],
    interests: [],
    prompts: [],
  };
  const updateAbout = useUpdateProfileAbout();

  return (
    <BaseAppPage>
      <Box
        backgroundImage={require("../../../assets/media/img.png")}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"100% 210px"}
        flexWrap={"wrap"}
        w={"100%"}
      >
        <ProfileHeader
          id={data?.id}
          name={data?.name}
          profilePictureUrl={data?.profilePictureUrl}
          {...data?.connection}
        />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          w={"100%"}
          px={"5%"}
          pt={0}
          spacing={10}
        >
          <VStack pt={10} spacing={10}>
            <EditableCard
              defaultValue={about}
              title={"About me"}
              submitAction={(nextValue: string) =>
                updateAbout.mutate(nextValue)
              }
              showEditControls={enableEdit}
              key={about}
              isLoading={isLoading}
            />
            <ProfileGallery
              medias={medias}
              editMode={enableEdit}
              isLoading={isLoading}
            />
          </VStack>
          <SimpleGrid
            pt={{ base: 0, lg: 10 }}
            spacing={10}
            columns={{ base: 1, xl: 2 }}
          >
            <ProfileInterests
              editMode={enableEdit}
              interests={interests}
              isLoading={isLoading}
            />
            <ProfilePrompts editMode={enableEdit} prompts={prompts} />
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </BaseAppPage>
  );
};
export default ProfilePage;
