import React from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react";
import LogoHeader from "@/features/Base/components/LogoHeader";

const LoadingPage = () => {
  return (
    <VStack bg={"#0089ED"} h={"100vh"} justifyContent={"center"} gap={2}>
      <LogoHeader />
      <Text color={"white"} fontSize={"xl"}>
        Lets get you connected
      </Text>
      <Spinner color={"#FF7373"} size={"xl"} />
    </VStack>
  );
};

export default LoadingPage;
