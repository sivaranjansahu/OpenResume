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
import { BiPlus } from "react-icons/bi";

function CreateProfile({ createProfile }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileName, setProfileName] = useState<string>("");
  const toast = useToast();

  function showToast() {
    toast({
      title: "Profile created.",
      description: "Click on it to start entering your information",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <>
      <Button onClick={onOpen} size="md" colorScheme="blue" leftIcon={<BiPlus />}>
        New profile
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="newprofilename">Profile name</FormLabel>
              <Input
                id="newprofilename"
                size="sm"
                value={profileName}
                bg="white"
                onChange={(e) => {
                  setProfileName(e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
            <Button
              colorScheme="blue"
              onClick={() => {
                createProfile(profileName);
                onClose();
                setProfileName("");
                showToast();
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
