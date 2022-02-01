import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../utils/hooks";
import { MessageType } from "../enums/MessageType";
import { AttachmentType } from "../enums/AttachmentType";
import ImageModal from "./ImageModal";

const ChatMessage = ({ id }: { id: string }) => {
  const { text, senderUid, type, attachmentId } = useAppSelector(
    (state) => state.chat.messages.entities[id]
  );
  const { uid } = useAppSelector((state) => state.auth.user);
  const attachment = useAppSelector(
    (state) => state.chat.attachments.entities[attachmentId]
  );
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

  const MessageContent = () => {
    if (
      type === MessageType.ATTACHMENT &&
      attachment.type === AttachmentType.IMAGE
    ) {
      return <ImageModal imageUrl={attachment.url} />;
    }
    return <Text isTruncated>{text}</Text>;
  };

  return (
    <Box borderRadius={"xl"} p={2} {...styleProps}>
      <MessageContent />
    </Box>
  );
};
export default ChatMessage;
