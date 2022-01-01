import React from "react";
import styles from "./BasePage.module.css";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../components/urls";

const BasePublicPage = ({ children, showLogin }) => {
  return (
    <div className={styles.main}>
      <Flex flexWrap={"wrap"}>
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
        {showLogin && (
          <Box p="4" className={styles.centerItems} m={"auto"}>
            <Link to={LOGIN_URL}>
              <Button
                size="lg"
                colorScheme={"#0089ED"}
                borderColor={"white"}
                border="2px"
                _hover={{ backgroundColor: "#0997ff" }}
              >
                Log in
              </Button>
            </Link>
          </Box>
        )}
      </Flex>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        © 2021 Lonely Project. All rights reserved
      </div>
    </div>
  );
};
export default BasePublicPage;
