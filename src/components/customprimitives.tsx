import { QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox as ChakraCheckbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input as ChakraInput,
  Radio,
  RadioGroup,
  Select as ChakraSelect,
  Switch as ChakraSwitch,
  Text,
  Textarea as ChakraTextarea,
  Tooltip,
} from "@chakra-ui/react";
import { Field, FieldHookConfig, FieldProps, useField } from "formik";
import React, { useState } from "react";
import { VscListUnordered } from "react-icons/vsc";
import { dict } from "../shared/dict";

interface OtherProps {
  label: string;
}

export const CInput = (props: OtherProps & FieldHookConfig<string>) => {
  const [, meta] = useField(props);
  const { type, label } = props;
  const [error, setError] = useState(false);
  return (
    <>
      <FormControl isInvalid={error}>
        <FormLabel>{label}</FormLabel>
        <Input
          // {...field}
          type={type}
          onBlur={() => {
            console.log(meta);
            meta.value.length > 0 ? setError(false) : setError(true);
          }}
          required
        />
        <FormErrorMessage>Required field</FormErrorMessage>
      </FormControl>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CTextArea = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl id="fullname">
        <FormLabel>{props.label}</FormLabel>
        <ChakraTextarea {...field} type={props.type} />
      </FormControl>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export const CSelect = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FormControl id="fullname" isInvalid={!!meta.error}>
        <FormLabel>{props.label}</FormLabel>

        <Select placeholder="Select option" {...field} type={props.type}>
          {props.children}
        </Select>
        <FormErrorMessage>Required field</FormErrorMessage>
      </FormControl>
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  );
};

export const CRadio = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, ,] = useField(props);

  return (
    <Radio {...field} type={props.type}>
      First
    </Radio>
  );
};

function Input(props: any) {
  const { label, name, help, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <Flex alignItems="baseline">
              <FormLabel htmlFor={name} fontSize="sm" color="gray.600">
                {label}
              </FormLabel>
              {help && <Text fontSize="10px">{help}</Text>}
            </Flex>

            <ChakraInput id={name} {...rest} {...field} size="sm" bg="white" />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

function listWordsOfInterest(content: string) {
  const blacklist = [];
  const whitelist = [];
  const contentArr: string[] = content.replaceAll(",", "").split(" ");
  for (let i = 0; i < contentArr.length; i++) {
    if ((dict as any).avoid[contentArr[i]]) {
      blacklist.push(contentArr[i]);
    }
    if ((dict as any).synonyms[contentArr[i]]) {
      whitelist.push(contentArr[i]);
    }
  }
  return { blacklist, whitelist };
}

// const markdownContextMenu = Menu.buildFromTemplate([
//   { type: 'separator' },
//   { label: 'Cut', role: 'cut' },
//   { label: 'Copy', role: 'copy' },
//   { label: 'Paste', role: 'paste' },
// ]);

function Textarea(props: any) {
  const { label, name, help, showBullet = true, ...rest } = props;
  const [listActive, setListActive] = useState(false);
  let tbRef: any = null;

  const [, setBlacklist] = useState<string[]>([]);
  const [, setWhitelist] = useState<string[]>([]);
  // useEffect(()=>{
  //   tbRef.addEventListener('contextmenu', (event:any) => {
  //     event.preventDefault();
  //     console.log(event)
  //     //markdownContextMenu.popup();
  //   });
  // },[tbRef])
  const bullet = "\u2022";
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <Box w="full">
            <FormControl isInvalid={form.errors[name] && form.touched[name]}>
              <Flex alignItems="baseline">
                <FormLabel fontSize="sm" htmlFor={name} color="gray.600">
                  {label}
                </FormLabel>
                {help && <Text fontSize="10px">{help}</Text>}
              </Flex>
              <Box
                bg="white"
                border={1}
                borderColor="gray.300"
                borderStyle="solid"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                    {showBullet && (
                      <Button
                        variant="ghost"
                        border="none"
                        p={0}
                        onClick={() => {
                          if (listActive) {
                            setListActive(false);
                          } else {
                            setListActive(true);
                            form.setFieldValue(
                              name,
                              form.values[name] + `\n ${bullet} `
                            );
                          }
                          tbRef.focus();
                        }}
                      >
                        <Icon
                          as={VscListUnordered}
                          boxSize={6}
                          color={listActive ? "gray.900" : "gray.400"}
                        />
                      </Button>
                    )}
                  </Box>
                  <Flex>
                    {/* <Button
                  fontWeight="normal"
                    variant="ghost"
                    disabled={blacklist.length===0}
                    colorScheme={blacklist.length > 0 ? "orange" : "gray"}
                    leftIcon={blacklist.length > 0 ? <VscWarning /> : undefined}
                    onClick={() => (isOpen ? onClose() : onOpen())}
                    size="sm"
                  >
                    Buzzwords found
                  </Button>
                  <Button
                  fontWeight="normal"
                  disabled={whitelist.length===0}
                    variant="ghost"
                    colorScheme={whitelist.length > 0 ? "green" : "gray"}
                    leftIcon={whitelist.length > 0 ? <VscWarning /> : undefined}
                    onClick={() => (isOpen ? onClose() : onOpen())}
                    size="sm"
                  >
                    Alternatives available
                  </Button> */}
                  </Flex>
                </Flex>
                {/* <Hints
                  blacklist={blacklist}
                  whitelist={whitelist}
                  onOpen={onOpen}
                  isOpen={isOpen}
                  onClose={onClose}
                /> */}
                <ChakraTextarea
                  ref={(r) => (tbRef = r)}
                  id={name}
                  {...rest}
                  {...field}
                  // onChange={handleInput}
                  size="sm"
                  bg="white"
                  // onChange={e=>{
                  //   console.log(form.values)
                  // }}
                  onKeyUp={(e) => {
                    if (e.key === " ") {
                      const words = listWordsOfInterest(form.values[name]);
                      setBlacklist(words.blacklist);
                      setWhitelist(words.whitelist);
                    }

                    if (e.key === "Enter" && listActive) {
                      form.setFieldValue(
                        name,
                        form.values[name] + ` ${bullet} `
                      );
                    }
                  }}
                  borderBottom="none"
                  borderLeft="none"
                  borderRight="none"
                />
              </Box>
              <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
            </FormControl>
          </Box>
        );
      }}
    </Field>
  );
}

