import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  AttachmentIcon,
  ChatIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import AvatarHeader from "./AvatarHeader";
import ChatMessage from "./ChatMessage";
import { useStomp } from "../../../hooks/useStomp";
import { useParams } from "react-router-dom";
import { useMessages } from "../api/getMessages";
import ConversationInfoPanel from "./ConversationInfoPanel";
import { useAppSelector } from "../../../utils/hooks";
import { IMessage } from "@stomp/stompjs";
import { conversation } from "../type/conversation";
import { Message } from "../type/message";
import FileUploader from "../../UserProfile/components/FileUploader";
import { useSendAttachment } from "../api/sendMedia";
import { AxiosError } from "axios";
import ApiError from "../../Auth/components/ApiError";

const ChatConversation = () => {
  const padding = 5;
  const borderColor = "rgba(0, 0, 0, 0.2)";
  const params = useParams();
  const activeConversationId = params.chatId as string;
  const userId = useAppSelector((state) => state.auth.user.uid);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const stompClient = useStomp();
  const { data, isLoading, isSuccess, isError, error } =
    useMessages(activeConversationId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sendAttachment = useSendAttachment();

  useEffect(() => {
    if (isSuccess) {
      setMessages(data.messages);
    }
  }, [data, isSuccess]);

  //Scrolls to the bottom message
  useEffect(() => {
    messagesEndRef?.current?.scrollTo(0, messagesEndRef?.current?.scrollHeight);
  }, [messages]);

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
  }, []);

  const onMessageReceived = (msg: IMessage) => {
    const receivedMessage = JSON.parse(msg.body) as conversation;

    if (receivedMessage.id === activeConversationId) {
      setMessages((prevState) => [...prevState, ...receivedMessage.messages]);
    }
  };

  const sendMessageToActiveConversation = () => {
    if (!message || !message.trim()) {
      return;
    }
    stompClient.publish({
      destination: `/app/chat/${activeConversationId}`,
      body: JSON.stringify({ content: message }),
    });
    // @ts-ignore
    setMessages((prevState) => [
      ...prevState,
      { content: message, timestamp: new Date() },
    ]);
    setMessage("");
  };

  const ChatMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<InfoOutlineIcon />} onClick={onOpen}>
            View Info
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (isError) {
    return <ApiError error={error as AxiosError} />;
  }

  return (
    <>
      <Box borderRight={"1px solid"} flexGrow={1} borderColor={borderColor}>
        <Flex p={padding}>
          <AvatarHeader
            name={data.name}
            heading={data.name}
            padding={0}
            url={data.icon}
          />
          <Spacer />
          <ChatMenu />
        </Flex>
        <Divider style={{ borderColor }} />
        <Box h={"88vh"} overflow={"scroll"} ref={messagesEndRef}>
          <VStack p={padding} justifyContent={"end"}>
            {messages.map((activeMessage: Message) => (
              <ChatMessage key={activeMessage.timestamp} {...activeMessage} />
            ))}
          </VStack>
        </Box>
        <HStack w={"100%"} px={padding}>
          <FileUploader
            uploadAction={(file: File) =>
              sendAttachment.mutate({
                chatId: activeConversationId,
                attachment: file,
              })
            }
            accept={"*"}
          >
            <IconButton
              icon={<AttachmentIcon />}
              variant="ghost"
              aria-label={"Attachment button"}
              sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
              size={"lg"}
            />
          </FileUploader>
          <InputGroup size={"lg"}>
            <Input
              placeholder="Type a message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessageToActiveConversation();
                }
              }}
            />
            <InputRightElement>
              <IconButton
                icon={<ChatIcon />}
                variant="ghost"
                aria-label={"Send icon"}
                onClick={sendMessageToActiveConversation}
              />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </Box>
      {isOpen && (
        <ConversationInfoPanel
          name={data.name}
          icon={data.icon}
          onClose={onClose}
        />
      )}
    </>
  );
};
export default ChatConversation;
