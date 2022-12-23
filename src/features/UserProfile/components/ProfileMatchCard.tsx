import React from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Image,
  Text,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { USER_PROFILE_URL } from "@/utils/urls";
import { UserProfile } from "../types/Profile";
import Link from "next/link";

const ProfileMatchCard = ({
  id,
  name,
  profilePictureUrl,
  about,
}: UserProfile) => {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={profilePictureUrl}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={4}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Tooltip label={about}>
              <Text
                color={"gray.500"}
                textAlign={"center"}
                noOfLines={2}
                maxW={"250px"}
              >
                {about}
              </Text>
            </Tooltip>
          </Stack>
          <Link href={`${USER_PROFILE_URL}?uid=${id}`}>
            <Button
              w={"full"}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              View profile
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
};

export default ProfileMatchCard;
