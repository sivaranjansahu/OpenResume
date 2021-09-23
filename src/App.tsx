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
import LeftNav from "./components/leftnav";
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
        <LeftNav />
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
