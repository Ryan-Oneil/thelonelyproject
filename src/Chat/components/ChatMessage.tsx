import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../utils/hooks";

const ChatMessage = ({ id }: { id: string }) => {
  const { text, senderUid } = useAppSelector(
    (state) => state.chat.messages.entities[id]
  );
  const { uid } = useAppSelector((state) => state.auth.user);
  const isSender = senderUid === uid;

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
      <Text isTruncated>{text}</Text>
    </Box>
  );
};
export default ChatMessage;
