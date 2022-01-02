import React from "react";
import { Card } from "../../components/Card";
import { Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { REGISTER_URL } from "../../components/urls";
import LoginForm from "../../components/forms/LoginForm";
import AuthPage from "./AuthPage";

const Login = () => {
  const LoginCard = () => {
    return (
      <Card rounded={"3xl"}>
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
    );
  };

  return <AuthPage authForm={<LoginCard />} headerText={"Sign in to"} />;
};
export default Login;
