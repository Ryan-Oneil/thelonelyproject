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
} from "@chakra-ui/react";
import styles from "../pages/BasePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CHAT_URL, USER_PROFILE_URL } from "../utils/urls";
import { HamburgerIcon } from "@chakra-ui/icons";

export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const urls = [
    { url: USER_PROFILE_URL, icon: faUserCircle, title: "Profile" },
    { url: CHAT_URL, icon: faComment, title: "Chats" },
  ];

  const NavItem = ({ url, icon, text }) => {
    let resolved = useResolvedPath(url);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <Link to={url}>
        <HStack>
          <IconButton
            variant="outline"
            aria-label={icon}
            fontSize="20px"
            icon={
              <FontAwesomeIcon
                icon={icon}
                color={match ? "#2249B3" : "black"}
                className={"fa-2x"}
              />
            }
          />
          {text && <Text>{text}</Text>}
        </HStack>
      </Link>
    );
  };

  const NavMenu = ({ showTitle }) => {
    return (
      <VStack spacing={10} mt={20}>
        {urls.map((navItem) => (
          <NavItem
            url={navItem.url}
            icon={navItem.icon}
            key={navItem.url}
            text={showTitle ? navItem.title : ""}
          />
        ))}
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
        <div className={styles.logoBox}>
          <FontAwesomeIcon
            icon={faComments}
            className={"fa-3x"}
            color={"white"}
          />
        </div>
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
