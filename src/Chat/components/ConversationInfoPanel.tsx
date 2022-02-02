import React from "react";
import { Box, Divider, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useAppSelector } from "../../utils/hooks";
import SharedMedia from "./SharedMedia";

const ConversationInfoPanel = () => {
  const { activeConversationId } = useAppSelector((state) => state.chat);
  const { name, avatarUrl, attachments } = useAppSelector(
    (state) => state.chat.conversations.entities[activeConversationId]
  );

  return (
    <Box>
      <Heading fontSize={"xl"} m={"auto"} p={8}>
        Info
      </Heading>
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <Image
        borderRadius="full"
        boxSize="200px"
        src={avatarUrl}
        fallbackSrc={
          "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'"
        }
        alt="User profile picture"
        my={4}
        mx={20}
      />
      <Heading fontSize={"2xl"} textAlign={"center"} pb={4}>
        {name}
      </Heading>
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <Text p={4} fontWeight={"bold"}>
        Shared Media
      </Text>
      <VStack px={6}>
        {attachments.map((attachmentId) => (
          <SharedMedia id={attachmentId} key={attachmentId} />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationInfoPanel;
