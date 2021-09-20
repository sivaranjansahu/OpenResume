import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { setInitialSkills } from "../resume/modules/skills/reducers";
import ProfileBuilder from "../resume/profilebuilder";
import { channels } from "../shared/constants";
import { useAppDispatch, useAppSelector } from "../store/reduxhooks";
import { IProfile } from "../resume/interfaces/forminterfaces";
import { v4 as uuidv4 } from "uuid";
import CreateProfile from "./createprofilemodal";
import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import ProfileCard from "./profilecard";
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
  const updateState = (data: any) => {
    dispatch(setInitialSkills(data.skills));
  };
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createProfile = (name: string) => {
    const newProfile = {
      proppath: uuidv4(),
      statevalue: {
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

  const deleteProfile = (id: any) => {
    electron.ipcRenderer.send(channels.DELETE_PROFILE, { proppath: id });
    setAllProfiles((prevState) => {
      let newState = { ...prevState };
      delete newState[id];
      return newState;
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
    <Box width="100%" h="100vh">
      {/* <button onClick={() => setProfileData(allState, profileId)}>
        Set data
      </button> */}

      <Switch>
        <Route exact path={path} key={document.location.href}>
          <Box as="section" pt={10} maxW="container.xl" mx="auto">
            <Flex mb={16} justifyContent="space-between">
              <Heading size="lg">Profiles</Heading>
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
    </Box>
  );
}

export default Dashboard;
