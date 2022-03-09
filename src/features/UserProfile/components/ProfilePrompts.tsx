import React from "react";
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
import EditableCard from "./EditableCard";
import { useAppSelector } from "../../../utils/hooks";
import { Prompt, UserProfile } from "../types/Profile";
import { usePrompts } from "../api/getPrompts";
import { useAddPrompt, useDeletePrompt } from "../api/updateUserProfile";

const ProfilePrompts = ({ id, prompts = [] }: UserProfile) => {
  const currentId = useAppSelector((state) => state.auth.user.uid);
  const editMode = currentId === id;
  const promptsQuery = usePrompts();
  const deletePrompt = useDeletePrompt();

  const userPromptIds = prompts.map((prompt) => prompt.promptId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SelectablePrompt = ({ promptId, promptName }: Prompt) => {
    const prompt = useAddPrompt();

    const addPrompt = (promptAnswer: string) => {
      if (!promptAnswer) {
        return;
      }
      prompt.mutate({ promptId, text: promptAnswer, promptName });
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
      {prompts.map((prompt) => (
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
                onClick={() => deletePrompt.mutate(prompt.promptId)}
              />
            </Tooltip>
          }
        />
      ))}
      {editMode && promptsQuery.data.lenght !== userPromptIds.length && (
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
                  {promptsQuery.data
                    .filter(
                      (prompt: Prompt) =>
                        !userPromptIds.includes(prompt.promptId)
                    )
                    .map((prompt: Prompt) => (
                      <SelectablePrompt {...prompt} />
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
