import { Icon } from "@chakra-ui/icons";
import { Box, VStack, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { BiBriefcase, BiFoodMenu, BiColumns, BiHome } from "react-icons/bi";
import {
  RiBriefcaseLine,
  RiBriefcaseFill,
  RiBookReadLine,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";

function NavUnit({ to, label, icon }: any) {
  return (
    <NavLink exact to="/" activeClassName="selected">
      <Grid
        as="li"
        height="80px"
        mb={4}
        placeItems="center"
        borderRightWidth={4}
        borderRightColor="transparent"
        _hover={{
          borderRightColor: "blue.400",
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
      height="100vh"
      width="80px"
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
              borderRightColor="transparent"
              // borderRightColor="blue.600"
              _hover={{ borderRightColor: "blue.400", color: "blue.600" }}
            >
              <Grid placeItems="center">
                <Icon as={RiBriefcaseLine} boxSize={6} />
                <Text fontSize="12px">Profiles</Text>
              </Grid>
            </Grid>
          </NavLink>

          <NavLink to="/tracker" activeClassName="selected">
            <Grid
              as="li"
              placeItems="center"
              borderRightColor="transparent"
              // borderRightColor="blue.600"
              _hover={{ borderRightColor: "blue.400", color: "blue.600" }}
            >
              <Grid placeItems="center">
                <Icon as={RiBookReadLine} boxSize={6} />
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
