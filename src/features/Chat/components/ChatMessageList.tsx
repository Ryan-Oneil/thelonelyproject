import React, { Fragment, useEffect, useMemo, useRef } from "react";
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
          <Fragment key={messageByDate.date}>
            <Text borderRadius={"xl"} p={2} backgroundColor={"lightgrey"}>
              {messageByDate.date}
            </Text>
            {messageByDate.messages.map((activeMessage: Message) => (
              <ChatMessage key={activeMessage.timestamp} {...activeMessage} />
            ))}
          </Fragment>
        );
      }),
    [messages]
  );

  return (
    <Box overflow={"scroll"} ref={messagesEndRef} w={"100%"} flex={1}>
      <VStack p={5} justifyContent={"end"}>
        {messagesByDate}
      </VStack>
    </Box>
  );
};
export default ChatMessageList;
