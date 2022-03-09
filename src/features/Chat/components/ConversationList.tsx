import React, { useEffect } from "react";
import {
  Box,
  Divider,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AvatarHeader from "./AvatarHeader";
import { useConversations } from "../api/getConversations";
import { conversation } from "../type/conversation";
import Conversation from "./Conversation";

const ConversationList = () => {
  const conversationsQuery = useConversations();

  if (conversationsQuery.isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box borderRight={"1px solid rgba(0, 0, 0, 0.2)"}>
      <AvatarHeader
        name={"Ryan L"}
        heading={"Conversations"}
        padding={5}
        url={""}
      />
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <VStack p={5} spacing={4}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
        {conversationsQuery.data.map((conversation: conversation) => (
          <Conversation {...conversation} />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
