import { Box, IconButton, VStack } from "@chakra-ui/react";
import styles from "../pages/BasePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faComments,
  faUserCircle,
} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { CHAT_URL, USER_PROFILE_URL } from "./urls";

export const Sidebar = () => {
  const urls = [
    { url: USER_PROFILE_URL, icon: faUserCircle },
    { url: CHAT_URL, icon: faComment },
  ];

  const NavItem = ({ url, icon }) => {
    let resolved = useResolvedPath(url);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
      <Link to={url}>
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
      </Link>
    );
  };

  return (
    <Box p={5} h={"100vh"} boxShadow={"0px 0px 24px rgba(0, 0, 0, 0.08)"}>
      <div className={styles.logoBox}>
        <FontAwesomeIcon
          icon={faComments}
          className={"fa-3x"}
          color={"white"}
        />
      </div>
      <VStack spacing={10} mt={20}>
        {urls.map((navItem) => (
          <NavItem url={navItem.url} icon={navItem.icon} key={navItem.url} />
        ))}
      </VStack>
    </Box>
  );
};
