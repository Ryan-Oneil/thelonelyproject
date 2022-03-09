import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  AttachmentIcon,
  ChatIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import AvatarHeader from "./AvatarHeader";
import ChatMessage from "./ChatMessage";
import { fetchChatMessages, Message } from "../chatReducer";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { useStomp } from "../../../hooks/useStomp";
import { MessageType } from "../enums/MessageType";
import { useParams } from "react-router-dom";

const ChatConversation = () => {
  const padding = 5;
  const borderColor = "rgba(0, 0, 0, 0.2)";
  const params = useParams();
  const activeConversationId = params.chatId as string;
  const { messages, name, icon } = useAppSelector(
    (state) => state.chat.conversations.entities[activeConversationId]
  );
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const stompClient = useStomp();

  useEffect(() => {
    dispatch(fetchChatMessages(activeConversationId));
  }, []);

  const sendMessageToActiveConversation = () => {
    if (!message || !message.trim()) {
      return;
    }
    stompClient.publish({
      destination: `/app/chat/${activeConversationId}`,
      body: JSON.stringify({ content: message }),
    });
    setMessage("");
  };

  const ChatMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<InfoOutlineIcon />}>View Info</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box borderRight={"1px solid"} flexGrow={1} borderColor={borderColor}>
      <Flex p={padding}>
        <AvatarHeader name={name} heading={name} padding={0} url={icon} />
        <Spacer />
        <ChatMenu />
      </Flex>
      <Divider style={{ borderColor }} />
      <Box h={"88%"} overflow={"scroll"}>
        <VStack p={padding} justifyContent={"end"}>
          {messages.map((activeMessage: Message) => (
            <ChatMessage
              key={activeMessage.timestamp}
              {...activeMessage}
              type={MessageType.TEXT}
            />
          ))}
        </VStack>
      </Box>
      <HStack w={"100%"} px={padding}>
        <IconButton
          icon={<AttachmentIcon />}
          variant="ghost"
          aria-label={"Attachment button"}
          size={"lg"}
        />
        <InputGroup size={"lg"}>
          <Input
            placeholder="Type a message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                sendMessageToActiveConversation();
              }
            }}
          />
          <InputRightElement>
            <IconButton
              icon={<ChatIcon />}
              variant="ghost"
              aria-label={"Send icon"}
              onClick={sendMessageToActiveConversation}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </Box>
  );
};
export default ChatConversation;
