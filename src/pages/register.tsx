import React from "react";
import { Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { LOGIN_URL } from "@/utils/urls";
import AuthPage from "@/features/Auth/layout/AuthPage";
import RegisterForm from "@/features/Auth/components/RegisterForm";
import Link from "next/link";

const Register = () => {
  return (
    <AuthPage>
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
          <Link href={LOGIN_URL}>Sign in</Link>
        </Stack>
      </Flex>
      <RegisterForm />
    </AuthPage>
  );
};
export default Register;
