import { Grid } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Dashboard from "./components/dashboard";
import LeftNav from "./components/leftnav";
import TitleBar from "./components/titlebar";
import Learn from "./learn/learn";
import Tracker from "./tracker/tracker";

const titleBarHeight = 50;
function App() {
  return (
    <Grid
      gridTemplateRows={`${titleBarHeight}px 1fr`}
      gridRowGap={0}
      minHeight={window.innerHeight}
      overflow="hidden"
    >
      <TitleBar />
      <Grid
        className="App"
        gridTemplateColumns="80px 1fr"
        bg="#F6F8FA"
      >
        <Router>
          <LeftNav />
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
                <Container width="100%" maxW="1400px" mx="auto">
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
