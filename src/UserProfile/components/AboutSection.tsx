import React from "react";
import ProfileCard from "./ProfileCard";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useEditableControls,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { updateProfileAbout } from "../userProfileReducer";

const AboutSection = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const { about } =
    useAppSelector((state) => state.profile.users.entities[userId]) || "";
  const dispatch = useAppDispatch();

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          aria-label={"Submit"}
        />
        <IconButton
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
          aria-label={"Cancel"}
        />
      </ButtonGroup>
    ) : (
      <IconButton
        size="sm"
        icon={<EditIcon />}
        {...getEditButtonProps()}
        aria-label={"Edit"}
      />
    );
  };

  return (
    <ProfileCard key={about}>
      <Editable
        defaultValue={about}
        fontSize="2xl"
        isPreviewFocusable={false}
        onSubmit={(nextValue) =>
          dispatch(updateProfileAbout(userId, nextValue))
        }
      >
        <Flex pb={2}>
          <Heading size={"md"}>About me</Heading>
          <Spacer />
          {editMode && <EditableControls />}
        </Flex>

        <EditablePreview key={about} wordBreak={"break-word"} />
        <EditableInput />
      </Editable>
    </ProfileCard>
  );
};
export default AboutSection;
