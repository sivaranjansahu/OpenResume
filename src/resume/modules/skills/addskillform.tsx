import { Grid, VStack } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import ToggleButton from "../../components/togglebutton";
import { addSkill } from "./reducers";
import { setDirty } from "../../../store/store";

const validationSchema = Yup.object({
  skillName: Yup.string().required("Required").max(30, "Too long!"),
  skillYearsExperience: Yup.number().required("Required"),
});

const radioOptions = [
  { key: "Expert", value: "3" },
  { key: "Intermediate", value: "2" },
  { key: "Beginner", value: "1" },
];

const AddSkillsForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`

  const skills = useAppSelector((state) => state.skills.list);

  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New skill form" />
            <AccordionPanel
              px={0}
              // boxShadow="inner"
            >
              <Formik
                initialValues={{
                  skillName: "",
                  skillYearsExperience: "",
                  skillLevel: 1,
                }}
                onSubmit={(values: any) => {
                  console.log(values);
                  dispatch(addSkill({ ...values, id: uuidv4() }));
                  dispatch(setDirty({ isDirty: true }));
                }}
                validationSchema={validationSchema}
              >
                {(formik: any) => (
                  <Form>
                    <VStack gridGap={4} alignItems="flex-start">
                      <Grid
                        gridGap={4}
                        width="100%"
                        gridTemplateColumns="2fr 1fr"
                      >
                        <FormikControl
                          control="input"
                          type="text"
                          label="Skill"
                          name="skillName"
                          required
                        />

                        <FormikControl
                          control="input"
                          type="number"
                          label="Number of years"
                          name="skillYearsExperience"
                          required
                        />
                      </Grid>

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
                        colorScheme="blue"
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
