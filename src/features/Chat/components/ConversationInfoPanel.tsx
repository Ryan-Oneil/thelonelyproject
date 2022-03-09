import React from "react";
import {
  Box,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import SharedMedia from "./SharedMedia";

type props = {
  name: string;
  icon: string;
  onClose: Function;
};

const ConversationInfoPanel = ({ name, icon, onClose }: props) => {
  return (
    <Box>
      <Flex p={6}>
        <Heading fontSize={"xl"} m={"auto"}>
          Info
        </Heading>
        <Spacer />
        <CloseButton size="lg" m={"auto"} onClick={() => onClose()} />
      </Flex>
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <Image
        borderRadius="full"
        boxSize="200px"
        src={icon}
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
        {[].map((attachmentId) => (
          <SharedMedia id={attachmentId} key={attachmentId} />
        ))}
      </VStack>
    </Box>
  );
};
export default ConversationInfoPanel;
