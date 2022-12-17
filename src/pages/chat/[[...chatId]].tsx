import React from "react";
import { Flex } from "@chakra-ui/react";
import ConversationList from "@/features/Chat/components/ConversationList";
import ChatConversation from "@/features/Chat/components/ChatConversation";
import BaseAppLayout from "@/features/Base/BaseAppLayout";
import { useRouter } from "next/router";

const ChatId = () => {
  const router = useRouter();
  const activeConversationId = (router.query.chatId as string) || "";

  return (
    <BaseAppLayout title={"Chat"}>
      <Flex h={"100%"}>
        <ConversationList activeConversationId={activeConversationId} />
        {activeConversationId && (
          <ChatConversation activeConversationId={activeConversationId} />
        )}
      </Flex>
    </BaseAppLayout>
  );
};
export default ChatId;
