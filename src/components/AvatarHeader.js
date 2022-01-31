import React from "react";
import { Avatar, Heading, HStack } from "@chakra-ui/react";

const AvatarHeader = ({ avatarUrl, avatarName, heading, ...rest }) => {
  return (
    <HStack spacing={4} {...rest}>
      <Avatar name={avatarName} src={avatarUrl} />
      <Heading fontSize={"xl"} m={"auto"} isTruncated>
        {heading}
      </Heading>
    </HStack>
  );
};
export default AvatarHeader;
