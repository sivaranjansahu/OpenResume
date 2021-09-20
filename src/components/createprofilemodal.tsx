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
} from "@chakra-ui/react";
import { useState } from "react";

function CreateProfile({ createProfile }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileName, setProfileName] = useState<string>("");
  return (
    <>
      <Button onClick={onOpen}>New profile</Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="newprofilename">Profile name</FormLabel>
              <Input
                id="newprofilename"
                size="sm"
                value={profileName}
                bg="white"
                onChange={(e) => setProfileName(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                createProfile(profileName);
              }}
            >
              Create profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateProfile;
