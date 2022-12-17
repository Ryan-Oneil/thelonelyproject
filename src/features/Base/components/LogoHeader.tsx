import React from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import styles from "@/features/Base/BasePage.module.css";
import { Heading, HStack } from "@chakra-ui/react";
import { StackProps } from "@chakra-ui/layout";

const LogoHeader = (props: StackProps) => {
  return (
    <HStack p={4} as={"section"} gap={4} {...props}>
      <Image
        src={Logo}
        alt={"Lonely project logo"}
        className={styles.logoImage}
        width={64}
        height={63}
        placeholder={"blur"}
        draggable={false}
      />
      <Heading size="xl" className={styles.logo}>
        Lonely Project
      </Heading>
    </HStack>
  );
};
export default LogoHeader;
