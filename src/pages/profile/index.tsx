import React from "react";
import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import ProfileGallery from "@/features/UserProfile/components/ProfileGallery";
import ProfileInterests from "@/features/UserProfile/components/ProfileInterests";
import ProfilePrompts from "@/features/UserProfile/components/ProfilePrompts";
import BaseAppLayout from "@/features/Base/BaseAppLayout";
import { useUserProfile } from "@/features/UserProfile/api/getUserProfile";
import ProfileHeader from "@/features/UserProfile/components/ProfileHeader";
import { UserProfile } from "@/features/UserProfile/types/Profile";
import EditableCard from "@/features/UserProfile/components/EditableCard";
import { useUpdateProfileAbout } from "@/features/UserProfile/api/updateUserProfile";
import SpotifyArtists from "@/features/UserProfile/components/SpotifyArtists";
import { useRouter } from "next/router";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import Image from "next/image";
import profileBanner from "@/public/img.png";

const ProfilePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const profileId = (router.query.uid as string) || user.uid;
  const enableEdit = profileId === user.uid;

  const { data, isLoading } = useUserProfile(profileId);
  const {
    about = "",
    medias = [],
    interests = [],
    prompts = [],
    spotifyArtists = [],
  } = (data as UserProfile) || {
    about: "",
    medias: [],
    interests: [],
    prompts: [],
    spotifyArtists: [],
  };
  const updateAbout = useUpdateProfileAbout();

  return (
    <BaseAppLayout title={"Profile"}>
      <Box flexWrap={"wrap"} w={"100%"}>
        <Box height={"300px"} position={"relative"} mb={"-110px"}>
          <Image
            src={profileBanner}
            alt={"Profile banner"}
            placeholder={"blur"}
            objectFit={"cover"}
            layout={"fill"}
          />
        </Box>
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
            {(enableEdit || spotifyArtists.length > 0) && (
              <SpotifyArtists editMode={enableEdit} artists={spotifyArtists} />
            )}
            <ProfilePrompts editMode={enableEdit} prompts={prompts} />
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </BaseAppLayout>
  );
};
export default ProfilePage;
