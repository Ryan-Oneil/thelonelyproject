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
import AvatarHeader from "./AvatarHeader";
import { useConversations } from "../api/getConversations";
import { conversation } from "../type/conversation";
import ConversationContact from "./ConversationContact";
import { useUserProfile } from "../../UserProfile/api/getUserProfile";
import {useRequireUser} from "@/features/Auth/hooks/useRequireUser";
import {MdSearch} from "react-icons/md";

const ConversationList = () => {
  const userId = useRequireUser().uid;
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
          <InputLeftElement>
              <MdSearch />
          </InputLeftElement>
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
              <ConversationContact {...conversation} key={conversation.id} />
            ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
