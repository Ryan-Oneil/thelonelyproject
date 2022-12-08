import React from "react";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../components/ConversationList";
import ChatConversation from "../components/ChatConversation";
import BaseAppPage from "../../Base/BaseAppLayout";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const params = useParams();
  const activeConversationId = params.chatId;

  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList />
        {activeConversationId && <ChatConversation />}
      </Flex>
    </BaseAppPage>
  );
};
export default ChatPage;
