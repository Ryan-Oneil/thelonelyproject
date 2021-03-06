import React, { useEffect, useMemo, useRef } from "react";
import { Message } from "../type/message";
import { Box, VStack, Text } from "@chakra-ui/react";
import ChatMessage from "./ChatMessage";

const splitMessagesByDate = (messages: Message[]) => {
  const messagesByDate = messages.reduce((groups: any, message: Message) => {
    const date = message.timestamp.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);

    return groups;
  }, {});

  return Object.keys(messagesByDate).map((date) => {
    return {
      date,
      messages: messagesByDate[date],
    };
  });
};

const ChatMessageList = ({ messages }: { messages: Message[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //Scrolls to the bottom message
  useEffect(() => {
    messagesEndRef?.current?.scrollTo(0, messagesEndRef?.current?.scrollHeight);
  }, [messages]);

  const messagesByDate = useMemo(
    () =>
      splitMessagesByDate(messages).map((messageByDate) => {
        return (
          <>
            <Text
              borderRadius={"xl"}
              p={2}
              backgroundColor={"lightgrey"}
              key={messageByDate.date}
            >
              {messageByDate.date}
            </Text>
            {messageByDate.messages.map((activeMessage: Message) => (
              <ChatMessage key={activeMessage.timestamp} {...activeMessage} />
            ))}
          </>
        );
      }),
    [messages]
  );

  return (
    <Box h={"88vh"} overflow={"scroll"} ref={messagesEndRef}>
      <VStack p={5} justifyContent={"end"}>
        {messagesByDate}
      </VStack>
    </Box>
  );
};
export default ChatMessageList;
