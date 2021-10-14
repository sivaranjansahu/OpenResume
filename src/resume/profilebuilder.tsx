import { CheckIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Box,
  Button,
  Container,
  Flex,
  FormLabel,
  Grid,
  Heading,
  Input,
  Slide,
  Fade,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import { IProfile } from "./interfaces/forminterfaces";
import BasicInfo from "./modules/basicinfo/basicinfo";
import { setBasicInfo } from "./modules/basicinfo/reducers";
import Education from "./modules/education/education";
import { setInitialEducation } from "./modules/education/reducers";
import Links from "./modules/links/links";
import { setInitialLinks } from "./modules/links/reducers";
import Projects from "./modules/projects/projects";
import { setInitialProjects } from "./modules/projects/reducers";
import { setInitialMeta, setName, setNotes } from "./modules/resumereducers";
import Skills from "./modules/skills/skills";
import { setInitialWorkHistory } from "./modules/workhistory/reducers";
import WorkHistory from "./modules/workhistory/workhistory";
import Preview from "./preview";
import Summary from "./modules/summary/summary";
import { setSummary } from "./modules/summary/reducers";
import { setInitialCourses } from "./modules/courses/reducers";
import Courses from "./modules/courses/courses";
import { capitalize } from "../utils/common";
import { setDirty } from "../store/store";
import { VscClose, VscEye, VscEyeClosed } from "react-icons/vsc";
const electron = window.require("electron");

// export const WorkExContext = React.createContext<
//   Partial<{
//     workExpList: any[];
//     updateWorkExp: Function;
//   }>
// >({});
// export const SkillsContext = React.createContext<
//   Partial<{
//     skillsList: any[];
//     updateSkillsExp: Function;
//     removeSkill: Function;
//   }>
// >({});
// export const BasicInfoContext = React.createContext<
//   Partial<{
//     basicInfo: IBasicInfo;
//     updateBasicInfo: Function;
//   }>
// >({});

type ProfileParams = {
  profileId: string;
};

const setProfileData = (allState: any, profileId = "second") => {
  console.log("setting profileid- builder", profileId, allState);
  electron.ipcRenderer.send(channels.SET_PROFILE_DATA, {
    proppath: profileId,
    statevalue: allState,
  });
};

const ProfileBuilder = ({ allProfiles }: any) => {
  const dispatch = useAppDispatch();
  let { profileId } = useParams<ProfileParams>();
  const allState = useAppSelector<any>((state) => state);

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const saveChanges = () => {
    setProfileData(allState, profileId);
    onClose();
    dispatch(setDirty({ isDirty: false }));
  };

  const updateStateWithProfile = (allProfiles: IProfile[], profileId: any) => {
    //console.log("profilebuilder", allProfiles, profileId);
    const currentProfile = allProfiles[profileId];
    if (!currentProfile) {
      return;
    }

    console.log("currentProfile", currentProfile);
    dispatch(setInitialSkills(currentProfile.skills));
    dispatch(setInitialWorkHistory(currentProfile.workHistory));
    dispatch(setInitialEducation(currentProfile.education));
    dispatch(setInitialMeta(currentProfile.meta));
    dispatch(setBasicInfo(currentProfile.basicInfo));
    dispatch(setInitialLinks(currentProfile.links));
    dispatch(setInitialProjects(currentProfile.projects));
    dispatch(setSummary(currentProfile.summary || ""));
    dispatch(setInitialCourses(currentProfile.courses));
  };

  //If profileId has been passed, pull the profile from appstore json and push it to the state
  //else create new profile
  useEffect(() => {
    allProfiles && profileId && updateStateWithProfile(allProfiles, profileId);
  }, [allProfiles, profileId]);
  const { isDirty } = allState.dirty;

  useEffect(() => {
    //isDirty && onOpen();
    isDirty &&
      toast({
        // title: "Save your changes",
        // description:
        //   "Your changes dont get saved until you click on the Save button.",
        // status: "success",
        // duration: 5000,
        // isClosable: true,
        position: "bottom-right",
        render: ({ onClose }) => (
          <Box width="250px" color="white" p={3} bg="gray.600">
            <Flex onClick={onClose}>
              <Text fontWeight="bold">Save your changes</Text>
              {/* <Icon as={VscClose} boxSize={4} /> */}
            </Flex>
            <Text fontSize="sm">
              Your changes dont get saved until you click on the Save button.
            </Text>
          </Box>
        ),
      });
  }, [isDirty]);

  const toast = useToast();

  return (
    <Grid
      // placeItems="center"
      justifyContent="center"
      width="100%"
      // gridTemplateColumns="1fr 1fr"
      // h="100vh"
    >
      <Flex py={6} gridGap={{ lg: 18, md: 12 }} minW="1400px">
        <Box width="1000px" mx="auto">
          <Box position="fixed" right={10} bottom={0} p={4} width={32}></Box>
          <Box
            boxShadow={isDirty ? "purple" : "transparent"}
            transition="ease-in"
            padding={4}
          >
            <Flex justifyContent="space-between" alignItems="center" mb="4">
              <Flex>
                <Heading size="lg">{allState.meta.profileName}</Heading>
                <Button
                  onClick={saveChanges}
                  type="submit"
                  colorScheme="secondary"
                  //bg="secondary.100"
                  ml={8}
                  leftIcon={<CheckIcon />}
                  disabled={
                    !allState.meta.profileName ||
                    !isDirty ||
                    allState.meta.profileName.length === 0
                  }
                >
                  Save
                </Button>
              </Flex>
              <Button
                leftIcon={!showPreview ? <VscEye /> : <VscEyeClosed />}
                onClick={() => setShowPreview(!showPreview)}
                colorScheme="primary"
                variant="ghost"
              >
                {showPreview ? "Hide " : "Show "} resume
              </Button>
            </Flex>

            <Grid
              gridTemplateColumns="1fr 2fr"
              gridGap={4}
              p={4}
              bg="gray.700"
              py={4}
              color="whiteAlpha.800"
            >
              <Box as="header" alignItems="baseline" mb={2}>
                <FormLabel width="80px" fontSize="sm" color="whiteAlpha.500">
                  Title
                </FormLabel>
                <Input
                  variant="outline"
                  placeholder="Profile"
                  fontSize="md"
                  width="100%"
                  defaultValue="Profile name"
                  name="profilename"
                  value={capitalize(allState.meta.profileName)}
                  maxLength={25}
                  onChange={(e) => {
                    dispatch(setName(e.target.value));
                    dispatch(setDirty({ isDirty: true }));
                  }}
                />
              </Box>
              <Box alignItems="baseline" mb={4}>
                <FormLabel width="80px" fontSize="sm" color="whiteAlpha.500">
                  Notes
                </FormLabel>
                <Input
                  fontSize="md"
                  variant="outline"
                  placeholder="Notes about this portfolio."
                  name="profilenotes"
                  width="100%"
                  rows={1}
                  value={allState.meta.profileNotes}
                  onChange={(e) => {
                    dispatch(setNotes(e.target.value));
                    dispatch(setDirty({ isDirty: true }));
                  }}
                />
              </Box>
              {/* <Box gridColumn="1/3" width="100%" textAlign="right" as="sub" color="whiteAlpha.500">Contents of this section wont appear on the resume.</Box> */}
            </Grid>
            <Accordion allowToggle>
              <Box width="100%">
                <Flex
                  fontSize="sm"
                  bg="primary.400"
                  p={4}
                  color="white"
                  mb={2}
                  pt={8}
                >
                  <Heading as="h3" size="sm">
                    Resume sections
                  </Heading>
                </Flex>
                <BasicInfo />
                <Summary />
                <WorkHistory />
                <Skills />
                <Education />
                <Courses />
                <Links />
                <Projects />
              </Box>
            </Accordion>
          </Box>
        </Box>
        {showPreview && (
          <Container
            maxW={{ lg: "container.lg", md: "container.lg" }}
            height="100%"
          >
            {/* <Heading
              size="sm"
              mb="4"
              pb={2}
              borderBottomColor="gray.200"
              borderBottomWidth={1}
            >
              Resume preview
            </Heading> */}
            <Preview resumeData={allState} />
          </Container>
        )}
      </Flex>
      {/* <Box bg="gray.400">
        
      </Box> */}
    </Grid>
  );
};

export default ProfileBuilder;
