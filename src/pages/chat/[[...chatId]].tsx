import React from "react";
import { Flex } from "@chakra-ui/react";
import ConversationList from "@/features/Chat/components/ConversationList";
import ChatConversation from "@/features/Chat/components/ChatConversation";
import BaseAppPage from "@/features/Base/BaseAppLayout";
import { useRouter } from "next/router";

const ChatId = () => {
  const router = useRouter();
  const activeConversationId = (router.query.chatId as string) || "";

  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList activeConversationId={activeConversationId} />
        {activeConversationId && (
          <ChatConversation activeConversationId={activeConversationId} />
        )}
      </Flex>
    </BaseAppPage>
  );
};
export default ChatId;
