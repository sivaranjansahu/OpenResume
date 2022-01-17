import {
  Button,
  Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";

function ConfirmDelete({ deleteFunction, isOpen, onOpen, onClose, id }: any) {

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
