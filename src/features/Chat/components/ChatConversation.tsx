import React, { useState } from "react";
import {
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
  Skeleton,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import AvatarHeader from "./AvatarHeader";
import FileUploader from "../../UserProfile/components/FileUploader";
import { useSendAttachment } from "../api/sendMedia";
import { AxiosError } from "axios";
import ApiError from "../../Auth/components/ApiError";
import ChatMessageList from "./ChatMessageList";
import { FiInfo, FiMenu } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { RxChatBubble } from "react-icons/rx";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CHAT_URL } from "@/utils/urls";
import { useChatClient } from "@/features/Chat/hooks/useChatClient";
import { MdClose } from "react-icons/md";
import { StackProps } from "@chakra-ui/layout";

interface ChatConversationProps extends StackProps {
  activeConversationId: string;
  openConversationInfo: () => void;
}

const DynamicEmojiPicker = dynamic(() => import("./EmojiPicker"), {
  loading: () => <Spinner />,
});
const ChatConversation = ({
  activeConversationId,
  openConversationInfo,
  ...rest
}: ChatConversationProps) => {
  const padding = 5;
  const borderColor = "rgba(0, 0, 0, 0.2)";
  const {
    sendMessageToActiveConversation,
    messages,
    chatDetails,
    isLoading,
    isError,
    error,
  } = useChatClient({ activeConversationId });
  const [message, setMessage] = useState("");
  const sendAttachment = useSendAttachment();
  const router = useRouter();

  const sendMessage = () => {
    sendMessageToActiveConversation(message);
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
          <MenuItem icon={<FiInfo />} onClick={openConversationInfo}>
            View Info
          </MenuItem>
          <MenuItem
            icon={<MdClose color={"red"} />}
            onClick={() => router.push(CHAT_URL)}
          >
            Close Chat
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  if (isError) {
    return <ApiError error={error as AxiosError} />;
  }

  return (
    <VStack
      borderRight={"1px solid"}
      flexGrow={1}
      borderColor={borderColor}
      spacing={0}
      alignItems={"stretch"}
      {...rest}
    >
      <Flex p={padding}>
        <Skeleton isLoaded={!isLoading}>
          <AvatarHeader
            name={chatDetails?.name}
            heading={chatDetails?.name}
            padding={0}
            url={chatDetails?.icon}
          />
        </Skeleton>
        <Spacer />
        <ChatMenu />
      </Flex>
      <Divider style={{ borderColor }} />
      <ChatMessageList messages={messages} />
      <HStack py={2} px={padding}>
        <DynamicEmojiPicker
          onEmojiSelected={(emoji: any) =>
            setMessage((prevState) => prevState + emoji.native)
          }
        />

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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <InputRightElement>
            <IconButton
              icon={<RxChatBubble />}
              variant="ghost"
              aria-label={"Send icon"}
              onClick={sendMessage}
            />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </VStack>
  );
};
export default ChatConversation;
