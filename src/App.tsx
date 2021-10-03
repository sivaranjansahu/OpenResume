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
import { EffectCallback, useEffect, useState } from "react";
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
import TitleBar from "./components/titlebar";
import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

const titleBarHeight = 50;
function App() {
  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  useEffect((): ReturnType<EffectCallback> => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
      
    }
    window.addEventListener('resize', handleResize)

      return ():void => {
        window.removeEventListener('resize', handleResize)
      }
  })

  return (
    <Grid gridTemplateRows={`${titleBarHeight}px 1fr`} gridRowGap={0} minHeight={window.innerHeight} overflow="hidden"  >
      <TitleBar/>
    <Grid
      className="App"
      gridTemplateColumns="80px 1fr"
      // backgroundColor="#dadada"
      bgGradient="linear(to-r, #F2F2F2, #DBDBDB,#EAEAEA)"
    >
      
      <Router>
        <LeftNav />
        {/* <Box bg="purple.400" h={`${window.innerHeight - titleBarHeight}px`} > */}
        <SimpleBar style={{ maxHeight: window.innerHeight - titleBarHeight }}>

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
            <Container width="100%" maxW="1400px" mx="auto" >
              Welcome
            </Container>
          </Route>
        </Switch>
        </SimpleBar>
        {/* </Box> */}
        
      </Router>
    </Grid>
    </Grid>
  );
}

export default App;
