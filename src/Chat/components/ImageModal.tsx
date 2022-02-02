import React from "react";
import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const ImageModal = ({ imageUrl }: { imageUrl: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        src={imageUrl}
        h={200}
        onClick={onOpen}
        style={{ cursor: "pointer" }}
        borderRadius={"xl"}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={imageUrl} />
        </ModalContent>
      </Modal>
    </>
  );
};
export default ImageModal;
