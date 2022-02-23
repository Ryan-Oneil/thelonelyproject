import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
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
import { fetchInterestsByCategory } from "../userProfileReducer";

const ProfileInterests = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const userInterests =
    useAppSelector(
      (state) => state.profile.users.entities[userId]?.interests
    ) || [];
  const interestCategoriesIds = useAppSelector(
    (state) => state.profile.interestCategories.ids
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editMode) {
      dispatch(fetchInterestsByCategory());
    }
  }, []);

  const InterestCategory = ({ id }: { id: string }) => {
    const category = useAppSelector(
      (state) => state.profile.interestCategories.entities[id]
    );

    const interests = useAppSelector(
      (state) => state.profile.interests.entities
    );

    return (
      <>
        <Heading size={"md"}>Outdoors</Heading>
        <SimpleGrid minChildWidth="80px" my={3} spacing={5}>
          {category.interests.map((interestId) => {
            const interestDescription = interests[interestId].description;

            return (
              <SelectAbleAvatarTag
                description={interestDescription}
                key={interestId}
                defaultSelected
              />
            );
          })}
        </SimpleGrid>
        <Divider />
      </>
    );
  };

  return (
    <>
      <ProfileCard>
        <Flex>
          <Heading size={"md"}>Interests</Heading>
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

        <SimpleGrid columns={{ base: 2, xl: 1, "2xl": 2 }} mt={3} spacing={5}>
          {userInterests.map((interest) => (
            <AvatarTag
              description={interest.description}
              key={interest.description}
            />
          ))}
        </SimpleGrid>
      </ProfileCard>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Interests</DrawerHeader>

          <DrawerBody>
            {interestCategoriesIds.map((id) => (
              <InterestCategory id={id} key={id} />
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default ProfileInterests;