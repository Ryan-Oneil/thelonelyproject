import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "./components/Sidebar";
import Head from "next/head";
import AuthProtected from "@/features/Auth/components/AuthProtected";

type Props = {
  title: string;
  children: React.ReactNode;
};

const BaseAppLayout = ({ title, children }: Props) => {
  return (
    <AuthProtected>
      <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Head>
          <title>{title} - Lonely Project</title>
            <meta
                name="description"
                content="The lonely project a social network dedicated to getting users connected with like minded people"
            />
        </Head>
        <Sidebar />
        <Box w={"100%"} maxH={"100vh"} overflow={"auto"}>
          {children}
        </Box>
      </Flex>
    </AuthProtected>
  );
};
export default BaseAppLayout;
