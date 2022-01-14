import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faMicrosoft,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { RESET_PASSWORD_URL } from "../urls";
import formStyles from "./Forms.module.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  return (
    <Stack spacing="6">
      <Flex mt="10" columns={3} spa="3" justifyContent={"space-between"}>
        <Button
          color="#4285F4"
          w={"70%"}
          bg={"#E9F1FF"}
          leftIcon={<FontAwesomeIcon icon={faGoogle} />}
          size={"lg"}
          onClick={() => {
            const auth = getAuth();
            signInWithPopup(auth, provider);
          }}
        >
          Sign in with Google
        </Button>
        <Tooltip label={"Sign in with Microsoft"}>
          <IconButton
            icon={<FontAwesomeIcon icon={faMicrosoft} />}
            aria-label={"Microsoft Logo"}
            size={"lg"}
          />
        </Tooltip>
        <Tooltip label={"Sign in with Twitter"}>
          <IconButton
            color="#00acee"
            icon={<FontAwesomeIcon icon={faTwitter} />}
            aria-label={"Twitter logo"}
            size={"lg"}
          />
        </Tooltip>
      </Flex>
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
      <Link to={RESET_PASSWORD_URL} className={formStyles.resetPasswordLink}>
        Forgot Password?
      </Link>
      <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
        Sign in
      </Button>
    </Stack>
  );
};
export default LoginForm;
