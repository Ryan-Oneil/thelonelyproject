import React from "react";
import { Flex, Heading, Spacer, Stack, Text } from "@chakra-ui/react";
import { REGISTER_URL } from "@/utils/urls";
import LoginForm from "@/features/Auth/components/LoginForm";
import AuthPage from "@/features/Auth/layout/AuthPage";
import Link from "next/link";

const Login = () => {
  return (
    <AuthPage>
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
          <Link href={REGISTER_URL}>Register</Link>
        </Stack>
      </Flex>
      <LoginForm />
    </AuthPage>
  );
};
export default Login;
