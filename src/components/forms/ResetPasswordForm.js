import React from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const ResetPasswordForm = () => {
  return (
    <Stack spacing="6" mt={"5%"}>
      <FormControl id="email">
        <FormLabel>Enter your Email address</FormLabel>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          required
          size={"lg"}
          placeholder={"Email"}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Reset
      </Button>
    </Stack>
  );
};
export default ResetPasswordForm;
