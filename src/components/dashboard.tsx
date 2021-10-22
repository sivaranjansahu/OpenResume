import {
  Box,
  calc,
  Flex,
  Grid,
  Heading,
  Text,
  useDisclosure,
  useToast,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";

import "simplebar/dist/simplebar.css";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IProfile } from "../resume/interfaces/forminterfaces";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import ProfileBuilder from "../resume/profilebuilder";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import CreateProfile from "./createprofilemodal";
import ProfileCard from "./profilecard";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { VscQuestion } from "react-icons/vsc";
//import ProfileForm from "./profileform";
const electron = window.require("electron");

const setProfileData = (allState: any, profileId = "second") => {
  console.log("setting profileid - dashboard", profileId, allState);
  electron.ipcRenderer.send(channels.SET_PROFILE_DATA, {
    proppath: profileId,
    statevalue: allState,
  });
};
type ProfileParams = {
  profileId: string;
};

function Dashboard() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  const dispatch = useAppDispatch();
  const allState = useAppSelector((state) => state);
  const [allProfiles, setAllProfiles] = useState<IProfile[]>([]);
  let { profileId } = useParams<ProfileParams>();
  const toast = useToast();

  const updateState = (data: any) => {
    dispatch(setInitialSkills(data.skills));
  };
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  type createProfileProps = {
    proppath: string;
    stateValue: IProfile;
  };

  type createProfileInputType = {
    proppath: string;
    statevalue: IProfile;
  };

  const createProfile = (name: string) => {
    const newProfile: createProfileInputType = {
      proppath: uuidv4(),
      statevalue: {
        basicInfo: {
          active: true,
          info: {
            fullName: "",
            address: "",
            email: "",
            linkedIn: "",
            phoneno: "",
            website: "",
          },
        },
        skills: {
          active: true,
          list: [],
        },
        workHistory: {
          active: true,
          list: [],
        },
        education: {
          active: true,
          list: [],
        },
        meta: {
          profileName: name,
          profileNotes: "",
          id: uuidv4(),
          lastUpdated: "",
        },
        links: {
          active: true,
          list: [],
        },
        projects: {
          active: true,
          list: [],
        },
        summary: {
          active: true,
          content:""
          // info: {
          //   summary: "",
          // },
        },
        courses: {
          active: true,
          list: [],
        },
        "componentOrder": {
          "order": [
            "summary",
            "skills",
            "workExperience",
            "projects",
            "education",
            "courses",
            "links"
          ]
        },
      },
    };
    electron.ipcRenderer.send(channels.CREATE_PROFILE, newProfile);
    setAllProfiles((prevState) => {
      return {
        ...prevState,
        [newProfile.proppath]: newProfile.statevalue,
      };
    });
  };

  const copyProfile = (allProfiles: IProfile[], id: any) => {
    const newProfile = {
      proppath: uuidv4(),
      statevalue: {
        ...allProfiles[id],
        meta: {
          profileName: "Copy of " + allProfiles[id].meta.profileName,
        },
      },
    };
    electron.ipcRenderer.send(channels.CREATE_PROFILE, newProfile);
    setAllProfiles((prevState) => {
      return {
        ...prevState,
        [newProfile.proppath]: newProfile.statevalue,
      };
    });
  };

  const confirmDelete = () => {
    onOpen();
  };

  const message = `Profiles are like database for your resumes. You should
  create different profiles if you apply to different
  kinds of jobs. For example if you are a Senior Developer
  who is applying to SWE roles as well as PM roles, you
  might want to have 2 different profiles.`;

  const deleteProfile = (id: any) => {
    electron.ipcRenderer.send(channels.DELETE_PROFILE, { proppath: id });
    setAllProfiles((prevState) => {
      let newState = { ...prevState };
      delete newState[id];
      return newState;
    });
    toast({
      title: "Profile deleted",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };
  useEffect(() => {
    //Fire event
    electron.ipcRenderer.send(channels.GET_ALL_PROFILES);
    // Listen for the event
    electron.ipcRenderer.on(channels.GET_ALL_PROFILES, (event, arg) => {
      setAllProfiles(arg);
      //updateState(arg[profileId]);
    });

    // getData();
    // getAllProfiles();
    // Clean the listener after the component is dismounted
    return () => {
      //ipcRenderer.removeAllListeners(channels.GET_ALL_PROFILES);
    };
  }, [location]);
  return (
    <Box width="100%">
      {/* <button onClick={() => setProfileData(allState, profileId)}>
        Set data
      </button> */}
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={300}
          unmountOnExit
        >
          <Switch location={location}>
            <Route exact path={path} key={document.location.href}>
              <Box as="section" pt={6} maxW="1600px" mx="auto" py={10}>
                <Flex mb={16} justifyContent="space-between">
                  <Box>
                    <Heading
                      as="h1"
                      size="lg"
                      mb="4"
                      mr={2}
                      display="flex"
                      alignItems="baseline"
                    >
                      Profiles
                      <Tooltip
                        hasArrow
                        label={message}
                        bg="gray.300"
                        color="black"
                        placement="top"
                      >
                        <Box w={4}>
                          <Icon as={VscQuestion} boxSize={4} ml={2} />
                        </Box>
                      </Tooltip>
                    </Heading>

                    <Box position="relative">
                      <Text variant="note" maxW="container.sm">
                        Resume data can be organized in profiles for quick
                        generation of resumes in different job types.
                      </Text>
                    </Box>
                  </Box>
                  <CreateProfile createProfile={createProfile} />
                </Flex>
                <nav>
                  <Grid
                    gridTemplateColumns="repeat(4,minmax(300px,1fr))"
                    gridGap={8}
                  >
                    {allProfiles &&
                      Object.keys(allProfiles).map((p: any, index: number) => {
                        return (
                          <ProfileCard
                            key={index}
                            url={url}
                            profileKey={p}
                            //profileName={allProfiles[p].meta.profileName}
                            deleteProfile={deleteProfile}
                            copyProfile={copyProfile}
                            allProfiles={allProfiles}
                          />
                        );
                      })}
                  </Grid>
                </nav>
              </Box>
            </Route>
            <Route path={`${path}/:profileId`} key={document.location.href}>
              <ProfileBuilder allProfiles={allProfiles} />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
}

export default memo(Dashboard);
