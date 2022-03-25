import {
  Box,
  IconButton,
  VStack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import styles from "../pages/BasePage.module.css";
import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import {
  CHAT_URL,
  HOMEPAGE_URL,
  PROFILE_FIND_MATCHES,
  USER_PROFILE_URL,
} from "../../utils/urls";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { FaRegComment, FaRegComments, FaRegUserCircle } from "react-icons/fa";
import LogoutButton from "../../features/Auth/components/LogoutButton";

export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const urls = [
    { url: USER_PROFILE_URL, icon: <FaRegUserCircle />, title: "Profile" },
    { url: PROFILE_FIND_MATCHES, icon: <SearchIcon />, title: "Find Matches" },
    { url: CHAT_URL, icon: <FaRegComment />, title: "Chats" },
  ];

  const NavItem = ({ url, icon, text, label }) => {
    let resolved = useResolvedPath(url);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <Link to={url}>
        <HStack>
          <Tooltip label={label}>
            <IconButton
              variant="ghost"
              aria-label={icon}
              fontSize="20px"
              icon={
                <Box color={match ? "#2249B3" : "black"} fontSize={"4xl"}>
                  {icon}
                </Box>
              }
            />
          </Tooltip>
          {text && <Text>{text}</Text>}
        </HStack>
      </Link>
    );
  };

  const NavMenu = ({ showTitle }) => {
    return (
      <VStack spacing={10} mt={20} h={"100%"}>
        {urls.map((navItem) => (
          <NavItem
            url={navItem.url}
            icon={navItem.icon}
            key={navItem.url}
            text={showTitle ? navItem.title : ""}
            label={navItem.title}
          />
        ))}
        <Box mt={"auto!important"} mb={"150px!important"}>
          <LogoutButton />
        </Box>
      </VStack>
    );
  };

  return (
    <>
      <Box
        p={5}
        h={"100vh"}
        boxShadow={"0px 0px 24px rgba(0, 0, 0, 0.08)"}
        display={{ base: "none", md: "block" }}
      >
        <Link to={HOMEPAGE_URL}>
          <div className={styles.logoBox}>
            <FaRegComments size={52} color={"white"} />
          </div>
        </Link>
        <NavMenu />
      </Box>
      <Box display={{ base: "block", md: "none" }} width={"100%"} p={5}>
        <IconButton
          icon={<HamburgerIcon w={8} h={8} />}
          variant="outline"
          onClick={() => setShowDrawer(true)}
          aria-label={"Menu label"}
        />
      </Box>
      {showDrawer && (
        <Drawer
          isOpen={showDrawer}
          placement="left"
          onClose={() => setShowDrawer(false)}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <NavMenu showTitle />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};
