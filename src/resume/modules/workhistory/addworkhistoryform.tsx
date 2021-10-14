import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Grid,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, FormikBag, FormikState } from "formik";
import { v4 as uuidv4, validate } from "uuid";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { months } from "../../../shared/constants";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import ToggleButton from "../../components/togglebutton";
import { addWorkHistory } from "./reducers";

const validationSchema = Yup.object({
  employedIn: Yup.string().required("Required"),
  jobTitle: Yup.string().required("Required"),
  jobDescription: Yup.string().required("Required"),
  fromMonth: Yup.string().required("Required"),

  jobLocation: Yup.string().required("Required"),
  isCurrent: Yup.boolean(),
  fromYear: Yup.number()
    //.required("Required")
    .min(1900, "Must be a valid year")
    .max(2030, "Must be a valid year"),
  // toYear: Yup.number()
  //   //.required("Required")
  //   .min(Yup.ref("fromYear"), "Must be a valid year")
  //   .max(2030, "Must be a valid year"),
  toMonth: Yup.string().when("isCurrent", {
    is: false,
    then: Yup.string().required("Must enter To month"),
  }),
  toYear: Yup.number()
    .min(Yup.ref("fromYear"), "To year must be equal to or more than From year")
    .max(2030, "Must be a valid year")
    .when("isCurrent", {
      is: false,
      then: Yup.number().required("Must enter toYear"),
    }),

  //.moreThanOr(Yup.ref("fromYear")),
});

const initVals = {
  employedIn: "",
  jobTitle: "",
  jobDescription: "",
  fromMonth: "Jan",
  toMonth: "Jan",
  fromYear: "",
  toYear: "",
  jobLocation: "",
};

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

              <AccordionPanel
                px={4}
                borderWidth={1}
                mb={4}
                borderColor="primary.200"
              >
                <Heading size="sm" mb={4}>
                  New work history
                </Heading>
                <Formik
                  initialValues={initVals}
                  validateOnMount={true}
                  onSubmit={(values: any, { resetForm, validateForm }) => {
                    dispatch(addWorkHistory({ ...values, id: uuidv4() }));
                    dispatch(setDirty({ isDirty: true }));
                    resetForm({});
                    validateForm();
                  }}
                  validationSchema={validationSchema}
                >
                  {(formik) => (
                    <Form>
                      <VStack gridGap={4} alignItems="flex-start">
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
                            label="Location"
                            name="jobLocation"
                            required
                            help="City/State/Country"
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
                          help="You can separate sentences with '|' character to create bullet points. "
                          required
                        />

                        <Flex gridGap={6}>
                          <Flex gridGap={4}>
                            <FormikControl
                              control="select"
                              label="From"
                              name="fromMonth"
                              options={months}
                              defaultValue="Jan"
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              name="fromYear"
                              label=" &nbsp;"
                              required
                            />
                          </Flex>

                          <Flex gridGap={4} alignItems="baseline">
                            <FormikControl
                              control="select"
                              label="To"
                              name="toMonth"
                              options={months}
                              defaultValue="Jan"
                              disabled={formik.values.isCurrent}
                            />
                            <FormikControl
                              control="input"
                              type="text"
                              label=" &nbsp;"
                              name="toYear"
                              required
                              disabled={formik.values.isCurrent}
                            />
                            <FormikControl
                              control="checkbox"
                              type="boolean"
                              label="Current ?"
                              name="isCurrent"
                            />
                          </Flex>
                        </Flex>

                        <Button
                          type="submit"
                          size="sm"
                          colorScheme="primary"
                          disabled={!formik.isValid}
                        >
                          Add work history
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
