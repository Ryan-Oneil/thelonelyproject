import React from "react";
import { useAppSelector } from "../../utils/hooks";
import ProfileCard from "./ProfileCard";
import { Heading, Text } from "@chakra-ui/react";

const ProfilePrompts = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const userPromptIds =
    useAppSelector((state) => state.profile.users.entities[userId]?.prompts) ||
    [];
  const prompts = useAppSelector((state) => state.profile.prompts.entities);

  return (
    <>
      {userPromptIds.map((promptId) => (
        <ProfileCard key={promptId}>
          <Heading size={"md"}>{prompts[promptId].promptName}</Heading>
          <Text pt={3}>{prompts[promptId].text}</Text>
        </ProfileCard>
      ))}
    </>
  );
};
export default ProfilePrompts;
