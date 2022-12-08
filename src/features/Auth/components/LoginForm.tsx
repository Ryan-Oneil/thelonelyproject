import React from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RESET_PASSWORD_URL } from "@/utils/urls";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  OAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { Field, Formik, FormikErrors } from "formik";
import { LabelledInput } from "@/features/Base/components/forms/Inputs";
import { User } from "../types/User";
import { FaGoogle, FaMicrosoft, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const provider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider("microsoft.com");
microsoftProvider.setCustomParameters({
  tenant: "88685b40-800d-4d57-9b38-8438ec0f6e3d",
});
const twitterProvider = new TwitterAuthProvider();

const LoginForm = () => {
  const auth = getAuth();

  const onSubmit = (
    formValues: User,
    { setStatus }: { setStatus: Function }
  ) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(
      auth,
      formValues.email.trim(),
      formValues.password.trim()
    ).catch((error) => {
      const message = error.code || error.message;
      setStatus(message.replace("auth/", "").replaceAll("-", " "));
    });
  };

  const validate = (values: User) => {
    let errors: FormikErrors<User> = {};

    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <Stack spacing="6">
      <Flex mt="10" justifyContent={"space-between"}>
        <Button
          color="#4285F4"
          w={"70%"}
          bg={"#E9F1FF"}
          leftIcon={<FaGoogle />}
          size={"lg"}
          onClick={() => signInWithPopup(auth, provider)}
        >
          Sign in with Google
        </Button>
        <Tooltip label={"Sign in with Microsoft"}>
          <IconButton
            icon={<FaMicrosoft />}
            aria-label={"Microsoft Logo"}
            size={"lg"}
            onClick={() => signInWithPopup(auth, microsoftProvider)}
          />
        </Tooltip>
        <Tooltip label={"Sign in with Twitter"}>
          <IconButton
            color="#00acee"
            icon={<FaTwitter />}
            aria-label={"Twitter logo"}
            size={"lg"}
            onClick={() => signInWithPopup(auth, twitterProvider)}
          />
        </Tooltip>
      </Flex>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {(props) => {
          const {
            isSubmitting,
            handleSubmit,
            isValid,
            errors,
            status,
            touched,
          } = props;

          return (
            <form onSubmit={handleSubmit}>
              <VStack spacing={"5%"}>
                <Field
                  name="email"
                  as={LabelledInput}
                  type="email"
                  label={"Enter your Email address"}
                  placeholder="Email"
                  error={errors.email}
                  autoComplete="email"
                  touched={touched.email}
                />
                <Field
                  name="password"
                  as={LabelledInput}
                  type="password"
                  label={"Enter your Password"}
                  placeholder="Password"
                  error={errors.password}
                  touched={touched.password}
                />
              </VStack>
              {status && (
                <Alert status="error" mt={"5%"} textTransform={"capitalize"}>
                  <AlertIcon />
                  {status}
                </Alert>
              )}
              <Stack mt={"5%"}>
                <Link
                  href={RESET_PASSWORD_URL}
                  style={{ textAlign: "end", color: "#4285F4" }}
                >
                  Forgot Password?
                </Link>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  disabled={!isValid || isSubmitting}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          );
        }}
      </Formik>
    </Stack>
  );
};
export default LoginForm;
