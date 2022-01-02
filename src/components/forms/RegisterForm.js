import React from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const RegisterForm = () => {
  return (
    <Stack spacing="6" mt={"10%"}>
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
      <FormControl id="password">
        <FormLabel>Enter your Password</FormLabel>
        <Input
          name="password"
          type="password"
          required
          size={"lg"}
          placeholder={"Password"}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Confirm your Password</FormLabel>
        <Input
          name="passwordConfirm"
          type="password"
          required
          size={"lg"}
          placeholder={"Confirm Password"}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Sign up
      </Button>
    </Stack>
  );
};
export default RegisterForm;
