import {
  Grid,
  Icon,
  useRadio,
  Button,
  Box,
  useRadioGroup,
  HStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";

import {
  RiLayoutLeftLine,
  RiLayoutRightLine,
  RiLayoutTopLine,
} from "react-icons/ri";

// 1. Create a component that consumes the `useRadio` hook
export function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderColor={props.selected ? "secondary.400" : "transparent"}
        borderWidth="3px"
        borderRadius="none"
        boxShadow="md"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        // px={5}
        // py={3}
        p={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

function LayoutPicker({ setLayout, format = "docx", ...props }: any) {
  let options;
  const pdfLayoutOptions = [
    {
      id: "template1",
      icon: RiLayoutRightLine,
    },
    {
      id: "template2",
      icon: RiLayoutLeftLine,
    },
    {
      id: "template3",
      icon: RiLayoutTopLine,
    },
  ];
  const docLayoutOptions = [
    {
      id: "template1",
      icon: RiLayoutRightLine,
    },
    {
      id: "template2",
      icon: RiLayoutLeftLine,
    },
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: (e: any) => {
      console.log(e);
      setLayout(e);
    },
  });

  const group = getRootProps();
  options = format === "docx" ? docLayoutOptions : pdfLayoutOptions;
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            Layout
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <HStack {...group}>
          {options.map(({ id, icon }) => {
            const radio = getRadioProps({ value: id });
            return (
              <RadioCard key={id} {...radio}>
                {/* {id} */}
                <Icon as={icon} />
              </RadioCard>
            );
          })}
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default LayoutPicker;
