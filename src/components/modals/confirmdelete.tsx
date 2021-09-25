import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

function ConfirmDelete({ deleteFunction, isOpen, onOpen, onClose, id }: any) {
  const [profileName, setProfileName] = useState<string>("");
  const toast = useToast();

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deleting profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete the profile ?</ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button> */}
            <Button
              colorScheme="red"
              onClick={() => {
                deleteFunction(id);
                onClose();
              }}
            >
              Yes, delete profile
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onClose();
              }}
            >
              No, dont delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ConfirmDelete;
