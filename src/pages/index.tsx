import React from "react";
import {
  Box,
  Circle,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FaAddressCard,
  FaPeopleArrows,
  FaSearch,
  FaSignInAlt,
} from "react-icons/fa";
import BasePublicPage from "@/features/Base/BasePublicPage";

const Index = () => {
  const GridStep = ({
    headerText,
    descriptionText,
    icon,
  }: {
    headerText: string;
    descriptionText: string;
    icon: JSX.Element;
  }) => {
    return (
      <Stack
        spacing={{ base: "3", md: "6" }}
        align={"center"}
        textAlign={"center"}
      >
        <Circle fontSize="5xl" bg={"#F4F5F7"} size={20}>
          {icon}
        </Circle>
        <Stack spacing="1">
          <Text fontWeight="extrabold" fontSize="lg">
            {headerText}
          </Text>
          <Text>{descriptionText}</Text>
        </Stack>
      </Stack>
    );
  };

  return (
    <BasePublicPage showLogin>
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
            fontSize={{ base: "4xl", sm: "1xl", md: "3xl", "2xl": "6xl" }}
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
        <Heading
          fontWeight={800}
          textAlign={"center"}
          margin={"3%"}
          fontSize={"2em"}
        >
          Four Simple Steps
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          spacingX="40"
          spacingY={{ base: "8", md: "14" }}
        >
          <GridStep
            headerText={"Sign up"}
            descriptionText={"Create an Account"}
            icon={<FaSignInAlt />}
          />
          <GridStep
            headerText={"Profile"}
            descriptionText={"Personalize your profile with your own touch"}
            icon={<FaAddressCard />}
          />
          <GridStep
            headerText={"Search"}
            descriptionText={"Search for like minded people"}
            icon={<FaSearch />}
          />
          <GridStep
            headerText={"Connect"}
            descriptionText={"Connect and get to know"}
            icon={<FaPeopleArrows />}
          />
        </SimpleGrid>
      </Box>
    </BasePublicPage>
  );
};
export default Index;
