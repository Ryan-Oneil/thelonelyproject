import React from "react";
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
import { useSelector } from "react-redux";

const ChatConversation = (props) => {
  const padding = 5;
  const borderFormat = "1px solid rgba(0, 0, 0, 0.2)";
  const { uid } = useSelector((state) => state.auth.user);
  const { messages } = useSelector((state) => state.chat);

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
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isSender={uid === message.senderUid}
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
            <Input placeholder="Type a message" />
            <InputRightElement>
              <IconButton
                icon={<ChatIcon />}
                variant="ghost"
                aria-label={"Send icon"}
              />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </VStack>
    </Box>
  );
};
export default ChatConversation;
