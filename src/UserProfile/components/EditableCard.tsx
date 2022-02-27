import React from "react";
import {
  BoxProps,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  useEditableControls,
} from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

type props = {
  defaultValue: string;
  submitAction?: Function;
  showEditControls?: boolean;
  title: string;
  extraActionButtons?: React.ReactNode;
};

const EditableCard = ({
  defaultValue,
  submitAction,
  showEditControls,
  title,
  extraActionButtons,
}: props) => {
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
      <ButtonGroup justifyContent="center" size="sm">
        <Tooltip label={"Edit"}>
          <IconButton
            size="sm"
            icon={<EditIcon />}
            {...getEditButtonProps()}
            aria-label={"Edit"}
          />
        </Tooltip>
        {extraActionButtons}
      </ButtonGroup>
    );
  };

  return (
    <ProfileCard>
      <Editable
        defaultValue={defaultValue}
        fontSize="2xl"
        isPreviewFocusable={false}
        onSubmit={(nextValue) => submitAction && submitAction(nextValue)}
      >
        <Flex pb={2}>
          <Heading size={"md"} m={"auto"}>
            {title}
          </Heading>
          <Spacer />
          {showEditControls && <EditableControls />}
        </Flex>
        <EditablePreview wordBreak={"break-word"} />
        <EditableInput as={"textarea"} />
      </Editable>
    </ProfileCard>
  );
};
export default EditableCard;
