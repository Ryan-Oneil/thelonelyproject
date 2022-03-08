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
} from "@chakra-ui/react";
import { useAppSelector } from "../../../utils/hooks";
import { Link } from "react-router-dom";
import { USER_PROFILE_URL } from "../../../utils/urls";

const ProfileMatchCard = ({ userId }: { userId: string }) => {
  const { name, profilePictureUrl, about } = useAppSelector(
    (state) => state.profile.users.entities[userId]
  );

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
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Text color={"gray.500"}>{about}</Text>
          </Stack>
          <Link to={`${USER_PROFILE_URL}/${userId}`}>
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
