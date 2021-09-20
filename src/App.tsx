import { Box, Grid, VStack } from "@chakra-ui/layout";
import {
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  SlideDirection,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBriefcase, FaColumns, FaHome } from "react-icons/fa";
import { BiFoodMenu, BiBriefcase, BiColumns } from "react-icons/bi";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import Learn from "./learn/learn";
import Tracker from "./tracker/tracker";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState<SlideDirection>("left");

  useEffect(() => {
    console.log("app refresh");
  }, []);
  return (
    <Grid
      className="App"
      gridTemplateColumns="60px 1fr"
      // backgroundColor="#dadada"
      bgGradient="linear(to-r, #F2F2F2, #DBDBDB,#EAEAEA)"
    >
      <Router>
        <Box
          as="nav"
          // position="absolute"
          // left="0"
          height="100vh"
          width="80px"
          backgroundColor="white"
        >
          <VStack as="nav" gridGap={2}>
            <Box as="ul" width="100%">
              <NavLink exact to="/" activeClassName="selected">
                <Grid
                  as="li"
                  height="50px"
                  mb={4}
                  placeItems="center"
                  borderRightWidth={4}
                  borderRightColor="transparent"
                  _hover={{ borderRightColor: "blue.200" }}
                >
                  <Icon as={BiBriefcase} boxSize={6} />
                  <Text fontSize="12px">Resumes</Text>
                </Grid>
              </NavLink>

              <NavLink to="/profiles" activeClassName="selected">
                <Grid
                  as="li"
                  height="50px"
                  mb={4}
                  placeItems="center"
                  borderRightWidth={4}
                  borderRightColor="transparent"
                  // borderRightColor="blue.600"
                  _hover={{ borderRightColor: "blue.200" }}
                >
                  <Icon as={BiFoodMenu} boxSize={6} />
                  <Text fontSize="12px">Profiles</Text>
                </Grid>
              </NavLink>

              <NavLink to="/tracker" activeClassName="selected">
                <Grid
                  as="li"
                  height="50px"
                  placeItems="center"
                  borderRightWidth={4}
                  borderRightColor="transparent"
                  _hover={{ borderRightColor: "blue.200" }}
                >
                  <Icon as={BiColumns} boxSize={6} />
                  <Text fontSize="12px">Track</Text>
                </Grid>
              </NavLink>

              {/* <Box>
                <Link to="/learn">Learn</Link>
              </Box> */}
            </Box>
          </VStack>
          {/* <Button colorScheme="blue" onClick={onOpen} position="absolute">
            Open
          </Button> */}
        </Box>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent sx={{ left: "100px" }}>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody></DrawerBody>
          </DrawerContent>
        </Drawer>
        <Switch>
          <Route path="/profiles" key={document.location.href}>
            <Dashboard key={document.location.href} />
          </Route>
          <Route path="/tracker">
            <Tracker />
          </Route>
          <Route path="/learn">
            <Learn />
          </Route>
          <Route path="/">
            <Container width="100%" maxW="1400px" mx="auto" h="100vh">
              Welcome
            </Container>
          </Route>
        </Switch>
      </Router>
    </Grid>
  );
}

export default App;
