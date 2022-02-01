import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { changedActiveConversation } from "../chatReducer";

const Conversation = ({ id }: { id: string }) => {
  const { name, avatarUrl, lastMessage } = useAppSelector(
    (state) => state.chat.conversations.entities[id]
  );
  const { activeConversationId } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const isActive = id === activeConversationId;
  const backgroundColor = "rgba(97, 94, 240, 0.06)";

  return (
    <Box
      w={"100%"}
      _hover={{ backgroundColor, cursor: "pointer" }}
      backgroundColor={isActive ? backgroundColor : ""}
      borderRadius={"xl"}
      padding={2}
      onClick={() => dispatch(changedActiveConversation(id))}
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
export default Conversation;
