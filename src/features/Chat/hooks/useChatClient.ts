import { useAuth } from "@/features/Auth/hooks/useAuth";
import { useEffect, useState } from "react";
import { Message } from "@/features/Chat/type/message";
import { useStomp } from "@/hooks/useStomp";
import { useChatConversation } from "@/features/Chat/api/getMessages";
import { IMessage } from "@stomp/stompjs";
import { conversation } from "@/features/Chat/type/conversation";

type ChatClientProps = {
  activeConversationId: string;
};
export const useChatClient = ({ activeConversationId }: ChatClientProps) => {
  const userId = useAuth().user.uid;
  const [messages, setMessages] = useState([] as Message[]);
  const stompClient = useStomp();
  const { data, isLoading, isSuccess, isError, error } =
    useChatConversation(activeConversationId);

  useEffect(() => {
    if (isSuccess) {
      setMessages(data.messages);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (!stompClient.active) {
      stompClient.configure({
        onConnect: () => {
          stompClient.subscribe(
            `/user/${userId}/queue/messages`,
            onMessageReceived
          );
        },
      });
      stompClient.activate();
    }
  }, [stompClient]);

  const onMessageReceived = (msg: IMessage) => {
    const receivedMessage = JSON.parse(msg.body) as conversation;

    if (receivedMessage.id === activeConversationId) {
      setMessages((prevState) => [...prevState, ...receivedMessage.messages]);
    }
  };

  const sendMessageToActiveConversation = (message: string) => {
    if (!message || !message.trim()) {
      return;
    }
    stompClient.publish({
      destination: `/app/chat/${activeConversationId}`,
      body: JSON.stringify({ content: message }),
    });

    setMessages((prevState) => [
      ...prevState,
      {
        id: "",
        content: message,
        timestamp: new Date().toISOString(),
        senderId: userId,
        attachmentId: "",
      },
    ]);
  };

  return {
    sendMessageToActiveConversation,
    messages,
    isLoading,
    isError,
    error,
    chatDetails: data,
  };
};
