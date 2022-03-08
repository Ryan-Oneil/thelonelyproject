import React, { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import ConversationList from "../components/ConversationList";
import ChatConversation from "../components/ChatConversation";
import ConversationInfoPanel from "../components/ConversationInfoPanel";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import BaseAppPage from "../../../Base/pages/BaseAppPage";
import { useStomp } from "../../../hooks/useStomp";
import { Conversation, sentMessage } from "../chatReducer";
import { IMessage } from "@stomp/stompjs";

const ChatPage = () => {
  const { activeConversationId } = useAppSelector((state) => state.chat);
  const userId = useAppSelector((state) => state.auth.user.uid);
  const client = useStomp();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!client.active) {
      client.configure({
        onConnect: () => {
          client.subscribe(`/user/${userId}/queue/messages`, onMessageReceived);
        },
      });
      client.activate();
    }
  }, []);

  const onMessageReceived = (msg: IMessage) => {
    const receivedMessage = JSON.parse(msg.body) as Conversation;

    dispatch(
      sentMessage({
        roomId: receivedMessage.id,
        message: receivedMessage.messages,
      })
    );
  };

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
