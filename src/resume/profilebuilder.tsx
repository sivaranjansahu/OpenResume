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

  Text, Textarea
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import {
  IProfile
} from "./interfaces/forminterfaces";
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
import Summary from "./modules/summary/summary"
import { setSummary } from "./modules/summary/reducers";
import { setInitialCourses } from "./modules/courses/reducers";
import Courses from "./modules/courses/courses";
import { capitalize } from "../utils/common";
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
  console.log("allstate", allState);
  const handleClick = () => {
    setProfileData(allState, profileId);
  };

  const updateStateWithProfile = (allProfiles: IProfile[], profileId: any) => {
    //console.log("profilebuilder", allProfiles, profileId);
    const currentProfile = allProfiles[profileId];
    if(!currentProfile){return;}
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
    console.log("testing useeffect", allProfiles);
    allProfiles && profileId && updateStateWithProfile(allProfiles, profileId);
    // electron.ipcRenderer.on(channels.GET_ALL_PROFILES, (event, arg) => {
    //   // console.log("data", arg);
    //   // console.log(arg[profileId]);
    //   console.log("data", arg);
    //   updateStateWithProfile(arg[profileId]);
    // });
  }, [allProfiles,profileId]);

  return (
    <Grid
      // placeItems="center"
      justifyContent="center"
      width="100%"
      // gridTemplateColumns="1fr 1fr"
      // h="100vh"
    >
      <Flex py={6} gridGap={24} minW="1600px">
        <Box width="1000px" mx="auto">
          <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Heading
            size="lg"
            
          >
            {allState.meta.profileName}
          </Heading>
          <Button
              onClick={handleClick}
              type="submit"
              bg="secondary.100"
              leftIcon={<CheckIcon />}
              disabled={
                !allState.meta.profileName ||
                allState.meta.profileName.length === 0
              }
            >
              Save
            </Button>
          <Button position="absolute" right={5} top={5} leftIcon={!showPreview ? <RiEyeLine/> : <RiEyeOffLine/>} onClick={()=>setShowPreview(!showPreview)}>{showPreview ? 'Hide ':'Show '} resume</Button>
          </Flex>

          <Grid gridTemplateColumns="1fr 2fr" gridGap={4} p={4} bg="gray.700"  py={4} color="whiteAlpha.800">
          <Box as="header" alignItems="baseline" mb={2}>
            <FormLabel width="80px" fontSize="sm" color="whiteAlpha.500">Title</FormLabel>
            <Input
              variant="outline"
              placeholder="Profile"
              fontSize="md"
                width="100%"
              defaultValue="Profile name"
              name="profilename"
              value={capitalize(allState.meta.profileName)}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(setName(e.target.value));
              }}
            />
            
          </Box>
          <Box  alignItems="baseline" mb={4}> 
          <FormLabel width="80px" fontSize="sm" color="whiteAlpha.500">Notes</FormLabel>
            <Input
            fontSize="md"
              variant="outline"
              placeholder="Notes about this portfolio."
              name="profilenotes"
              width="100%"
              rows={1}
              value={allState.meta.profileNotes}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(setNotes(e.target.value));
              }}
            />
            </Box>
            {/* <Box gridColumn="1/3" width="100%" textAlign="right" as="sub" color="whiteAlpha.500">Contents of this section wont appear on the resume.</Box> */}

          </Grid>
          <Accordion allowToggle>
            <Box width="100%">
              <Flex fontSize="sm" bg="primary.100" p={4} color="white" mb={2} pt={8}>
                <Text textAlign="right">Active?</Text>
                <Text ml={8}>Sections</Text>
              </Flex>
              <BasicInfo />
              <Summary/>
              <WorkHistory />
              <Skills />
              <Education />
              <Courses/>
              <Links/>
              <Projects/>
            </Box>
          </Accordion>
        </Box>
        {showPreview && (
          <Container maxW="container.xl" height="100%">
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
