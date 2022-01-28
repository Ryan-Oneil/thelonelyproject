import React from "react";
import {
  Box,
  Divider,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const ConversationList = () => {
  return (
    <Box borderRight={"1px solid rgba(0, 0, 0,0.2)"}>
      <Heading
        fontSize={"xl"}
        p={5}
        // borderBottom={"1px solid rgba(0, 0, 0,0.2)"}
      >
        Conversations
      </Heading>
      <Divider style={{ borderColor: "rgba(0, 0, 0,0.2)" }} />
      <HStack p={5}>
        <InputGroup>
          <InputLeftElement pointer={"none"} children={<SearchIcon />} />
          <Input variant="filled" placeholder="Search" />
        </InputGroup>
      </HStack>
    </Box>
  );
};
export default ConversationList;