function RadioButtons(props: any) {
  const { label, name, options, defaultValue, help } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
          <Flex alignItems="center">
            <FormLabel htmlFor={name} fontSize="sm" color="gray.600">
              {label}
            </FormLabel>
            {help && help.length > 0 && (
              <Tooltip label={help} fontSize="md" placement="top">
                <QuestionIcon boxSize={3} color="green.600" />
              </Tooltip>
            )}
          </Flex>

          <RadioGroup
            {...field}
            id={name}
            {...props}
            defaultValue={defaultValue}
          >
            {options.map((option: any, index: number) => (
              <Radio {...field} value={option.value} key={index} mr={5}>
                {option.key}
              </Radio>
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </Field>
  );
}

function Select(props: any) {
  const { label, name, options } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
          <FormLabel htmlFor={name} fontSize="sm" color="gray.600">
            {label}
          </FormLabel>
          <ChakraSelect {...field} id={name} {...props} size="sm" bg="white">
            {options.map((option: any, index: number) => (
              <option {...field} value={option.value} key={index}>
                {option.key}
              </option>
            ))}
          </ChakraSelect>
        </FormControl>
      )}
    </Field>
  );
}

function Switch(props: any) {
  const { name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field }: any) => {
        return (
          <FormControl display="flex" alignItems="center">
            <ChakraSwitch id={name} {...rest} {...field} />
          </FormControl>
        );
      }}
    </Field>
  );
}

function Checkbox(props: any) {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field }: any) => {
        return (
          <FormControl alignItems="center">
            <FormLabel htmlFor={name} fontSize="sm" color="gray.600">
              &nbsp;
            </FormLabel>
            <ChakraCheckbox id={name} {...rest} {...field}>
              {label}
            </ChakraCheckbox>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default function FormikControl(props: any) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "textarea":
      return <Textarea {...rest} />;
    case "radio":
      return <RadioButtons {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "switch":
      return <Switch {...rest} />;
    case "checkbox":
      return <Checkbox {...rest} />;
    default:
      return <Input {...rest} />;
  }
}
