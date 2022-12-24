import React, { useState } from "react";
import {
  Box,
  Divider,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  BoxProps,
} from "@chakra-ui/react";
import AvatarHeader from "./AvatarHeader";
import { useConversations } from "../api/getConversations";
import { conversation } from "../type/conversation";
import ConversationContact from "./ConversationContact";
import { useUserProfile } from "../../UserProfile/api/getUserProfile";
import { MdSearch } from "react-icons/md";
import { useAuth } from "@/features/Auth/hooks/useAuth";

interface ConversationListProps extends BoxProps {
  activeConversationId: string;
}
const ConversationList = ({
  activeConversationId,
  ...rest
}: ConversationListProps) => {
  const { user } = useAuth();
  const { isLoading, data, isSuccess } = useConversations();
  const [filter, setFilter] = useState("");
  const profile = useUserProfile(user.uid);

  return (
    <Box borderRight={"1px solid rgba(0, 0, 0, 0.2)"} {...rest}>
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
              <ConversationContact
                {...conversation}
                key={conversation.id}
                isChatOpen={conversation.id === activeConversationId}
              />
            ))}
      </VStack>
    </Box>
  );
};
export default ConversationList;
