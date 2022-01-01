import React from "react";
import styles from "./Homepage.module.css";
import { Box, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faCircle,
  faAddressCard,
  faSearch,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";
import BasePublicPage from "./BasePublicPage";

const Homepage = () => {
  const GridStep = ({ headerText, descriptionText, icon }) => {
    return (
      <Stack
        spacing={{ base: "3", md: "6" }}
        align={"center"}
        textAlign={"center"}
      >
        <Box fontSize="4xl">
          <span className="fa-layers fa-fw fa-2x">
            <FontAwesomeIcon icon={faCircle} color="#F4F5F7" />
            <FontAwesomeIcon icon={icon} transform="shrink-8" />
          </span>
        </Box>
        <Stack spacing="1">
          <Text fontWeight="extrabold" fontSize="lg">
            {headerText}
          </Text>
          <Text>{descriptionText}</Text>
        </Stack>
      </Stack>
    );
  };

  const HeaderContent = () => {
    return (
      <Box as="section">
        <Box
          maxW="4xl"
          mx="auto"
          px={{ base: "6", lg: "8" }}
          py={{ base: "16", sm: "20" }}
          textAlign="center"
          color={"white"}
        >
          <Heading size="xl" fontWeight="bold" letterSpacing="tight">
            THE LONELY PROJECT
          </Heading>
          <Text mt="8" fontSize="6xl" fontWeight="extrabold">
            A new platform designed to help you get connected with like minded
            people
          </Text>
        </Box>
      </Box>
    );
  };

  const MainBodyContent = () => {
    return (
      <>
        <Box
          as="section"
          maxW="8xl"
          mx="auto"
          py="12"
          px={{ base: "6", md: "8" }}
        >
          <h1 className={styles.stepsHeader}>Four Simple Steps</h1>
          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 4 }}
            spacingX="40"
            spacingY={{ base: "8", md: "14" }}
          >
            <GridStep
              headerText={"Sign up"}
              descriptionText={"Create an Account"}
              icon={faSignInAlt}
            />
            <GridStep
              headerText={"Profile"}
              descriptionText={"Personalize your profile with your own touch"}
              icon={faAddressCard}
            />
            <GridStep
              headerText={"Search"}
              descriptionText={"Search for like minded people"}
              icon={faSearch}
            />
            <GridStep
              headerText={"Connect"}
              descriptionText={"Connect and get to know"}
              icon={faPeopleArrows}
            />
          </SimpleGrid>
        </Box>
      </>
    );
  };
  return (
    <BasePublicPage
      mainBody={<HeaderContent />}
      contentBody={<MainBodyContent />}
      showLogin
    >
      <Box as="section" bg={"#0089ED"}>
        <Box
          maxW="4xl"
          mx="auto"
          px={{ base: "6", lg: "8" }}
          py={{ base: "16", sm: "20" }}
          textAlign="center"
          color={"white"}
        >
          <Heading size="xl" fontWeight="bold" letterSpacing="tight">
            THE LONELY PROJECT
          </Heading>
          <Text
            mt="8"
            fontSize={{ base: "4xl", sm: "1xl", md: "5xl", lg: "6xl" }}
            fontWeight="extrabold"
          >
            A new platform designed to help you get connected with like minded
            people
          </Text>
        </Box>
      </Box>
      <Box
        as="section"
        maxW="8xl"
        mx="auto"
        py="12"
        px={{ base: "6", md: "8" }}
        backgroundColor={"white"}
      >
        <h1 className={styles.stepsHeader}>Four Simple Steps</h1>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          spacingX="40"
          spacingY={{ base: "8", md: "14" }}
        >
          <GridStep
            headerText={"Sign up"}
            descriptionText={"Create an Account"}
            icon={faSignInAlt}
          />
          <GridStep
            headerText={"Profile"}
            descriptionText={"Personalize your profile with your own touch"}
            icon={faAddressCard}
          />
          <GridStep
            headerText={"Search"}
            descriptionText={"Search for like minded people"}
            icon={faSearch}
          />
          <GridStep
            headerText={"Connect"}
            descriptionText={"Connect and get to know"}
            icon={faPeopleArrows}
          />
        </SimpleGrid>
      </Box>
    </BasePublicPage>
  );
};
export default Homepage;
