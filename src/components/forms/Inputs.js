import React, { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

export const LabelledInput = (props) => {
  const { label, error, touched } = props;
  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel>{label}</FormLabel>
      <Input size="lg" {...props} />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FileInput = (props) => {
  const { error, touched, buttonText } = props;
  const ref = useRef();

  return (
    <FormControl isInvalid={error && touched}>
      <Button onClick={() => ref.current.click()}>{buttonText}</Button>
      <Input
        size="lg"
        {...props}
        type={"file"}
        ref={ref}
        display={"none"}
        value={""}
      />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextAreaInput = (props) => {
  const { error, touched, label } = props;
  const isInvalid = error && touched;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Textarea size="lg" {...props} isInvalid={isInvalid} />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
