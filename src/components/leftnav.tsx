import { Icon } from "@chakra-ui/icons";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { VscBriefcase, VscProject } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function NavUnit({ to, label, icon }: any) {
  return (
    <NavLink exact to="/" activeClassName="selected">
      <Grid
        as="li"
        height="80px"
        mb={4}
        placeItems="center"
        borderLeftWidth={4}
        borderLeftColor="transparent"
        _hover={{
          borderLeftColor: "blue.400",
          color: "blue.600",
        }}
      >
        <Grid placeItems="center">
          <Icon as={icon} boxSize={6} />
          <Text fontSize="12px">{label}</Text>
        </Grid>
      </Grid>
    </NavLink>
  );
}

function LeftNav() {
  return (
    <Box
      as="nav"
      // position="absolute"
      // left="0"
      height="100%"
      width="80px"
      pt={4}
      backgroundColor="white"
      className="leftnav"
    >
      <VStack as="nav" gridGap={2}>
        <Box as="ul" width="100%">
          {/* <NavUnit to="/" label="Home" icon={BiHome} />
          <NavUnit to="/profiles" label="Resumes" icon={BiFoodMenu} /> */}

          <NavLink to="/profiles" activeClassName="selected">
            <Grid
              as="li"
              placeItems="center"
              borderLeftColor="transparent"
              // borderRightColor="blue.600"
              _hover={{ borderLeftColor: "blue.400", color: "blue.600" }}
            >
              <Grid placeItems="center">
                <Icon as={VscBriefcase} boxSize={8} color="gray.400" />
                <Text fontSize="12px">Profiles</Text>
              </Grid>
            </Grid>
          </NavLink>

          <NavLink to="/tracker" activeClassName="selected">
            <Grid
              as="li"
              placeItems="center"
              borderLeftColor="transparent"
              // borderRightColor="blue.600"
              _hover={{ borderLeftColor: "blue.400", color: "blue.600" }}
            >
              <Grid placeItems="center">
                <Icon as={VscProject} boxSize={8} color="gray.400" />
                <Text fontSize="12px">Track</Text>
              </Grid>
            </Grid>
          </NavLink>
        </Box>
      </VStack>
    </Box>
  );
}

export default LeftNav;
