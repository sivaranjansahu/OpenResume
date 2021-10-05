import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  IconButton, Menu,
  MenuButton, MenuItem,
  MenuList, Text,
  useDisclosure
} from "@chakra-ui/react";
import {
  VscCopy,
  VscKebabVertical,

  VscTrash
} from "react-icons/vsc";
import { Link } from "react-router-dom";
import ConfirmDelete from "../components/modals/confirmdelete";

const ProfileCard = ({
  profileKey,
  //profileName,
  deleteProfile,
  copyProfile,
  url,
  allProfiles,
  openDeleteModal,
}: any) => {
  const { profileName, profileNotes } = allProfiles[profileKey].meta;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        boxShadow="xl"
        height="150px"
        bg="white"
        sx={{ transition: "0.2s transform ease-in" }}
        _hover={{ bg: "primary.100", transition: "0.1s all ease-in",color:"#fff" }}
        borderRadius="lg"
      >
        <Box
          width="100%"
          p={6}
          borderTopRadius="lg"
          flex={1}
          position="relative"
        >
          {profileKey !== "newprofile" && (
            <Link to={`${url}/${profileKey}`}>
              <Heading as="h3" size="sm" mb={2}>{profileName}</Heading>
              {/* <Text fontWeight="semibold">{profileName}</Text> */}
              <Text >{profileNotes}</Text>
            </Link>
          )}
          <Box position="absolute" right={2} top={5}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<VscKebabVertical />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem
                  icon={<VscCopy />}
                  onClick={() => copyProfile(allProfiles, profileKey)}
                >
                  Copy to new
                </MenuItem>
                <MenuItem icon={<VscTrash />} onClick={() => onOpen()}>
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Flex>
      <ConfirmDelete
        deleteFunction={deleteProfile}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        id={profileKey}
      />
    </>
  );
};

export default ProfileCard;
