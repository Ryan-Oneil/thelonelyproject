import React, { useState } from "react";
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
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { createUserProfile } from "../userProfileReducer";
import { BaseProfile } from "../types/Profile";
import { getAuth } from "firebase/auth";

const SetupProfileForm = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.uid);
  const [avatarUrl, setAvatarUrl] = useState(
    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light"
  );

  const onSubmit = (
    formValues: BaseProfile,
    { setStatus }: { setStatus: Function }
  ) => {
    return dispatch(createUserProfile(formValues, userId))
      .then(() => getAuth().currentUser?.getIdToken(true))
      .catch((error) => setStatus({ type: "error", message: error.message }));
  };

  const validate = (values: BaseProfile) => {
    let errors: FormikErrors<BaseProfile> = {};

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
        const {
          isSubmitting,
          handleSubmit,
          isValid,
          errors,
          status,
          touched,
          setFieldValue,
        } = props;

        return (
          <form onSubmit={handleSubmit}>
            <VStack spacing={"5%"} mt={"5%"}>
              <Image
                borderRadius="full"
                boxSize="200px"
                src={avatarUrl}
                alt="Profile picture"
              />
              <Center>
                <Field
                  as={FileInput}
                  buttonText={"Choose profile picture"}
                  error={errors.avatar}
                  touched={touched.avatar}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.currentTarget.files?.item(0);

                    if (file) {
                      let reader = new FileReader();

                      reader.onloadend = () => {
                        // @ts-ignore
                        setAvatarUrl(reader.result);
                      };
                      reader.readAsDataURL(file);
                      setFieldValue("avatar", file);
                    }
                  }}
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
