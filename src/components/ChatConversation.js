import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon, InfoOutlineIcon } from "@chakra-ui/icons";

const ChatConversation = (props) => {
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
          <MenuItem icon={<InfoOutlineIcon />}>View Info</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <Box borderRight={"1px solid rgba(0, 0, 0, 0.2)"} {...props}>
      <Flex>
        <Avatar name={"Ryan L"} />
        <Heading>Ryan</Heading>
        <Spacer />
        <ChatMenu />
      </Flex>
    </Box>
  );
};
export default ChatConversation;
