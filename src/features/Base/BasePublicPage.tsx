import React from "react";
import styles from "./BasePage.module.css";
import { Box, Button, Flex, Heading, HStack, Spacer } from "@chakra-ui/react";
import { AuthStage } from "../Auth/enums/AuthStages";
import { useAuth } from "../Auth/hooks/useAuth";
import Link from "next/link";
import { DASHBOARD_URL, HOMEPAGE_URL, LOGIN_URL } from "@/utils/urls";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Head from "next/head";
import LogoHeader from "@/features/Base/components/LogoHeader";

const BasePublicPage = ({
  children,
  showLogin,
}: {
  children: React.ReactNode;
  showLogin?: boolean;
}) => {
  const { authStatus } = useAuth();
  const isAuthenticated = authStatus === AuthStage.LOGGED_IN;

  return (
    <div className={styles.main}>
      <Head>
        <title>Lonely Project</title>
      </Head>
      <Flex flexWrap={"wrap"} as={"header"}>
        <Link href={HOMEPAGE_URL}>
          <LogoHeader style={{ cursor: "pointer" }} />
        </Link>
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
      <footer className={styles.footer}>
        © 2023 Lonely Project. All rights reserved
      </footer>
    </div>
  );
};
export default BasePublicPage;
