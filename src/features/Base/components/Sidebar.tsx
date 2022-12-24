import {
  Box,
  IconButton,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  Tooltip,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import styles from "../BasePage.module.css";
import React, { useState } from "react";
import {
  CHAT_URL,
  HOMEPAGE_URL,
  PROFILE_FIND_MATCHES,
  USER_PROFILE_URL,
} from "@/utils/urls";
import { FaRegComment, FaRegComments, FaRegUserCircle } from "react-icons/fa";
import LogoutButton from "../../Auth/components/LogoutButton";
import { useRouter } from "next/router";
import Link from "next/link";
import { FiMenu, FiSearch } from "react-icons/fi";
import { useIsDesktop } from "@/features/Base/hooks/useIsDesktop";

type NavItemProps = {
  url: string;
  icon: JSX.Element;
  label: string;
  text: string;
};

const NavItem = ({ url, icon, text, label }: NavItemProps) => {
  const router = useRouter();
  const currentRoute = router.pathname;
  const color = currentRoute === url ? "#2249B3" : "black";

  return (
    <Link href={url}>
      <HStack>
        {!text && (
          <Tooltip label={label}>
            <IconButton
              variant="ghost"
              aria-label={label}
              fontSize="20px"
              icon={
                <Box color={color} fontSize={"4xl"}>
                  {icon}
                </Box>
              }
            />
          </Tooltip>
        )}
        {text && (
          <Button
            variant="ghost"
            aria-label={label}
            fontSize="20px"
            leftIcon={icon}
          >
            {text}
          </Button>
        )}
      </HStack>
    </Link>
  );
};
export const Sidebar = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const isDesktop = useIsDesktop();
  const urls = [
    { url: USER_PROFILE_URL, icon: <FaRegUserCircle />, title: "Profile" },
    { url: PROFILE_FIND_MATCHES, icon: <FiSearch />, title: "Find Matches" },
    { url: CHAT_URL, icon: <FaRegComment />, title: "Chats" },
  ];

  const NavMenu = () => {
    return (
      <VStack
        p={5}
        minHeight={"100vh"}
        boxShadow={"0px 0px 24px rgba(0, 0, 0, 0.08)"}
        spacing={10}
      >
        <Link href={HOMEPAGE_URL}>
          <section className={styles.logoBox}>
            <FaRegComments size={52} color={"white"} />
          </section>
        </Link>
        {urls.map((navItem) => (
          <NavItem
            url={navItem.url}
            icon={navItem.icon}
            key={navItem.url}
            text={!isDesktop ? navItem.title : ""}
            label={navItem.title}
          />
        ))}
        <Box mt={"auto!important"}>
          <LogoutButton />
        </Box>
      </VStack>
    );
  };

  return (
    <>
      {isDesktop && <NavMenu />}
      {!isDesktop && (
        <Box p={5} position={"absolute"} zIndex={1}>
          <IconButton
            fontSize={"4xl"}
            icon={<FiMenu />}
            variant="outline"
            onClick={() => setShowDrawer(true)}
            aria-label={"Menu label"}
            bg={"white"}
          />
        </Box>
      )}
      {showDrawer && !isDesktop && (
        <Drawer
          isOpen={showDrawer}
          placement="left"
          onClose={() => setShowDrawer(false)}
        >
          <DrawerOverlay>
            <DrawerContent maxW={"fit-content"}>
              <DrawerCloseButton />
              <NavMenu />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </>
  );
};
