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
import {
  AttachmentIcon,
  ChatIcon,
  HamburgerIcon,
  InfoOutlineIcon,
} from "@chakra-ui/icons";
import AvatarHeader from "./AvatarHeader";
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
import { Picker, BaseEmoji } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { FaRegSmile } from "react-icons/fa";
import ChatMessageList from "./ChatMessageList";

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
                showPreview={false}
                showSkinTones={false}
                native={true}
                style={{ width: "inherit" }}
                onSelect={(emoji: BaseEmoji) =>
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
          about={data.about}
        />
      )}
    </>
  );
};
export default ChatConversation;
