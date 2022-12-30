import React from "react";
import {
  Box,
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import SharedMedia from "./SharedMedia";
import { useChatConversation } from "@/features/Chat/api/getMessages";

interface ConversationInfoPanelProps extends BoxProps {
  onClose: Function;
  activeConversationId: string;
}

const ConversationInfoPanel = ({
  onClose,
  activeConversationId,
  ...rest
}: ConversationInfoPanelProps) => {
  const borderStyle = "rgba(0, 0, 0, 0.2)";
  const { data, isLoading } = useChatConversation(activeConversationId);

  return (
    <Box {...rest}>
      <Flex p={6}>
        <Heading fontSize={"xl"} m={"auto"}>
          Info
        </Heading>
        <Spacer />
        <CloseButton size="lg" m={"auto"} onClick={() => onClose()} />
      </Flex>
      <Divider borderColor={borderStyle} />
      <Image
        borderRadius="full"
        boxSize="200px"
        src={data?.icon}
        fallbackSrc={
          "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'"
        }
        alt="User profile picture"
        my={4}
        mx={{ base: "auto", md: 20 }}
      />
      <Skeleton isLoaded={!isLoading}>
        <Heading fontSize={"2xl"} textAlign={"center"} pb={4}>
          {data?.name}
        </Heading>
      </Skeleton>
      <Divider borderColor={borderStyle} />
      <Box p={4}>
        <Text fontWeight={"bold"}>About</Text>
        <Skeleton isLoaded={!isLoading}>
          <Text>{data?.about}</Text>
        </Skeleton>
      </Box>

      <Divider borderColor={borderStyle} />
      <Text p={4} fontWeight={"bold"}>
        Shared Media
      </Text>
      <VStack px={6}>
        {[].map((attachmentId) => (
          <SharedMedia id={attachmentId} key={attachmentId} />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationInfoPanel;
