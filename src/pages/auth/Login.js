import React from "react";
import BasePublicPage from "../BasePublicPage";
import { Card } from "../../components/Card";
import {
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { REGISTER_URL } from "../../components/urls";
import LoginForm from "../../components/forms/LoginForm";

const Login = () => {
  return (
    <BasePublicPage>
      <Container
        as={SimpleGrid}
        maxW={"9xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={10}
      >
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
              src={require("../../assets/media/headphone.png")}
            />
          </Flex>
        </Stack>
        <Card maxW="lg" rounded={"3xl"}>
          <Flex direction={"row"}>
            <Stack spacing={4}>
              <Heading fontSize={"xl"} fontWeight={"medium"}>
                Welcome to Lonely Project
              </Heading>
              <Heading fontSize={"5xl"} fontWeight={"bold"}>
                Sign in
              </Heading>
            </Stack>
            <Spacer />
            <Stack color={"#0089ED"}>
              <Text fontSize={"md"} fontWeight={"medium"} color={"#8D8D8D"}>
                No Account ?
              </Text>
              <Link to={REGISTER_URL}>Register</Link>
            </Stack>
          </Flex>
          <LoginForm />
        </Card>
      </Container>
      <img src={require("../../assets/media/people.png")} />
    </BasePublicPage>
  );
};
export default Login;
