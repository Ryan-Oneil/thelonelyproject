import React from "react";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../components/ConversationList";
import ChatConversation from "../components/ChatConversation";
import ConversationInfoPanel from "../components/ConversationInfoPanel";
import { useAppSelector } from "../../utils/hooks";
import BaseAppPage from "../../Base/pages/BaseAppPage";

const ChatPage = () => {
  const { activeConversationId } = useAppSelector((state) => state.chat);

  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList />
        {activeConversationId && <ChatConversation />}
        {activeConversationId && <ConversationInfoPanel />}
      </Flex>
    </BaseAppPage>
  );
};
export default ChatPage;
