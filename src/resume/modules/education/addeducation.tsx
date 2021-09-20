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

export default function EducationForm() {
  //const skills = useAppSelector((state) => state.skills.list);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem border="none">
          {({ isExpanded }) => (
            <>
              <ToggleButton isExpanded={isExpanded} title="Education form" />
              <AccordionPanel
                px={8}
                backgroundColor="#FAFAFA"
                // boxShadow="inner"
              >
                <Formik
                  initialValues={
                    {
                      // skillName: "",
                      // skillYearsExperience: "",
                      // skillLevel: 1,
                    }
                  }
                  onSubmit={(values: any) => {
                    console.log(values);
                    dispatch(addEducation({ ...values, id: uuidv4() }));
                    //   updateSkillsExp &&
                    //     updateSkillsExp({ ...values, id: uuidv4() });
                    //   console.log("values", skillsList);
                    //resetForm();
                  }}
                  //validationSchema={validationSchema}
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
                          colorScheme="blue"
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
    </Box>
  );
}
