import { CheckIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Textarea
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import {
  IBasicInfo,
  IProfile
} from "./interfaces/forminterfaces";
import BasicInfo from "./modules/basicinfo/basicinfo";
import { setBasicInfo } from "./modules/basicinfo/reducers";
import Education from "./modules/education/education";
import { setInitialEducation } from "./modules/education/reducers";
import { setInitialMeta, setName, setNotes } from "./modules/resumereducers";
import Skills from "./modules/skills/skills";
import { setInitialWorkHistory } from "./modules/workhistory/reducers";
import WorkHistory from "./modules/workhistory/workhistory";
import Preview from "./preview";
const electron = window.require("electron");

export const WorkExContext = React.createContext<
  Partial<{
    workExpList: any[];
    updateWorkExp: Function;
  }>
>({});
export const SkillsContext = React.createContext<
  Partial<{
    skillsList: any[];
    updateSkillsExp: Function;
    removeSkill: Function;
  }>
>({});
export const BasicInfoContext = React.createContext<
  Partial<{
    basicInfo: IBasicInfo;
    updateBasicInfo: Function;
  }>
>({});

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
  const [showPreview, setShowPreview] = useState<boolean>(true);
  console.log("allstate", allState);
  const handleClick = () => {
    setProfileData(allState, profileId);
  };

  const updateStateWithProfile = (allProfiles: IProfile[], profileId: any) => {
    //console.log("profilebuilder", allProfiles, profileId);
    dispatch(setInitialSkills(allProfiles[profileId].skills));
    dispatch(setInitialWorkHistory(allProfiles[profileId].workHistory));
    dispatch(setInitialEducation(allProfiles[profileId].education));
    dispatch(setInitialMeta(allProfiles[profileId].meta));
    dispatch(setBasicInfo(allProfiles[profileId].basicInfo));
  };

  //If profileId has been passed, pull the profile from appstore json and push it to the state
  //else create new profile
  useEffect(() => {
    console.log("testing useeffect", profileId);
    updateStateWithProfile(allProfiles, profileId);
    // electron.ipcRenderer.on(channels.GET_ALL_PROFILES, (event, arg) => {
    //   // console.log("data", arg);
    //   // console.log(arg[profileId]);
    //   console.log("data", arg);
    //   updateStateWithProfile(arg[profileId]);
    // });
  }, [profileId]);

  return (
    <Grid
      // placeItems="center"
      justifyContent="center"
      width="100%"
      // gridTemplateColumns="1fr 1fr"
      h="100vh"
    >
      <Flex py={6} gridGap={24} minW="1600px">
        <Box width="1000px" mx="auto">
          <Heading
            size="sm"
            mb="4"
            pb={2}
            borderBottomColor="gray.200"
            borderBottomWidth={1}
          >
            Profile editor
          </Heading>
          <Flex as="header" justifyContent="space-between">
            <Input
              variant="flushed"
              placeholder="Profile"
              fontSize="xl"
              fontWeight="bold"
              defaultValue="Profile name"
              name="profilename"
              value={allState.meta.profileName}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(setName(e.target.value));
              }}
            />
            <Button
              onClick={handleClick}
              type="submit"
              colorScheme="blue"
              leftIcon={<CheckIcon />}
              disabled={
                !allState.meta.profileName ||
                allState.meta.profileName.length === 0
              }
            >
              Save
            </Button>
          </Flex>
          <Box>
            <Textarea
              variant="flushed"
              placeholder="Notes about this portfolio, this wont appear on the resume."
              name="profilenotes"
              rows={2}
              value={allState.meta.profileNotes}
              onChange={(e) => {
                console.log(e.target.value);
                dispatch(setNotes(e.target.value));
              }}
            />
          </Box>
          <Accordion allowToggle>
            <Box width="100%">
              <BasicInfo />
              <WorkHistory />
              <Skills />
              <Education />
            </Box>
          </Accordion>
        </Box>
        {showPreview && (
          <Container maxW="container.xl" height="100%">
            <Heading
              size="sm"
              mb="4"
              pb={2}
              borderBottomColor="gray.200"
              borderBottomWidth={1}
            >
              Resume preview
            </Heading>
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
