import React, { useState } from "react";
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
import { sendMessage } from "../chatReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const ChatConversation = () => {
  const padding = 5;
  const borderColor = "rgba(0, 0, 0, 0.2)";
  const { uid } = useAppSelector((state) => state.auth.user);
  const { activeConversationId } = useAppSelector((state) => state.chat);
  const { messages, name, avatarUrl } = useAppSelector(
    (state) => state.chat.conversations.entities[activeConversationId]
  );
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();

  const sendMessageToActiveConversation = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(activeConversationId, message, uid));
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
        <AvatarHeader name={name} heading={name} padding={0} url={avatarUrl} />
        <Spacer />
        <ChatMenu />
      </Flex>
      <Divider style={{ borderColor }} />
      <VStack p={padding} h={"90%"} justifyContent={"end"}>
        {messages.map((id) => (
          <ChatMessage id={id} key={id} />
        ))}
        <HStack w={"100%"} pt={padding}>
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
      </VStack>
    </Box>
  );
};
export default ChatConversation;
