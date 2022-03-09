import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import AuthPage from "./AuthPage";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <AuthPage>
      <Flex direction={"row"}>
        <Stack spacing={4}>
          <Heading fontSize={"xl"} fontWeight={"medium"}>
            Welcome to Lonely Project
          </Heading>
          <Heading fontSize={"5xl"} fontWeight={"bold"}>
            Reset Password
          </Heading>
        </Stack>
      </Flex>
      <ResetPasswordForm />
    </AuthPage>
  );
};
export default ResetPasswordPage;
