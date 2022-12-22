import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { conversation } from "../type/conversation";
import { CHAT_URL } from "@/utils/urls";
import Link from "next/link";

interface ConversationContactProps extends conversation {
  isChatOpen?: boolean;
}
const ConversationContact = ({
  id,
  name,
  messages,
  icon,
  isChatOpen,
}: ConversationContactProps) => {
  const backgroundColor = "rgba(97, 94, 240, 0.06)";

  return (
    <Box
      w={"100%"}
      _hover={{ backgroundColor, cursor: "pointer" }}
      backgroundColor={isChatOpen ? backgroundColor : ""}
      borderRadius={"xl"}
      padding={2}
    >
      <Link href={`${CHAT_URL}?id=${id}`}>
        <Flex>
          <Avatar name={name} src={icon} />
          <Box ml={3}>
            <Text fontWeight={"bold"} noOfLines={1}>
              {name}
            </Text>
            <Text noOfLines={2}>
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
