import { VStack } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionPanel, Button,
  Heading
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import ToggleButton from "../../components/togglebutton";
import { addSkill } from "./reducers";

const validationSchema = Yup.object({
  skillName: Yup.string().required("Required").max(30, "Too long!"),
  //skillYearsExperience: Yup.number().required("Required"),
});

const radioOptions = [
  { key: "Expert", value: "3" },
  { key: "Intermediate", value: "2" },
  { key: "Beginner", value: "1" },
];

const AddSkillsForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`


  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New skill form" />
            <AccordionPanel
              px={4}
              borderWidth={1}
              mb={4}
              borderColor="primary.200"
              // boxShadow="inner"
            >
              <Heading size="sm" mb={4}>
                New skill form
              </Heading>
              <Formik
                validateOnMount={true}
                initialValues={{
                  skillName: "",
                  //skillYearsExperience: "",
                  skillLevel: 1,
                }}
                onSubmit={(values: any, { resetForm, validateForm }) => {
                  console.log(values);
                  dispatch(addSkill({ ...values, id: uuidv4() }));
                  dispatch(setDirty({ isDirty: true }));
                  resetForm({});
                  validateForm();
                }}
                validationSchema={validationSchema}
              >
                {(formik: any) => (
                  <Form>
                    <VStack gridGap={4} alignItems="flex-start">
                      <FormikControl
                        control="input"
                        type="text"
                        label="Skill"
                        name="skillName"
                        required
                      />

                      <FormikControl
                        control="radio"
                        label="Proficiency"
                        name="skillLevel"
                        options={radioOptions}
                        defaultValue="1"
                      />

                      <Button
                        type="submit"
                        size="sm"
                        colorScheme="primary"
                        disabled={!formik.isValid}
                      >
                        Add skill
                      </Button>
                    </VStack>
                  </Form>
                )}
              </Formik>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default AddSkillsForm;
