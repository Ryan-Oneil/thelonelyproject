import React from "react";
import { Alert, AlertIcon, Button, VStack } from "@chakra-ui/react";
import { Field, Formik } from "formik";
import { LabelledInput } from "./Inputs";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const ResetPasswordForm = () => {
  const onSubmit = (formValues, { setStatus }) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, formValues.email.trim())
      .then(() =>
        setStatus({
          type: "success",
          message: "Password reset email has been sent",
        })
      )
      .catch((error) => {
        setStatus({ type: "error", message: error.message });
      });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {(props) => {
        const { isSubmitting, handleSubmit, isValid, errors, status, touched } =
          props;

        return (
          <form onSubmit={handleSubmit}>
            <VStack spacing={"5%"} mt={"5%"}>
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
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                w={"100%"}
                disabled={!isValid || isSubmitting}
              >
                Reset
              </Button>
            </VStack>
            {status && (
              <Alert status={status.type} mt={"5%"}>
                <AlertIcon />
                {status.message}
              </Alert>
            )}
          </form>
        );
      }}
    </Formik>
  );
};
export default ResetPasswordForm;
