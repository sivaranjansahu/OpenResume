import { Box, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import React from "react";
const options = ["Pdf", "docx"];
// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props: any) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderLeftRadius={props.index === 0 ? "md" : "none"}
        borderRightRadius={props.index === options.length - 1 ? "md" : "none"}
        boxShadow="md"
        _checked={{
          bg: "blue.600",
          color: "white",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        m={0}
        px={5}
        py={2}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function DownloadType() {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "react",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group} mb={3} gridGap={0}>
      {options.map((value, index) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard
            key={value}
            {...radio}
            index={index}
            sx={{ marginInlineStart: 0 }}
          >
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default DownloadType;
