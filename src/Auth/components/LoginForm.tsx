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
import { Link } from "react-router-dom";
import { RESET_PASSWORD_URL } from "../../utils/urls";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Field, Formik, FormikErrors } from "formik";
import { LabelledInput } from "../../Base/components/forms/Inputs";
import { User } from "../types/User";
import { FaGoogle, FaMicrosoft, FaTwitter } from "react-icons/fa";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
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
      setStatus(error.message);
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
          onClick={() => {
            const auth = getAuth();
            signInWithPopup(auth, provider);
          }}
        >
          Sign in with Google
        </Button>
        <Tooltip label={"Sign in with Microsoft"}>
          <IconButton
            icon={<FaMicrosoft />}
            aria-label={"Microsoft Logo"}
            size={"lg"}
          />
        </Tooltip>
        <Tooltip label={"Sign in with Twitter"}>
          <IconButton
            color="#00acee"
            icon={<FaTwitter />}
            aria-label={"Twitter logo"}
            size={"lg"}
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
                <Alert status="error" mt={"5%"}>
                  <AlertIcon />
                  {status}
                </Alert>
              )}
              <Stack mt={"5%"}>
                <Link
                  to={RESET_PASSWORD_URL}
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
