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
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import { setDirty, setOrder } from "../store/store";
import { capitalize } from "../utils/common";
import Grabber from "./components/grabber";
import { ICustomSection, IProfile } from "./interfaces/forminterfaces";
import BasicInfo from "./modules/basicinfo/basicinfo";
import { setBasicInfo } from "./modules/basicinfo/reducers";
import Courses from "./modules/courses/courses";
import { setInitialCourses } from "./modules/courses/reducers";
import CustomSectionForm from "./modules/custom-module/addcustomsectionform";
import CustomSection from "./modules/custom-module/customsection";
import { setInitial as setInitialCustomSections } from "./modules/custom-module/reducers";
import Education from "./modules/education/education";
import { setInitialEducation } from "./modules/education/reducers";
import Links from "./modules/links/links";
import { setInitialLinks } from "./modules/links/reducers";
import Projects from "./modules/projects/projects";
import { setInitialProjects } from "./modules/projects/reducers";
import { setInitialMeta, setName, setNotes } from "./modules/resumereducers";
import Skills from "./modules/skills/skills";
import { setSummary } from "./modules/summary/reducers";
import Summary from "./modules/summary/summary";
import { setInitialWorkHistory } from "./modules/workhistory/reducers";
import WorkHistory from "./modules/workhistory/workhistory";
import Preview from "./preview";

//const electron = window.require("electron");

type ProfileParams = {
  profileId: string;
};

const ComponentsMap: { [key: string]: any } = {
  summary: Summary,
  workExperience: WorkHistory,
  skills: Skills,
  education: Education,
  courses: Courses,
  projects: Projects,
  links: Links,
};

// const setProfileData = (allState: any, profileId = "second") => {
//   console.log("setting profileid- builder", profileId, allState);
//   electron.ipcRenderer.send(channels.SET_PROFILE_DATA, {
//     proppath: profileId,
//     statevalue: allState,
//   });
// };

const ProfileBuilder = ({ allProfiles }: any) => {
  const dispatch = useAppDispatch();
  const { profileId } = useParams<ProfileParams>();
  const allState = useAppSelector<any>((state) => state);

  const [showPreview, setShowPreview] = useState<boolean>(false);
  const { onClose } = useDisclosure();

  const saveChanges = () => {
    //setProfileData(allState, profileId);
    onClose();
    dispatch(setDirty({ isDirty: false }));
  };

  const updateStateWithProfile = useCallback(
    (allProfiles: IProfile[], profileId: any) => {
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
      dispatch(setInitialCustomSections(currentProfile.customSections ?? []));
      dispatch(setOrder({ order: currentProfile.componentOrder?.order }));

      const customSections = Object.values(currentProfile).filter((val) => {
        //return val.hasOwnProperty("custom");
        return Object.prototype.hasOwnProperty.call(val, "custom");
      });
      console.log(customSections);
    },
    [dispatch]
  );

  //If profileId has been passed, pull the profile from appstore json and push it to the state
  //else create new profile
  useEffect(() => {
    allProfiles && profileId && updateStateWithProfile(allProfiles, profileId);
  }, [allProfiles, profileId, updateStateWithProfile]);
  const { isDirty } = allState.dirty;
  const toast = useToast();

  useEffect(() => {
    //isDirty && onOpen();
    isDirty &&
      toast({
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
  }, [isDirty, toast]);

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

                <DragDropContext
                  onDragEnd={(params) => {
                    console.log(params);
                    const srcI = params.source.index;
                    const destI = params.destination?.index || 0;
                    const newList = [...allState.componentOrder.order];
                    newList.splice(destI, 0, newList.splice(srcI, 1)[0]);
                    console.log(newList);
                    //setList(newList);
                    dispatch(setOrder({ order: newList }));
                    if (srcI !== destI) {
                      dispatch(setDirty({ isDirty: true }));
                    }
                  }}
                >
                  <Droppable droppableId="componentsDroppable">
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.droppableProps}>
                        <Flex w="full" alignItems="stretch">
                          <Box pl={2} pt={6} mb={2} bg="white">
                            <Grabber disabled />
                          </Box>
                          <Box flex={1}>
                            <BasicInfo />
                          </Box>
                        </Flex>

                        {allState.componentOrder.order &&
                          allState.componentOrder.order.map(
                            (elname: string, i: number) => {
                              const Comp = ComponentsMap[elname];
                              return (
                                <Draggable
                                  key={i}
                                  draggableId={`dragElem${i}`}
                                  index={i}
                                >
                                  {(provided) => (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                    >
                                      <Flex w="full" alignItems="stretch">
                                        <Box
                                          {...provided.dragHandleProps}
                                          pl={2}
                                          pt={6}
                                          mb={2}
                                          bg="white"
                                        >
                                          <Grabber />
                                        </Box>
                                        <Box flex={1}>
                                          <Comp />
                                        </Box>
                                      </Flex>
                                    </Box>
                                  )}
                                </Draggable>
                              );
                            }
                          )}
                        <Box
                          fontSize="sm"
                          bg="primary.100"
                          p={4}
                          color="gray.700"
                          mb={2}
                          pt={8}
                        >
                          <Heading as="h4" size="sm">
                            Additional sections
                          </Heading>
                          <div>
                            You can add additional sections if the above
                            sections do not meet your purpose. These will appear
                            at the bottom of your resume document.
                          </div>
                        </Box>
                        <CustomSectionGroup
                          list={allState.customSections.list}
                        />
                        <CustomSectionForm />
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
              </Box>
            </Accordion>
          </Box>
        </Box>

        {showPreview && (
          <Container
            maxW={{ lg: "container.lg", md: "container.lg" }}
            height="100%"
          >
            <Preview />
          </Container>
        )}
      </Flex>
    </Grid>
  );
};

export default ProfileBuilder;

const CustomSectionGroup = ({ list }: { list: any }) => {
  if (!list) {
    return <></>;
  }
  return (
    list &&
    list.map((section: ICustomSection) => {
      return (
        <Box key={section.guid}>
          <Flex w="full" alignItems="stretch">
            <Box pl={2} pt={6} mb={2} bg="white"></Box>
            <Box flex={1}>
              <CustomSection sectionData={section} />
            </Box>
          </Flex>
        </Box>
      );
    })
  );
};
