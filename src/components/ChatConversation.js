import React, { useState } from "react";
import {
  Box,
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
import { useDispatch, useSelector } from "react-redux";
import { messageSent } from "../reducers/chatReducer";

const ChatConversation = (props) => {
  const padding = 5;
  const borderFormat = "1px solid rgba(0, 0, 0, 0.2)";
  const { uid } = useSelector((state) => state.auth.user);
  const { messages } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (!message) {
      return;
    }
    dispatch(messageSent({ text: message, senderUid: uid }));
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
    <Box borderRight={borderFormat} {...props}>
      <Flex p={padding} borderBottom={borderFormat}>
        <AvatarHeader avatarName={"Ryan L"} heading={"Ryan L"} />
        <Spacer />
        <ChatMenu />
      </Flex>
      <VStack p={padding} h={"90%"} justifyContent={"end"}>
        {messages.map((chatMessage) => (
          <ChatMessage
            key={chatMessage.id}
            message={chatMessage.text}
            isSender={uid === chatMessage.senderUid}
          />
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
                  sendMessage();
                }
              }}
            />
            <InputRightElement>
              <IconButton
                icon={<ChatIcon />}
                variant="ghost"
                aria-label={"Send icon"}
                onClick={sendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </VStack>
    </Box>
  );
};
export default ChatConversation;
