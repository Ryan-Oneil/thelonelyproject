import React from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import ConversationList from "@/features/Chat/components/ConversationList";
import ChatConversation from "@/features/Chat/components/ChatConversation";
import BaseAppLayout from "@/features/Base/BaseAppLayout";
import { useRouter } from "next/router";
import { useIsDesktop } from "@/features/Base/hooks/useIsDesktop";
import ConversationInfoPanel from "@/features/Chat/components/ConversationInfoPanel";

const Index = () => {
  const router = useRouter();
  const activeConversationId = (router.query.id as string) || "";
  const isDesktop = useIsDesktop();
  const showList = (!isDesktop && !activeConversationId) || isDesktop;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mobileStyle = isDesktop ? {} : { width: "100%", height: "100%" };
  const hideChatStyle = !isDesktop && isOpen ? "none" : "flex";

  return (
    <BaseAppLayout title={"Chat"}>
      <Flex h={"100%"}>
        {showList && (
          <ConversationList
            activeConversationId={activeConversationId}
            {...mobileStyle}
          />
        )}
        {activeConversationId && (
          <ChatConversation
            activeConversationId={activeConversationId}
            openConversationInfo={onOpen}
            display={hideChatStyle}
          />
        )}
        {isOpen && (
          <ConversationInfoPanel
            onClose={onClose}
            activeConversationId={activeConversationId}
            {...mobileStyle}
          />
        )}
      </Flex>
    </BaseAppLayout>
  );
};
export default Index;
