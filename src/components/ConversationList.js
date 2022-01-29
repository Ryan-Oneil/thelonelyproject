import React from "react";
import {
  Box,
  Divider,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Avatar,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import AvatarHeader from "./AvatarHeader";

const ConversationList = () => {
  const { conversations } = useSelector((state) => state.chat);

  const Contact = ({ name, lastMessage, active, avatarUrl }) => {
    const backgroundColor = "rgba(97, 94, 240, 0.06)";
    return (
      <Box
        w={"100%"}
        _hover={{ backgroundColor, cursor: "pointer" }}
        backgroundColor={active ? backgroundColor : ""}
        borderRadius={"xl"}
        padding={2}
      >
        <Flex>
          <Avatar name={name} src={avatarUrl} />
          <Box ml={3}>
            <Text fontWeight={"bold"} isTruncated>
              {name}
            </Text>
            <Text isTruncated>{lastMessage}</Text>
          </Box>
        </Flex>
      </Box>
    );
  };

  return (
    <Box borderRight={"1px solid rgba(0, 0, 0, 0.2)"}>
      <AvatarHeader avatarName={"Ryan L"} heading={"Conversations"} p={5} />
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <VStack p={5} spacing={4}>
        <InputGroup>
          <InputLeftElement pointer={"none"} children={<SearchIcon />} />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
        {conversations.map((conversation) => (
          <Contact
            name={conversation.name}
            lastMessage={conversation.lastMessage}
            avatarUrl={conversation.avatarUrl}
            key={conversation.name}
          />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
