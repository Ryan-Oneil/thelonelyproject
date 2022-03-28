import React from "react";
import {
  Image,
  ImageProps,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const ImageModal = (props: ImageProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Image
        h={200}
        onClick={onOpen}
        style={{ cursor: "pointer" }}
        borderRadius={"xl"}
        {...props}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={props.src} />
        </ModalContent>
      </Modal>
    </>
  );
};
export default ImageModal;
