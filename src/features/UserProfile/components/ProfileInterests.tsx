import React from "react";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarTag, { SelectAbleAvatarTag } from "./AvatarTag";
import ProfileCard from "./ProfileCard";
import { EditIcon } from "@chakra-ui/icons";
import { useInterests } from "../api/getInterests";
import { CategoryInterest, Interest } from "../types/Interest";
import {
  useAddProfileInterest,
  useDeleteProfileInterest,
} from "../api/updateUserProfile";
import { ProfileProps } from "../types/ProfileProps";

const ProfileInterests = ({
  editMode,
  interests = [],
  isLoading,
}: ProfileProps) => {
  const addInterest = useAddProfileInterest();
  const deleteInterest = useDeleteProfileInterest();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const interestQuery = useInterests();
  const userInterestIds = interests.map((interest) => interest.id);

  const InterestCategory = ({ name, interests }: CategoryInterest) => {
    return (
      <>
        <Heading size={"md"} p={3}>
          {name}
        </Heading>
        <SimpleGrid minChildWidth="150px" my={3} spacing={5}>
          {interests.map((interest: Interest) => (
            <SelectAbleAvatarTag
              description={interest.name}
              key={interest.id}
              defaultSelected={userInterestIds.includes(interest.id)}
              onSelected={() => addInterest.mutate(interest.id)}
              onDeselected={() => deleteInterest.mutate(interest.id)}
            />
          ))}
        </SimpleGrid>
        <Divider />
      </>
    );
  };

  return (
    <>
      <ProfileCard
        isLoading={isLoading}
        header={
          <Flex>
            <Heading size={"md"} m={"auto"}>
              Interests
            </Heading>
            <Spacer />
            {editMode && (
              <Tooltip label={"Edit Interests"}>
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  aria-label={"Edit"}
                  onClick={onOpen}
                />
              </Tooltip>
            )}
          </Flex>
        }
      >
        <SimpleGrid columns={{ base: 2, xl: 1, "2xl": 2 }} mt={3} spacing={5}>
          {interests.map((interest: Interest) => (
            <AvatarTag description={interest.name} key={interest.id} />
          ))}
        </SimpleGrid>
      </ProfileCard>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Interests</DrawerHeader>

          <DrawerBody>
            {interestQuery.isSuccess &&
              interestQuery.data.map((category: CategoryInterest) => (
                <InterestCategory {...category} key={category.id} />
              ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default ProfileInterests;
