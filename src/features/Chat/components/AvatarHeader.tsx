import React from "react";
import { Avatar, Heading, HStack } from "@chakra-ui/react";

type AvatarProps = {
  url: string;
  name: string;
  heading: string;
  padding: number;
};

const AvatarHeader = ({ url, name, heading, padding }: AvatarProps) => {
  return (
    <HStack spacing={4} padding={padding}>
      <Avatar name={name} src={url} />
      <Heading fontSize={"xl"} m={"auto"} noOfLines={1}>
        {heading}
      </Heading>
    </HStack>
  );
};
export default AvatarHeader;
