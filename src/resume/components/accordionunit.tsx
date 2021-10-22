import { Box, Heading } from "@chakra-ui/layout";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Text,
} from "@chakra-ui/react";
import React from "react";
type Props = {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
};
const AccordionUnit: React.FC<Props> = ({
  title,
  subTitle = " ",
  children,
}) => {
  return (
    <AccordionItem border="none" flex="1">
      {({ isExpanded }: any) => (
        <>
          <AccordionButton
            _hover={{ bg: "white" }}
            px={0}
            pr={0}
            py={2}
            // height="80px"
            alignItems="flex-start"
          >
            <Box flex="1" textAlign="left">
              <Heading
                color={isExpanded ? "primary.400" : "gray.700"}
                fontWeight="semibold"
                as="h2"
                pt={2}
                fontSize="lg"
                isTruncated
                mb={1}
              >
                {title}
              </Heading>
              
              <Text variant="note">{subTitle}</Text>
            </Box>
            <AccordionIcon boxSize={8} />
          </AccordionButton>
          <AccordionPanel px={0} pr={2} pb={0} backgroundColor="white">
            {children}
            {/* <AboutForm formikbag={formikbag} /> */}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
};

export default AccordionUnit;
