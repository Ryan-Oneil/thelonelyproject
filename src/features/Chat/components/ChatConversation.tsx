import React, { useEffect, useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarHeader from "./AvatarHeader";
import { useStomp } from "@/hooks/useStomp";
import { useMessages } from "../api/getMessages";
import ConversationInfoPanel from "./ConversationInfoPanel";
import { IMessage } from "@stomp/stompjs";
import { conversation } from "../type/conversation";
import { Message } from "../type/message";
import FileUploader from "../../UserProfile/components/FileUploader";
import { useSendAttachment } from "../api/sendMedia";
import { AxiosError } from "axios";
import ApiError from "../../Auth/components/ApiError";
import { FaRegSmile } from "react-icons/fa";
import ChatMessageList from "./ChatMessageList";
import { useRequireUser } from "@/features/Auth/hooks/useRequireUser";
import { FiInfo, FiMenu } from "react-icons/fi";
import emojiData from "@emoji-mart/data";
// @ts-ignore
import Picker from "@emoji-mart/react";
import { ImAttachment } from "react-icons/im";
import { RxChatBubble } from "react-icons/rx";

type ChatConversationProps = {
  activeConversationId: string;
};
const ChatConversation = ({ activeConversationId }: ChatConversationProps) => {
  const padding = 5;
  const borderColor = "rgba(0, 0, 0, 0.2)";
  const userId = useRequireUser().uid;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([] as Message[]);
  const stompClient = useStomp();
  const { data, isLoading, isSuccess, isError, error } =
    useMessages(activeConversationId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sendAttachment = useSendAttachment();

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
      { content: message, timestamp: new Date().toISOString() },
    ]);
    setMessage("");
  };

  const ChatMenu = () => {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FiMenu />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<FiInfo />} onClick={onOpen}>
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
        <ChatMessageList messages={messages} />
        <HStack w={"100%"} px={padding}>
          <Popover isLazy>
            <PopoverTrigger>
              <IconButton
                icon={<FaRegSmile />}
                variant="ghost"
                aria-label={"emojis"}
                sx={{ ":hover > svg": { transform: "scale(1.1)" } }}
                size={"lg"}
              />
            </PopoverTrigger>
            <PopoverContent>
              <Picker
                data={emojiData}
                showPreview={false}
                showSkinTones={false}
                native={true}
                style={{ width: "inherit" }}
                onSelect={(emoji: any) =>
                  setMessage((prevState) => prevState + emoji.native)
                }
              />
            </PopoverContent>
          </Popover>

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
              icon={<ImAttachment />}
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
                icon={<RxChatBubble />}
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
          about={data.about}
        />
      )}
    </>
  );
};
export default ChatConversation;
