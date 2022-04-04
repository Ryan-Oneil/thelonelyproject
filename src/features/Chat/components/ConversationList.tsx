import React, { useState } from "react";
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
import { useUserProfile } from "../../UserProfile/api/getUserProfile";
import { useAppSelector } from "../../../utils/hooks";

const ConversationList = () => {
  const userId = useAppSelector((state) => state.auth.user.uid);
  const { isLoading, data, isSuccess } = useConversations();
  const [filter, setFilter] = useState("");
  const profile = useUserProfile(userId);

  return (
    <Box borderRight={"1px solid rgba(0, 0, 0, 0.2)"}>
      <AvatarHeader
        name={profile.data?.name}
        heading={"Conversations"}
        padding={5}
        url={profile.data?.profilePictureUrl}
      />
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <VStack p={5} spacing={4}>
        <InputGroup>
          <InputLeftElement children={<SearchIcon />} />
          <Input
            variant="filled"
            placeholder="Search"
            onChange={(event) => setFilter(event.target.value)}
          />
        </InputGroup>
        {isLoading && <Spinner size="xl" />}
        {isSuccess &&
          data
            .filter((conversation: conversation) =>
              conversation.name.toLowerCase().includes(filter)
            )
            .map((conversation: conversation) => (
              <Conversation {...conversation} key={conversation.id} />
            ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
