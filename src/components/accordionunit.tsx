import { Box, Heading } from "@chakra-ui/layout";
import {
  AccordionButton,
  AccordionIcon, AccordionItem, AccordionPanel
} from "@chakra-ui/react";
import React from "react";
type props = {
  title: string;
  children: React.ReactNode;
};
const AccordionUnit: React.FC<props> = ({ title, children }) => {
  return (
    <AccordionItem border="none" flex="1" bg="white">
      <AccordionButton _expanded={{ bg: "gray.200" }}>
        <Box flex="1" textAlign="left">
          <Heading fontWeight="light" as="h2" size="md" isTruncated>
            {title}
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel py={8} px={0}>
        {children}
        {/* <AboutForm formikbag={formikbag} /> */}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AccordionUnit;
