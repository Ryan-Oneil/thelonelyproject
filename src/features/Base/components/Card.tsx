import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { BoxProps } from "@chakra-ui/react";

export const Card = (props: BoxProps) => (
  <Box bg={useColorModeValue("white", "gray.700")} shadow="2xl" {...props} />
);
