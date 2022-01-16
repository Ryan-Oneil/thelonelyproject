import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
