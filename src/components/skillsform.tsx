import React from "react";
import {
  Flex,
  Box,
  Button,
  Switch,
  Stack,
  Radio,
  FormControl,
  FormLabel,
  VStack,
  List,
  ListItem,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import FormikControl, { CInput, CRadio, CSelect } from "./customprimitives";
import * as Yup from "yup";

import { ISkill } from "../resume/interfaces/forminterfaces";
import { Field, FieldArray, Formik } from "formik";
import AccordionUnit from "./accordionunit";

interface skillsProps {
  values: ISkill[];
  handleChange: any;
}

//Validation schema
const ValidationSchema = Yup.object().shape({
  skillName: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Name is required."),
  skillLevel: Yup.string().required("This field is required."),
  skillYearsExperience: Yup.number().required("This field is required."),
});

//Skills list
const SkillsList: React.FC<{ skills: ISkill[] }> = ({ skills }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Skill</Th>
          <Th>Proficiency</Th>
          <Th isNumeric>Years</Th>
          <Th isNumeric>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {skills.map((skill) => {
          return (
            <Tr>
              <Td> {skill.skillName}</Td>
              <Td> {skill.skillLevel}</Td>
              <Td> {skill.skillYearsExperience}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export const SkillsForm: React.FC<{
  title: string;
  setSkills: any;
  skills: ISkill[];
}> = ({ title, setSkills, skills }) => (
  <Formik
    validationSchema={ValidationSchema}
    initialValues={{
      skillName: "java",
      skillLevel: 1,
      skillYearsExperience: 2,
    }}
    onSubmit={(values, { setSubmitting }) => {
      setSkills((oldArray: ISkill[]) => [...oldArray, values]);
      console.log(values);
    }}
  >
    {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    }) => (
      <Box flex={1}>
        <form onSubmit={handleSubmit}>
          <AccordionUnit title={title}>
            <SkillsList skills={skills} />

            <VStack gridGap={4}>
              <CInput
                name={`skillName`}
                type="text"
                placeholder="skill name"
                label="Skill"
              />

              <Flex gridGap={4} w="100%">
                <CInput
                  name={`skillYearsExperience`}
                  placeholder="skill name"
                  label="Years of exp"
                />

                <FormControl id="fullname">
                  <FormLabel>Proficiency</FormLabel>

                  <Stack
                    direction="row"
                    gridGap={4}
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <Flex alignItems="center" as="label">
                      <Field type="radio" name="skillLevel" value="3" />
                      <Box ml={2}>Expert</Box>
                    </Flex>
                    <Flex alignItems="center" as="label">
                      <Field type="radio" name="skillLevel" value="2" />
                      <Box ml={2}>Intermediate</Box>
                    </Flex>
                    <Flex alignItems="center" as="label">
                      <Field type="radio" name="skillLevel" value="1" />
                      <Box ml={2}>Beginner</Box>
                    </Flex>
                  </Stack>
                </FormControl>
              </Flex>
            </VStack>
            {/* <input
            name="skillYearsExperience"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.skillYearsExperience}
          />
          {errors.skillYearsExperience &&
            touched.skillYearsExperience &&
            errors.skillYearsExperience} */}
            <button type="submit">Submit</button>
          </AccordionUnit>
        </form>
      </Box>
    )}
  </Formik>
);

const SkillsForm2: React.FC<{
  skill: ISkill;
  handleChange: any;
  index: number;
  removeFn: any;
}> = ({ skill, handleChange, index, removeFn }) => {
  return (
    <Flex p="2" marginBottom="2" position="relative">
      <Box size="50%">
        <FormikControl
          name={`skills.${index}.skillName`}
          type="text"
          placeholder="skill name"
          label="Skill"
          required
        />
      </Box>
      <Box size="100px">
        <CInput
          name={`skills.${index}.skillLevel`}
          type="text"
          placeholder="Level"
          label="Level"
        />
      </Box>
      <Box size="100px">
        <CInput
          name={`skills.${index}.skillYearsExperience`}
          type="number"
          placeholder="Years"
          label="Years of experience"
          width="25%"
        />
      </Box>
      <Box position="absolute" right="-2" top="2">
        <button onClick={() => removeFn(index)}>X</button>
      </Box>
    </Flex>
  );
};
// const SkillsArr: React.FC<skillsProps> = ({ values, handleChange }) => {
//   console.log(values);
//   return (
//     <>
//       <FieldArray name="skills">
//         {(arrayHelpers) => {
//           console.log(arrayHelpers);
//           return (
//             <div>
//               {values.map((skill, index) => (
//                 <SkillsForm
//                   key={index}
//                   skill={skill}
//                   handleChange={handleChange}
//                   index={index}
//                   removeFn={arrayHelpers.remove}
//                 />
//               ))}

//               <Button
//                 type="button"
//                 colorScheme="pink"
//                 variant="solid"
//                 onClick={() => {
//                   arrayHelpers.push({
//                     skillName: "",
//                     skillLevel: 1,
//                     skillYearsExperience: 0,
//                   });
//                 }}
//               >
//                 New skill
//               </Button>
//             </div>
//           );
//         }}
//       </FieldArray>
//     </>
//   );
// };

export default React.memo(SkillsForm);
