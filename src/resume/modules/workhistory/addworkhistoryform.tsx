import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Grid,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { addWorkHistory } from "./reducers";
import { v4 as uuidv4 } from "uuid";
import ToggleButton from "../../components/togglebutton";
import { months } from "../../../shared/constants";

// const months = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ].map((m) => {
//   return { key: m, value: m };
// });

const radioOptions = [
  { key: "Relevant", value: "true" },
  {
    key: "Other",
    value: "false",
  },
];

const validationSchema = Yup.object({
  employedIn: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  jobDescription: Yup.string().required("Required"),
  fromMonth: Yup.string().required("Required"),
  toMonth: Yup.string().required("Required"),
  fromYear: Yup.number()
    .required("Required")
    .min(1900, "Must be a valid year")
    .max(2023, "Must be a valid year"),
  toYear: Yup.number()
    .required("Required")
    .min(1900, "Must be a valid year")
    .max(2023, "Must be a valid year")
    .moreThan(Yup.ref("fromYear")),
});

export default function WorkHistoryForm() {
  const workHistory = useAppSelector((state) => state.workHistory.list);
  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => {
          return (
            <>
              <ToggleButton
                isExpanded={isExpanded}
                title="New work history form"
              />

              <AccordionPanel px={8} backgroundColor="#FAFAFA">
                <Formik
                  initialValues={{}}
                  onSubmit={(values: any) => {
                    dispatch(addWorkHistory({ ...values, id: uuidv4() }));
                  }}
                  validationSchema={validationSchema}
                >
                  {(formik: any) => (
                    <Form>
                      <VStack gridGap={4} alignItems="flex-start">
                        <FormikControl
                          control="radio"
                          label="Relevancy"
                          help="Mark it as relevant to display it in 'Relevant Experiences' section of the resume. You could use this to highlight experiences that are relevant to the job you are applying to."
                          name="category"
                          options={radioOptions}
                          defaultValue="true"
                        />
                        <Grid
                          gridGap={4}
                          width="100%"
                          gridTemplateColumns="1fr 1fr"
                        >
                          <FormikControl
                            control="input"
                            type="text"
                            label="Company"
                            name="employedIn"
                            required
                          />
                          <FormikControl
                            control="input"
                            type="text"
                            label="Role"
                            name="jobTitle"
                            required
                          />
                        </Grid>
                        <FormikControl
                          control="textarea"
                          type="text"
                          label="Description"
                          name="jobDescription"
                          required
                        />

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
          );
        }}
      </AccordionItem>
    </Accordion>
  );
}
