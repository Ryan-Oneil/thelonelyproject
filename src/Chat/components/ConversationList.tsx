import React from "react";
import {
  Box,
  Divider,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import AvatarHeader from "./AvatarHeader";
import { useAppSelector } from "../../utils/hooks";
import Conversation from "./Conversation";

const ConversationList = () => {
  const { ids } = useAppSelector((state) => state.chat.conversations);

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
        {ids.map((id) => (
          <Conversation id={id} key={id} />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
