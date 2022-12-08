import React from "react";
import styles from "./BasePage.module.css";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import { AuthStage } from "../Auth/enums/AuthStages";
import { useAuth } from "../Auth/hooks/useAuth";
import Link from "next/link";
import { DASHBOARD_URL, HOMEPAGE_URL, LOGIN_URL } from "@/utils/urls";

const BasePublicPage = ({
  children,
  showLogin,
}: {
  children: React.ReactNode;
  showLogin?: boolean;
}) => {
  const { status } = useAuth();
  const isAuthenticated = status === AuthStage.LOGGED_IN;

  return (
    <div className={styles.main}>
      <Flex flexWrap={"wrap"}>
        <Box p="4">
          <Link href={HOMEPAGE_URL}>
            <img
              src={require("../../../public/logo.png")}
              alt={"Lonely project logo"}
              className={styles.logoImage}
            />
          </Link>
        </Box>
        <Box p={"4"} className={styles.centerItems}>
          <Link href={HOMEPAGE_URL}>
            <Heading size="xl" className={styles.logo}>
              Lonely Project
            </Heading>
          </Link>
        </Box>
        <Spacer />
        {showLogin && (
          <Box p="4" className={styles.centerItems} m={"auto"}>
            <Link href={isAuthenticated ? DASHBOARD_URL : LOGIN_URL}>
              <Button
                size="lg"
                colorScheme={"#0089ED"}
                borderColor={"white"}
                border="2px"
                _hover={{ backgroundColor: "#0997ff" }}
              >
                {isAuthenticated ? "Dashboard" : "Log in"}
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
