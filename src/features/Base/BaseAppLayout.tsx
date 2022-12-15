import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";

const BaseAppPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
      <Sidebar />
      <Box w={"100%"} maxH={"100vh"} overflow={"auto"}>
        {children}
      </Box>
    </Flex>
  );
};
export default BaseAppPage;
