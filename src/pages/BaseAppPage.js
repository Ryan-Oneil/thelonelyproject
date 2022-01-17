import React from "react";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

const BaseAppPage = ({ children }) => {
  return (
    <Flex>
      <Sidebar />
      {children}
    </Flex>
  );
};
export default BaseAppPage;
