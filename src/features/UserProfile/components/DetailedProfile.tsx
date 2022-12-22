import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  ButtonGroup,
  SimpleGrid,
  SkeletonText,
  createStandaloneToast,
} from "@chakra-ui/react";
import { UserProfile } from "../types/Profile";
import ProfileInterests from "./ProfileInterests";
import ProfilePrompts from "./ProfilePrompts";
import { useUserProfile } from "../api/getUserProfile";
import { useSendConnectionRequest } from "../api/updateUserProfile";
import { USER_PROFILE_URL } from "@/utils/urls";
import { getApiError } from "@/apis/api";
import ProfileGallery from "./ProfileGallery";
import SpotifyArtists from "./SpotifyArtists";
import Link from "next/link";

interface Props extends UserProfile {
  nextProfileAction: Function;
}

const DetailedProfile = ({
  id = "",
  name,
  profilePictureUrl,
  about,
  nextProfileAction,
}: Props) => {
  const { data, isLoading, isSuccess } = useUserProfile(id);
  const sendConnection = useSendConnectionRequest();

  const BaseProfile = () => {
    return (
      <>
        <Image
          h={"170px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-16}>
          <Avatar
            size={"2xl"}
            src={profilePictureUrl}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Stack spacing={0} align={"center"} p={4}>
          <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
            {name}
          </Heading>
          <Text color={"gray.500"} textAlign={"center"}>
            {about}
          </Text>
        </Stack>
      </>
    );
  };

  if (isLoading || !isSuccess) {
    return (
      <Box boxShadow="lg" bg="white" maxW={"900px"}>
        <BaseProfile />
        <SkeletonText p="4" noOfLines={4} spacing="4" />
      </Box>
    );
  }

  const { interests, medias, prompts, spotifyArtists } = data;

  return (
    <Center py={6}>
      <Box
        maxW={"1100px"}
        w={"full"}
        bg={"white"}
        boxShadow={"2xl"}
        rounded={"md"}
      >
        <BaseProfile />
        <Box p={4}>
          <SimpleGrid pb={4} spacing={10} columns={{ base: 1, xl: 2 }}>
            <ProfileInterests editMode={false} interests={interests} />
            <ProfilePrompts editMode={false} prompts={prompts} />
            {spotifyArtists.length > 0 && (
              <SpotifyArtists editMode={false} artists={spotifyArtists} />
            )}
            <ProfileGallery
              medias={medias}
              editMode={false}
              isLoading={isLoading}
            />
          </SimpleGrid>
          <ButtonGroup>
            <Button
              w={"full"}
              bg={"red"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => nextProfileAction()}
            >
              Skip
            </Button>
            <Link href={`${USER_PROFILE_URL}?uid=${id}`}>
              <Button
                w={"full"}
                bg={"#151f21"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                View profile
              </Button>
            </Link>
            <Button
              w={"full"}
              bg={"#151f21"}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              onClick={() => {
                sendConnection
                  .mutateAsync(id)
                  .then(() => nextProfileAction())
                  .catch((error) => {
                    const { toast } = createStandaloneToast();
                    const errorMessage = getApiError(error);

                    toast({
                      title: "An error occurred.",
                      description: errorMessage,
                      status: "error",
                      duration: 2000,
                      isClosable: true,
                    });
                  });
              }}
            >
              Connect
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Center>
  );
};

export default DetailedProfile;
