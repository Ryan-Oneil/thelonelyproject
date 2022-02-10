import React from "react";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Image,
  VStack,
} from "@chakra-ui/react";
import { Field, Formik, FormikErrors } from "formik";
import {
  FileInput,
  LabelledInput,
  TextAreaInput,
} from "../../components/forms/Inputs";
import { useAppDispatch } from "../../utils/hooks";
import { profileCompleted } from "../userProfileReducer";

interface ProfileValues {
  name: string;
  about: string;
  avatar?: File;
}

const SetupProfileForm = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (
    formValues: ProfileValues,
    { setStatus }: { setStatus: Function }
  ) => {
    dispatch(
      profileCompleted({
        name: formValues.name,
        about: formValues.about,
        avatar: "",
      })
    );
  };

  const validate = (values: ProfileValues) => {
    let errors: FormikErrors<ProfileValues> = {};

    if (!values.name) {
      errors.name = "Please enter a name";
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        about: "",
        avatar: undefined,
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
              <Image
                borderRadius="full"
                boxSize="200px"
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light"
                alt="Profile picture"
              />
              <Center>
                <Field
                  name="avatar"
                  as={FileInput}
                  buttonText={"Choose profile picture"}
                  error={errors.avatar}
                  touched={touched.avatar}
                />
              </Center>
              <Field
                name="name"
                as={LabelledInput}
                type="text"
                label={"Enter your profile name"}
                placeholder="Name"
                required
                error={errors.name}
                touched={touched.name}
              />
              <Field
                name="about"
                as={TextAreaInput}
                label={"About me"}
                placeholder="Tell us a little about yourself"
                error={errors.about}
                touched={touched.about}
              />
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                w={"100%"}
                disabled={!isValid || isSubmitting}
              >
                Submit
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
export default SetupProfileForm;
