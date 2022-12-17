import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import Head from "next/head";

type Props = {
  title: string;
  children: React.ReactNode;
};

const BaseAppLayout = ({ title, children }: Props) => {
  return (
    <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
      <Head>
        <title>{title} - Lonely Project</title>
      </Head>
      <Sidebar />
      <Box w={"100%"} maxH={"100vh"} overflow={"auto"}>
        {children}
      </Box>
    </Flex>
  );
};
export default BaseAppLayout;
