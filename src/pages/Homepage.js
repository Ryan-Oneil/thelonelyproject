import React from "react";
import styles from "./Homepage.module.css";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faCircle,
  faAddressCard,
  faSearch,
  faPeopleArrows,
} from "@fortawesome/free-solid-svg-icons";

const Homepage = () => {
  const GridStep = ({ headerText, descriptionText, icon }) => {
    return (
      <GridItem w="100%" className={styles.centerItems}>
        <div className={styles.step}>
          <span className="fa-layers fa-fw fa-5x">
            <FontAwesomeIcon icon={faCircle} color="#F4F5F7" />
            <FontAwesomeIcon icon={icon} transform="shrink-8" />
          </span>
          <h1>{headerText}</h1>
          <p>{descriptionText}</p>
        </div>
      </GridItem>
    );
  };

  return (
    <div>
      <div className={styles.top}>
        <Flex>
          <Box p="4">
            <img
              src={require("../assets/media/logo.png")}
              alt={"Lonely project logo"}
              className={styles.logoImage}
            />
          </Box>
          <Box p={"4"} className={styles.centerItems}>
            <Heading size="xl" className={styles.logo}>
              Lonely Project
            </Heading>
          </Box>
          <Spacer />
          <Box p="4">
            <Button
              size="lg"
              colorScheme={"#0089ED"}
              borderColor={"white"}
              border="2px"
              _hover={{ backgroundColor: "#0997ff" }}
            >
              Log in
            </Button>
          </Box>
        </Flex>
        <Container maxW="xl" centerContent>
          <Box padding="4" maxW="3xl" color={"white"}>
            <h1 className={styles.titleFormat}>THE LONELY PROJECT</h1>
            <p className={styles.descriptionFormat}>
              A new platform designed to help you get connected with like minded
              people
            </p>
          </Box>
        </Container>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.stepsHeader}>Four Simple Steps</h1>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
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
        </Grid>
      </div>
      <div className={styles.footer}>
        © 2021 Lonely Project. All rights reserved
      </div>
    </div>
  );
};
export default Homepage;
