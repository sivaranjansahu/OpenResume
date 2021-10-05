import { Box, Heading } from "@chakra-ui/layout";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Text
} from "@chakra-ui/react";
import React from "react";
type Props = {
  title: string;
  subTitle?:string;
  children: React.ReactNode;
};
const AccordionUnit: React.FC<Props> = ({ title,subTitle=" ", children }) => {
  return (
    <AccordionItem border="none" flex="1">
      {({ isExpanded }: any) => (
        <>
          <AccordionButton _expanded={{ bg: "white" }} _hover={{ bg: "white" }} px={8} py={4} height="92px"  alignItems="flex-start">
         
            
            <Box flex="1" textAlign="left">
              <Heading
                color={isExpanded ? "blue.600" : "gray.700"}
                fontWeight="semibold"
                as="h2"
                pt={2}
                fontSize="lg"
                isTruncated
                mb={1}
              >
                {title}
              </Heading>
              <Text variant="note" >{subTitle}</Text>
            </Box>
            <AccordionIcon  boxSize={8} />
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
