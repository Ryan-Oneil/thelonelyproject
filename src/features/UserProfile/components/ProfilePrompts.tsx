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
import EditableCard from "./EditableCard";
import { Prompt } from "../types/Profile";
import { usePrompts } from "../api/getPrompts";
import { useAddPrompt, useDeletePrompt } from "../api/updateUserProfile";
import { ProfileProps } from "../types/ProfileProps";
import { MdDelete } from "react-icons/md";
import {FiPlus} from "react-icons/fi";

const ProfilePrompts = ({ editMode, prompts = [] }: ProfileProps) => {
  const { data, isSuccess } = usePrompts();
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
                icon={<MdDelete />}
                colorScheme={"red"}
                onClick={() => deletePrompt.mutate(prompt.promptId)}
              />
            </Tooltip>
          }
        />
      ))}
      {editMode && isSuccess && data.lenght !== userPromptIds.length && (
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
            <FiPlus />
          </Center>
          <Modal onClose={onClose} size={"6xl"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Select a prompt</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <SimpleGrid spacing={10} minChildWidth={300} mb={4}>
                  {data
                    .filter(
                      (prompt: Prompt) =>
                        !userPromptIds.includes(prompt.promptId)
                    )
                    .map((prompt: Prompt) => (
                      <SelectablePrompt {...prompt} key={prompt.promptName} />
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
