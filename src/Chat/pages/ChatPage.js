import React from "react";
import BaseAppPage from "../../pages/BaseAppPage";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../components/ConversationList";
import ChatConversation from "../components/ChatConversation";
import ConversationInfoPanel from "../components/ConversationInfoPanel";
import { useAppSelector } from "../../utils/hooks";

const ChatPage = () => {
  const { activeConversationId } = useAppSelector((state) => state.chat);

  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList />
        {activeConversationId && <ChatConversation />}
        <ConversationInfoPanel />
      </Flex>
    </BaseAppPage>
  );
};
export default ChatPage;
