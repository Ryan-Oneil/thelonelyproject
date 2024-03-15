import React, { useEffect } from "react";
import {
  Container,
  Flex,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import loginImage from "@/public/headphone.png";
import peopleImage from "@/public/people.png";
import BasePublicPage from "@/features/Base/BasePublicPage";
import { Card } from "@/features/Base/components/Card";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { AuthStage } from "@/features/Auth/enums/AuthStages";
import { useRouter } from "next/router";
import { DASHBOARD_URL, PROFILE_SETUP_URL } from "@/utils/urls";
import { RegisterStatus } from "@/features/Auth/enums/RegisterStatus";

const AuthPage = ({ children }: { children: React.ReactNode }) => {
  const { authStatus, registerStatus } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authStatus !== AuthStage.LOGGED_IN) {
      return;
    }

    if (registerStatus === RegisterStatus.REGISTERED) {
      router.push(DASHBOARD_URL);
    } else {
      router.push(PROFILE_SETUP_URL);
    }
  }, [authStatus]);

  return (
    <BasePublicPage>
      <Container
        as={SimpleGrid}
        maxW={"9xl"}
        columns={{ base: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
        spacing={{ base: 4, xl: 32 }}
        py={10}
        mt={"5%"}
        justifyItems={"center"}
      >
        <GridItem>
          <Stack color={"white"} direction={"row"} align={"center"} spacing={0}>
            <Container m={"5%"} mr={0} w={"auto"}>
              <Text
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "5xl" }}
                fontWeight={"bold"}
              >
                Sign in to
              </Text>
              <Text fontSize={{ base: "2xl", sm: "2xl", md: "2xl", lg: "3xl" }}>
                The Lonely Project
              </Text>
              <Text mt={"5%"}>
                Let’s get you connected with similarly minded people
              </Text>
            </Container>
            <Flex>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                src={loginImage}
                placeholder={"blur"}
              />
            </Flex>
          </Stack>
        </GridItem>
        <GridItem rowSpan={2} w={{ sm: "md", md: "xl", lg: "2xl", xl: "xl" }}>
          <Card rounded={"3xl"} p={10}>
            {children}
          </Card>
        </GridItem>
        <GridItem>
          <Image
            src={peopleImage}
            alt={"Person sitting at computer"}
            placeholder={"blur"}
          />
        </GridItem>
      </Container>
    </BasePublicPage>
  );
};
export default AuthPage;
