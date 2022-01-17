import { Grid, VStack } from "@chakra-ui/layout";
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
import { addCourse } from "./reducers";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(30, "Too long!"),
  year: Yup.number()
    .required("Required")
    .min(1900, "Must be a valid year")
    .max(2030, "Must be a valid year"),
});

const AddCoursesForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`

  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New course form" />
            <AccordionPanel
              px={4}
              borderWidth={1}
              mb={4}
              borderColor="primary.200"
            >
              <Heading size="sm" mb={4}>
                New course form
              </Heading>
              <Formik
                validateOnMount={true}
                initialValues={{
                  title: "",
                  institute: "",
                  year: "",
                }}
                onSubmit={(values: any, { resetForm, validateForm }) => {
                  dispatch(addCourse({ ...values, id: uuidv4() }));
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
                        label="Course / Certification name"
                        name="title"
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
                          label="Institute"
                          name="institute"
                          required
                        />
                        <FormikControl
                          control="input"
                          type="number"
                          label="Year"
                          name="year"
                          required
                        />
                      </Grid>

                      <Button
                        type="submit"
                        size="sm"
                        colorScheme="primary"
                        disabled={!formik.isValid}
                      >
                        Add
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

export default AddCoursesForm;
