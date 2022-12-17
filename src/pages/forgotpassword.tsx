import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import AuthPage from "@/features/Auth/layout/AuthPage";
import ResetPasswordForm from "@/features/Auth/components/ResetPasswordForm";

const Forgotpassword = () => {
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
export default Forgotpassword;
