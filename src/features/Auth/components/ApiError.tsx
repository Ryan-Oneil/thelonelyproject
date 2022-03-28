import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { getApiError } from "../../../apis/api";
import { AxiosError } from "axios";

const ApiError = ({ error }: { error: AxiosError }) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      m={"auto"}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        An error occurred
      </AlertTitle>
      <AlertDescription maxWidth="sm">{getApiError(error)}</AlertDescription>
    </Alert>
  );
};
export default ApiError;
