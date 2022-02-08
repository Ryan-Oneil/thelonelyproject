import React from "react";
import BaseAppPage from "../../pages/BaseAppPage";
import styles from "../../pages/userprofile/Profilepage.module.css";
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
import ProfileInterest from "../../components/ProfileInterest";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { avatar, images, interests, aboutMe, prompts, spotifyArtists } =
    useSelector((state) => state.profile);

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
          />
          <Heading>John Doe</Heading>
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
      <Box className={styles.profileBanner}>
        <ProfileHeader />
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          w={"100%"}
          p={"5%"}
          pt={0}
          spacing={10}
        >
          <VStack pt={10} spacing={10}>
            <Card p={5} className={styles.profileCard}>
              <Heading size={"md"}>About me</Heading>
              <Text pt={3}>{aboutMe}</Text>
            </Card>
            <Card p={5} className={styles.profileCard}>
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
            <Card p={5} className={styles.profileCard}>
              <Heading size={"md"}>Interests</Heading>
              <SimpleGrid
                columns={{ base: 2, xl: 1, "2xl": 2 }}
                mt={3}
                spacing={5}
              >
                {interests.map((interest) => (
                  <ProfileInterest
                    description={interest.description}
                    icon={interest.icon}
                    key={interest.description}
                  />
                ))}
              </SimpleGrid>
            </Card>
            <Card p={5} className={styles.profileCard}>
              <Heading size={"md"}>Trending Artists</Heading>
              <SimpleGrid
                columns={{ base: 2, xl: 1, "2xl": 2 }}
                mt={3}
                spacing={5}
              >
                {spotifyArtists.map((artist) => (
                  <ProfileInterest
                    description={artist.name}
                    icon={artist.iconUrl}
                    key={artist.iconUrl}
                  />
                ))}
              </SimpleGrid>
            </Card>
            {prompts.map((prompt) => (
              <Card p={5} className={styles.profileCard}>
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
