import React from "react";
import { Box, Center, Flex, IconButton, Spacer, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useAppSelector } from "../../utils/hooks";
import { AttachmentType } from "../enums/AttachmentType";

const SharedMedia = ({ id }: { id: string }) => {
  const { name, type, size } = useAppSelector(
    (state) => state.chat.attachments.entities[id]
  );

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
          {name}
        </Text>
        <Text
          color={"rgba(0, 0, 0, 0.4)"}
          fontWeight={"bold"}
          style={{ wordSpacing: 10 }}
          isTruncated
        >
          {AttachmentType[type]} {size}
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
export default SharedMedia;
