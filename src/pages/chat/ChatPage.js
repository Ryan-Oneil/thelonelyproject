import React from "react";
import BaseAppPage from "../BaseAppPage";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../../components/ConversationList";
import ChatConversation from "../../components/ChatConversation";
import ConversationInfoPanel from "../../components/ConversationInfoPanel";

const ChatPage = () => {
  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList />
        <ChatConversation flex={1} />
        <ConversationInfoPanel />
      </Flex>
    </BaseAppPage>
  );
};
export default ChatPage;
