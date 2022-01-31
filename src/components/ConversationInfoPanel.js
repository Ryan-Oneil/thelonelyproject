import React from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";

const ConversationInfoPanel = () => {
  const SharedMedia = () => {
    return (
      <Flex w={"100%"} alignItems={"center"} justifyContent={"space-between"}>
        <Center
          bg="green.100"
          color={"green.500"}
          w={"60px"}
          h={"60px"}
          borderRadius={"xl"}
        >
          <FontAwesomeIcon icon={faFileImage} className={"fa-2x"} />
        </Center>
        <Box ml={6}>
          <Text fontWeight={"bold"} isTruncated>
            Image.png
          </Text>
          <Text
            color={"rgba(0, 0, 0, 0.4)"}
            fontWeight={"bold"}
            style={{ wordSpacing: 10 }}
            isTruncated
          >
            PNG 2MB
          </Text>
        </Box>
        <Spacer />
        <IconButton
          bg="rgba(97, 94, 240, 0.1)"
          aria-label="Download Media"
          icon={<DownloadIcon />}
          borderRadius={"full"}
          size={"lg"}
          color={"#2249B3"}
        />
      </Flex>
    );
  };

  return (
    <Box>
      <Heading fontSize={"xl"} m={"auto"} p={8}>
        Info
      </Heading>
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <Image
        borderRadius="full"
        boxSize="200px"
        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Wayfarers&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light'"
        alt="User profile picture"
        my={4}
        mx={20}
      />
      <Heading fontSize={"2xl"} textAlign={"center"} pb={4}>
        Ryan L
      </Heading>
      <Divider style={{ borderColor: "rgba(0, 0, 0, 0.2)" }} />
      <Text p={4} fontWeight={"bold"}>
        Shared Media
      </Text>
      <VStack px={6}>
        <SharedMedia />
      </VStack>
    </Box>
  );
};
export default ConversationInfoPanel;
