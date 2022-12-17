import React from "react";
import { Box, Link, Text } from "@chakra-ui/react";
import ImageModal from "./ImageModal";
import { getMediaType, isValidUrl } from "@/utils/helpers";
import { useAuth } from "@/features/Auth/hooks/useAuth";

type messageProps = {
  content: string;
  senderId?: string;
  timestamp: string;
};

const ChatMessage = ({ content, senderId, timestamp }: messageProps) => {
  const { user } = useAuth();
  const isSender = senderId === undefined || senderId === user.uid;
  const date = new Date(timestamp);

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
    const isUrl = isValidUrl(content);

    if (isUrl && getMediaType(content) === "img") {
      return <ImageModal src={content} />;
    } else if (isUrl && getMediaType(content) === "video") {
      return <video src={content} muted controls width={200} />;
    } else if (isUrl) {
      return (
        <Link href={content} isExternal>
          {content}
        </Link>
      );
    }
    return <Text noOfLines={6}>{content}</Text>;
  };

  return (
    <Box borderRadius={"xl"} p={2} {...styleProps}>
      <MessageContent />
      <Text pl={2} textAlign={"right"}>{`${date.getHours()}:${
        date.getMinutes() < 10 ? "0" : ""
      }${date.getMinutes()}`}</Text>
    </Box>
  );
};
export default ChatMessage;
