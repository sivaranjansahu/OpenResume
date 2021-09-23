import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import { Text, useDisclosure, Icon } from "@chakra-ui/react";
import { RiDeleteBinLine, RiFileCopyLine } from "react-icons/ri";
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
    <Flex
      flexDir="column"
      boxShadow="xl"
      minHeight="150px"
      sx={{ transition: "0.2s transform ease-in" }}
      _hover={{ transform: "scale(1.03)", transition: "0.1s all ease-in" }}
    >
      <ConfirmDelete
        deleteFunction={deleteProfile}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        id={profileKey}
      />
      <Box width="100%" p={6} bg="white" borderTopRadius="lg" flex={1}>
        {profileKey !== "newprofile" && (
          <Link to={`${url}/${profileKey}`}>
            <Text fontWeight="semibold">{profileName}</Text>
            <Text fontWeight="normal">{profileNotes}</Text>
            {/* {allProfiles[p].meta.profileName} */}
          </Link>
        )}
      </Box>
      <Flex
        backgroundColor="gray.100"
        borderBottomRadius="lg"
        px={6}
        py={3}
        justifyContent="flex-end"
      >
        <Icon
          as={RiFileCopyLine}
          color="blue.500"
          cursor="pointer"
          mr={2}
          onClick={() => copyProfile(allProfiles, profileKey)}
        />
        <Icon
          as={RiDeleteBinLine}
          stroke="red.500"
          fill="red"
          cursor="pointer"
          onClick={() => onOpen()}
          //deleteProfile(profileKey)
        />
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
