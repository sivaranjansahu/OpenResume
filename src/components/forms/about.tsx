import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FormikValues } from "formik";

const AboutForm: React.FC<FormikValues> = ({ formikbag1 }) => {
  const { handleChange, values, errors, touched } = formikbag1;
  console.log("errors", errors);
  return (
    <>
      <FormControl id="fullname" mb="1rem" isInvalid={errors.name}>
        <FormLabel>Full name</FormLabel>
        <Input
          type="text"
          name="name"
          defaultValue={values.name}
          onBlur={handleChange}
          required
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      <FormControl id="About" isInvalid={errors.about}>
        <FormLabel>About</FormLabel>
        <Textarea
          placeholder="Here is a sample placeholder"
          name="about"
          defaultValue={values.about}
          onBlur={handleChange}
        />
        <FormErrorMessage>{errors.about}</FormErrorMessage>

        {/* <FormHelperText>
                        We'll never share your email.
                      </FormHelperText> */}
      </FormControl>
    </>
  );
};

export default React.memo(AboutForm);
