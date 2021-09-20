import { Box, Heading } from "@chakra-ui/layout";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
type Props = {
  title: string;
  children: React.ReactNode;
};
const AccordionUnit: React.FC<Props> = ({ title, children }) => {
  return (
    <AccordionItem border="none" flex="1">
      {({ isExpanded }: any) => (
        <>
          <AccordionButton _expanded={{ bg: "white" }} px={8} py={4}>
            <Box flex="1" textAlign="left">
              <Heading
                color={isExpanded ? "blue.600" : "black"}
                fontWeight="normal"
                as="h2"
                py={2}
                size="md"
                isTruncated
              >
                {title}
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel px={0} pb={0} backgroundColor="white">
            {children}
            {/* <AboutForm formikbag={formikbag} /> */}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default AccordionUnit;
