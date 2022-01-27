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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faMicrosoft,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { RESET_PASSWORD_URL } from "../../constants/urls";
import formStyles from "./Forms.module.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Field, Formik } from "formik";
import { LabelledInput } from "./Inputs";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const onSubmit = (formValues, { setStatus }) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(
      auth,
      formValues.email.trim(),
      formValues.password.trim()
    ).catch((error) => {
      setStatus(error.message);
    });
  };

  const validate = (values) => {
    const errors = {};

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
                  className={formStyles.resetPasswordLink}
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
