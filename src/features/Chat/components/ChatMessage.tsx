import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../../utils/hooks";
import { MessageType } from "../enums/MessageType";
import ImageModal from "./ImageModal";

type messageProps = {
  content: string;
  senderId?: string;
  type: MessageType;
  timestamp: string;
};

const ChatMessage = ({ content, senderId, type, timestamp }: messageProps) => {
  const { uid } = useAppSelector((state) => state.auth.user);
  const isSender = senderId === undefined || senderId === uid;

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

  const MessageContent = () => {
    if (type === MessageType.IMAGE) {
      return <ImageModal imageUrl={content} />;
    } else if (type === MessageType.VIDEO) {
      return <video src={content} muted controls height={200} />;
    }
    return <Text isTruncated>{content}</Text>;
  };

  return (
    <Box borderRadius={"xl"} p={2} {...styleProps}>
      <MessageContent />
      <Text>{new Date(timestamp).toUTCString()}</Text>
    </Box>
  );
};
export default ChatMessage;
