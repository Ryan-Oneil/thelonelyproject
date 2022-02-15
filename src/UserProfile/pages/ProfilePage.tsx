import React, { useEffect } from "react";
import BaseAppPage from "../../pages/BaseAppPage";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Card } from "../../components/Card";
import ProfileInterest from "../components/ProfileInterest";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import { fetchUserProfile } from "../userProfileReducer";

const ProfilePage = () => {
  const userId = useAppSelector((state) => state.auth.user.uid);
  const { avatar, images, interests, about, prompts, spotifyArtists, name } =
    useAppSelector((state) => state.profile);
  const params = useParams();
  const dispatch = useAppDispatch();
  const profileId = params.userId || userId;

  const cardStyle = {
    border: "1px solid rgba(18, 17, 39, 0.12)",
    borderRadius: " 12px",
    boxShadow: "none!important",
    width: "100%",
    p: 5,
  };

  useEffect(() => {
    dispatch(fetchUserProfile(profileId));
  }, []);

  const ProfileHeader = () => {
    return (
      <Flex p={"100px 5% 0"} direction={{ base: "column", sm: "row" }}>
        <VStack>
          <Image
            borderRadius="full"
            boxSize="200px"
            src={avatar}
            alt={"User profile avatar"}
            m={"auto"}
            fallbackSrc={
              "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light"
            }
          />
          <Heading>{name}</Heading>
        </VStack>

        <Spacer />
        <Button
          backgroundColor="rgba(97, 94, 240, 0.1)"
          color={"#444BD3"}
          size={"lg"}
          m={"auto"}
          mt={{ base: "5", sm: "120" }}
          _hover={{ backgroundColor: "#b6bbcd" }}
        >
          Connect
        </Button>
      </Flex>
    );
  };

  return (
    <BaseAppPage>
      <Box
        backgroundImage={require("../../assets/media/img.png")}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"100% 210px"}
        flexWrap={"wrap"}
        w={"100%"}
      >
        <ProfileHeader />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          w={"100%"}
          p={"5%"}
          pt={0}
          spacing={10}
        >
          <VStack pt={10} spacing={10}>
            <Card {...cardStyle}>
              <Heading size={"md"}>About me</Heading>
              <Text pt={3}>{about}</Text>
            </Card>
            <Card {...cardStyle}>
              <Heading size={"md"}>Gallery</Heading>
              <SimpleGrid
                pt={3}
                columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }}
                spacing={7}
              >
                {images.map((image) => (
                  <Image
                    src={image.url}
                    borderRadius={"lg"}
                    width={"100%"}
                    key={image.url}
                  />
                ))}
              </SimpleGrid>
            </Card>
          </VStack>
          <SimpleGrid
            pt={{ base: 0, lg: 10 }}
            spacing={10}
            columns={{ base: 1, xl: 2 }}
          >
            <Card {...cardStyle}>
              <Heading size={"md"}>Interests</Heading>
              <SimpleGrid
                columns={{ base: 2, xl: 1, "2xl": 2 }}
                mt={3}
                spacing={5}
              >
                {interests.map((interest) => (
                  <ProfileInterest
                    description={interest.description}
                    iconName={interest.icon}
                    key={interest.description}
                  />
                ))}
              </SimpleGrid>
            </Card>
            <Card {...cardStyle}>
              <Heading size={"md"}>Trending Artists</Heading>
              <SimpleGrid
                columns={{ base: 2, xl: 1, "2xl": 2 }}
                mt={3}
                spacing={5}
              >
                {spotifyArtists.map((artist) => (
                  <ProfileInterest
                    description={artist.name}
                    iconName={artist.iconUrl}
                    key={artist.iconUrl}
                  />
                ))}
              </SimpleGrid>
            </Card>
            {prompts.map((prompt) => (
              <Card {...cardStyle}>
                <Heading size={"md"}>{prompt.title}</Heading>
                <Text pt={3}>{prompt.description}</Text>
              </Card>
            ))}
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    </BaseAppPage>
  );
};
export default ProfilePage;
