import React from "react";
import { Card } from "../../components/Card";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import AuthPage from "./AuthPage";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const ResetPasswordPage = () => {
  const ResetPasswordCard = () => {
    return (
      <Card rounded={"3xl"}>
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
      </Card>
    );
  };

  return (
    <AuthPage authForm={<ResetPasswordCard />} headerText={"Sign in to"} />
  );
};
export default ResetPasswordPage;
