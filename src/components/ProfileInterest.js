import React from "react";
import { Box, Tag, TagLabel } from "@chakra-ui/react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileInterest = ({ description, icon }) => {
  return (
    <Tag size="lg" backgroundColor="rgba(97, 94, 240, 0.1)" borderRadius="full">
      <Box className="fa-layers fa-fw fa-2x" ml={-4}>
        <FontAwesomeIcon icon={faCircle} color="#D1D3F1" />
        <FontAwesomeIcon icon={["far", icon]} transform="shrink-8" />
      </Box>
      <TagLabel m={"auto"}>{description}</TagLabel>
    </Tag>
  );
};
export default ProfileInterest;
