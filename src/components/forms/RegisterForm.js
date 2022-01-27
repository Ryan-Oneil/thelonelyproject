import React from "react";
import { Alert, AlertIcon, Button, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { LabelledInput } from "./Inputs";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterForm = () => {
  const onSubmit = (formValues, { setStatus }) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(
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
    if (values.passwordConfirmed !== values.password) {
      errors.passwordConfirmed = "Passwords must match";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        passwordConfirmed: "",
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(props) => {
        const { isSubmitting, handleSubmit, isValid, errors, status, touched } =
          props;

        return (
          <form onSubmit={handleSubmit}>
            <VStack spacing={"5%"} mt={"10%"}>
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
              <Field
                name="passwordConfirmed"
                as={LabelledInput}
                type="password"
                label={"Confirm Password"}
                placeholder="Password"
                error={errors.passwordConfirmed}
                touched={touched.passwordConfirmed}
              />
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                w={"100%"}
                disabled={!isValid || isSubmitting}
              >
                Sign up
              </Button>
            </VStack>
            {status && (
              <Alert status="error" mt={"5%"}>
                <AlertIcon />
                {status}
              </Alert>
            )}
          </form>
        );
      }}
    </Formik>
  );
};
export default RegisterForm;
