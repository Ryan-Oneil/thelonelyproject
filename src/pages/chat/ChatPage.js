import React from "react";
import BaseAppPage from "../BaseAppPage";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../../components/ConversationList";

const ChatPage = () => {
  return (
    <BaseAppPage>
      <Flex h={"100%"}>
        <ConversationList />
      </Flex>
    </BaseAppPage>
  );
};
export default ChatPage;
