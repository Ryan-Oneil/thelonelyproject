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
import styles from "../BasePage.module.css";
import React, { useState } from "react";
import {
  CHAT_URL,
  HOMEPAGE_URL,
  PROFILE_FIND_MATCHES,
  USER_PROFILE_URL,
} from "@/utils/urls";
import {
  FaRegComment,
  FaRegComments,
  FaRegUserCircle,
  FaSearch,
} from "react-icons/fa";
import LogoutButton from "../../Auth/components/LogoutButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu } from "react-icons/all";

type NavItemProps = {
  url: string;
  icon: React.ReactNode;
  label: string;
  text: string;
};

export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const urls = [
    { url: USER_PROFILE_URL, icon: <FaRegUserCircle />, title: "Profile" },
    { url: PROFILE_FIND_MATCHES, icon: <FaSearch />, title: "Find Matches" },
    { url: CHAT_URL, icon: <FaRegComment />, title: "Chats" },
  ];

  const NavItem = ({ url, icon, text, label }: NavItemProps) => {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
      <Link href={url}>
        <HStack>
          <Tooltip label={label}>
            <IconButton
              variant="ghost"
              aria-label={label}
              fontSize="20px"
              icon={
                <Box
                  color={currentRoute === url ? "#2249B3" : "black"}
                  fontSize={"4xl"}
                >
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

  const NavMenu = ({ showTitle }: { showTitle?: boolean }) => {
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
        minHeight={"100vh"}
        boxShadow={"0px 0px 24px rgba(0, 0, 0, 0.08)"}
        display={{ base: "none", md: "block" }}
      >
        <Link href={HOMEPAGE_URL}>
          <div className={styles.logoBox}>
            <FaRegComments size={52} color={"white"} />
          </div>
        </Link>
        <NavMenu />
      </Box>
      <Box display={{ base: "block", md: "none" }} width={"100%"} p={5}>
        <IconButton
          fontSize={"4xl"}
          icon={<FiMenu />}
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
