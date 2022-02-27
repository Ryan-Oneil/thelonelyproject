import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import {
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  addPromptToProfile,
  deletePromptFromProfile,
  fetchProfilePrompts,
} from "../userProfileReducer";
import EditableCard from "./EditableCard";

const ProfilePrompts = ({
  userId,
  editMode,
}: {
  userId: string;
  editMode: boolean;
}) => {
  const userPrompts =
    useAppSelector((state) => state.profile.users.entities[userId]?.prompts) ||
    [];
  const { ids } = useAppSelector((state) => state.profile.prompts);
  const userPromptIds = userPrompts.map((prompt) => prompt.promptId);
  const unusedPromptIds = ids.filter((id) => !userPromptIds.includes(id));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editMode) {
      dispatch(fetchProfilePrompts());
    }
  }, []);

  const SelectablePrompt = ({ id }: { id: number }) => {
    const { promptName } = useAppSelector(
      (state) => state.profile.prompts.entities[id]
    );

    const addPrompt = (promptAnswer: string) => {
      if (!promptAnswer) {
        return;
      }

      dispatch(
        addPromptToProfile(
          { promptId: id, text: promptAnswer, promptName },
          userId
        )
      );
    };

    return (
      <EditableCard
        title={promptName}
        defaultValue={""}
        showEditControls
        submitAction={addPrompt}
      />
    );
  };

  return (
    <>
      {userPrompts.map((prompt) => (
        <EditableCard
          defaultValue={prompt.text}
          title={prompt.promptName}
          key={prompt.promptId}
          showEditControls={editMode}
          extraActionButtons={
            <Tooltip label={"Delete"}>
              <IconButton
                aria-label={"Delete prompt"}
                icon={<DeleteIcon />}
                colorScheme={"red"}
                onClick={() =>
                  dispatch(deletePromptFromProfile(userId, prompt.promptId))
                }
              />
            </Tooltip>
          }
        />
      ))}
      {editMode && unusedPromptIds.length > 0 && (
        <>
          <Center
            bg={"#fafafa"}
            borderRadius={"lg"}
            border={"1px dashed #d9d9d9"}
            cursor={"pointer"}
            _hover={{ borderColor: "#b6bbcd" }}
            minH={150}
            minW={150}
            onClick={onOpen}
          >
            <Text mr={2}>Add a prompt</Text>
            <AddIcon />
          </Center>
          <Modal onClose={onClose} size={"6xl"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select a prompt</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid spacing={10} minChildWidth={300} mb={4}>
                  {unusedPromptIds.map((id) => (
                    <SelectablePrompt id={parseInt(id)} key={id} />
                  ))}
                </SimpleGrid>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};
export default ProfilePrompts;
