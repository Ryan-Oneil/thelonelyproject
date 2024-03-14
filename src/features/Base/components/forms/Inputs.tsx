import React, { useRef } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FieldAttributes } from "formik";

export const LabelledInput = (props: FieldAttributes<any>) => {
  const { label, error, touched, ...rest } = props;
  return (
    <FormControl isInvalid={error && touched}>
      <FormLabel>{label}</FormLabel>
      <Input size="lg" {...rest} />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const FileInput = (props: FieldAttributes<any>) => {
  const { error, touched, buttonText, ...rest } = props;
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <FormControl isInvalid={error && touched}>
      <Button onClick={() => ref.current?.click()}>{buttonText}</Button>
      <Input
        size="lg"
        {...rest}
        type={"file"}
        ref={ref}
        display={"none"}
        value={""}
      />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextAreaInput = (props: FieldAttributes<any>) => {
  const { error, touched, label, ...rest } = props;
  const isInvalid = error && touched;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      <Textarea size="lg" {...rest} isInvalid={isInvalid} />
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};
