import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { conversation } from "../type/conversation";
import { Link, useParams } from "react-router-dom";
import { CHAT_URL } from "../../../utils/urls";

const ConversationContact = ({ id, name, messages, icon }: conversation) => {
  const params = useParams();
  const activeChat = params.chatId;
  const backgroundColor = "rgba(97, 94, 240, 0.06)";
  const isActive = activeChat === id;

  return (
    <Box
      w={"100%"}
      _hover={{ backgroundColor, cursor: "pointer" }}
      backgroundColor={isActive ? backgroundColor : ""}
      borderRadius={"xl"}
      padding={2}
    >
      <Link to={`${CHAT_URL}/${id}`}>
        <Flex>
          <Avatar name={name} src={icon} />
          <Box ml={3}>
            <Text fontWeight={"bold"} isTruncated>
              {name}
            </Text>
            <Text isTruncated>
              {messages[messages.length - 1]
                ? messages[messages.length - 1].content
                : "Say Hi!"}
            </Text>
          </Box>
        </Flex>
      </Link>
    </Box>
  );
};
export default ConversationContact;
