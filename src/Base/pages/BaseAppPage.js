import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

const BaseAppPage = ({ children }) => {
  return (
    <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
      <Sidebar />
      <Box maxH={"100vh"} w={"100%"} overflow={"auto"}>
        {children}
      </Box>
    </Flex>
  );
};
export default BaseAppPage;
