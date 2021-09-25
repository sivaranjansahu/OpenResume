import React from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  Radio,
  RadioGroup,
  Select as ChakraSelect,
  Checkbox as ChakraCheckbox,
  Stack,
  Switch as ChakraSwitch,
  Textarea as ChakraTextarea,
  Tooltip,
  Text,
} from "@chakra-ui/react";
import {
  Field,
  FieldHelperProps,
  FieldHookConfig,
  FieldProps,
  FormikFormProps,
  FormikProps,
  useField,
} from "formik";
import { useState } from "react";
import * as Yup from "yup";
import {
  InfoIcon,
  PhoneIcon,
  QuestionIcon,
  QuestionOutlineIcon,
} from "@chakra-ui/icons";

interface OtherProps {
  label: string;
}

type Props = {
  label: string;
  props: FieldHookConfig<any>;
};

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Name is required."),
  about: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("This field is required."),
});

export const CInput = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  const { name, type, placeholder, label } = props;
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
  const [field, meta, helpers] = useField(props);
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
  const [field, meta, helpers] = useField(props);
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
  const [field, meta, helpers] = useField(props);
  const [value, setValue] = useState("1");
  return (
    <Radio {...field} type={props.type}>
      First
    </Radio>
    // <RadioGroup {...field} type={props.type} onChange={setValue} value={value}>
    //   <Stack direction="row">
    //     <Radio value="1">First</Radio>
    //     <Radio value="2">Second</Radio>
    //     <Radio value="3">Third</Radio>
    //   </Stack>
    // </RadioGroup>
  );
};

// const MySwitch = ({ field, form, ...props }) => {
//   return <Switch {...field} {...props} />;
// };

// export const CSwitch = (props: OtherProps & FieldHookConfig<string>) => {
//   const [field, meta, helpers] = useField(props);
//   return <Field name="resinclude" component={MySwitch} />;
// };

function Input(props: any) {
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name} fontSize="sm" fontWeight="semibold">
              {label}
            </FormLabel>
            <ChakraInput id={name} {...rest} {...field} size="sm" bg="white" />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

function Textarea(props: any) {
  const { label, name, help, ...rest } = props;
  //let previousLength = 0;
  const [previousLength, setPreviousLength] = useState(0);

  const handleInput = (event: any) => {
    const bullet = "\u2022";
    const newLength = event.target.value.length;
    const characterCode = event.target.value.substr(-1).charCodeAt(0);

    if (newLength > previousLength) {
      if (characterCode === 10) {
        event.target.value = `${event.target.value}${bullet} `;
      } else if (newLength === 1) {
        event.target.value = `${bullet} ${event.target.value}`;
      }
    }

    setPreviousLength(newLength);
    console.log(event.target.value);
  };
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <Flex alignItems="baseline">
              <FormLabel fontSize="sm" htmlFor={name} fontWeight="semibold">
                {label}
              </FormLabel>
              {help && <Text fontSize="10px">{help}</Text>}
            </Flex>
            <ChakraTextarea
              id={name}
              {...rest}
              {...field}
              // onChange={handleInput}
              size="sm"
              bg="white"
            />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
}

function RadioButtons(props: any) {
  const { label, name, options, defaultValue, help, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
          <Flex alignItems="center">
            <FormLabel htmlFor={name} fontSize="sm" fontWeight="semibold">
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
  const { label, name, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <FormControl isInvalid={!!form.errors[name] && !!form.touched[name]}>
          <FormLabel htmlFor={name} fontSize="sm" fontWeight="semibold">
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
  const { label, name, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form }: any) => {
        return (
          <FormControl display="flex" alignItems="center">
            <ChakraSwitch id={name} {...rest} {...field} />
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
    default:
      return <Input {...rest} />;
  }
}
