import React from "react";
import { Box, Text } from "@chakra-ui/react";

const ChatMessage = ({ message, isSender }) => {
  const styleProps = isSender
    ? {
        backgroundColor: "#2249B3",
        color: "white",
        ml: "auto",
        marginInlineStart: "auto!important",
      }
    : {
        backgroundColor: "#F1F1F1",
        color: "black",
        mr: "auto",
        marginInlineEnd: "auto!important",
      };

  return (
    <Box borderRadius={"xl"} p={2} {...styleProps}>
      <Text isTruncated>{message}</Text>
    </Box>
  );
};
export default ChatMessage;
