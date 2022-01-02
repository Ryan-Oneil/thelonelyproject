import React from "react";
import { Card } from "../../components/Card";
import { Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "../../components/urls";
import AuthPage from "./AuthPage";
import RegisterForm from "../../components/forms/RegisterForm.js";

const RegisterPage = () => {
  const RegisterCard = () => {
    return (
      <Card rounded={"3xl"}>
        <Flex direction={"row"}>
          <Stack spacing={4}>
            <Heading fontSize={"xl"} fontWeight={"medium"}>
              Welcome to Lonely Project
            </Heading>
            <Heading fontSize={"5xl"} fontWeight={"bold"}>
              Sign Up
            </Heading>
          </Stack>
          <Spacer />
          <Stack color={"#0089ED"}>
            <Text fontSize={"md"} fontWeight={"medium"} color={"#8D8D8D"}>
              Have an Account ?
            </Text>
            <Link to={LOGIN_URL}>Sign in</Link>
          </Stack>
        </Flex>
        <RegisterForm />
      </Card>
    );
  };

  return <AuthPage authForm={<RegisterCard />} headerText={"Sign up to"} />;
};
export default RegisterPage;
