import { Accordion, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Grid, Heading, VStack } from "@chakra-ui/layout";
import { Formik, Form } from "formik";
import FormikControl from "../../../components/customprimitives";
import { months } from "../../../shared/constants";
import ToggleButton from "../../components/togglebutton";
import { addSkill } from "../skills/reducers";
import { addEducation } from "./reducers";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { useAppDispatch } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";

const validationSchema = Yup.object({
  school: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(50, "Too long!"),
  degree: Yup.string().required("Required"),
  major: Yup.string().required("Required"),
  about: Yup.string(),
  fromYear: Yup.number()
    .required("Required")
    .min(1900, "Must be a valid year")
    .max(2030, "Must be a valid year"),
  toYear: Yup.number()
    .required("Required")
    .min(Yup.ref("fromYear"), "Must be a valid year")
    .max(2030, "Must be a valid year"),
});

export default function EducationForm() {
  //const skills = useAppSelector((state) => state.skills.list);
  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="Education form" />
            <AccordionPanel
              px={4}
              borderWidth={1}
              mb={4}
              borderColor="primary.200"
            >
              <Heading size="sm" mb={4}>
                New education form
              </Heading>
              <Formik
                validateOnMount={true}
                initialValues={{
                  school: "",
                  degree: "",
                  major: "",
                  fromMonth: "jan",
                  toMonth: "jan",
                  fromYear: "",
                  toYear: "",
                  about: "",
                }}
                onSubmit={(values: any, { resetForm, validateForm }) => {
                  dispatch(addEducation({ ...values, id: uuidv4() }));
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
                        label="School / University"
                        name="school"
                        required
                      />
                      <Grid
                        gridGap={4}
                        width="100%"
                        gridTemplateColumns="1fr 1fr"
                      >
                        <FormikControl
                          control="input"
                          type="text"
                          label="Degree"
                          name="degree"
                          required
                        />
                        <FormikControl
                          control="input"
                          type="text"
                          label="Field of study"
                          name="major"
                          required
                        />
                      </Grid>

                      <Flex gridGap={6}>
                        <Flex gridGap={4}>
                          <FormikControl
                            control="select"
                            label="From"
                            name="fromMonth"
                            options={months}
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            name="fromYear"
                            label=" &nbsp;"
                            required
                          />
                        </Flex>

                        <Flex gridGap={4}>
                          <FormikControl
                            control="select"
                            label="To"
                            name="toMonth"
                            options={months}
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label=" &nbsp;"
                            name="toYear"
                            required
                          />
                        </Flex>
                      </Flex>
                      <FormikControl
                        control="textarea"
                        type="text"
                        label="About"
                        name="about"
                        required
                      />
                      <Button
                        type="submit"
                        size="sm"
                        colorScheme="primary"
                        disabled={!formik.isValid}
                      >
                        Add education
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
}
