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
import { addCourse } from "./reducers";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(30, "Too long!"),
  year: Yup.string().required("Required").min(3, "Too short!"),
});

const AddCoursesForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`

  const courses = useAppSelector((state) => state.courses.list);
  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New course form" />
            <AccordionPanel
              px={0}
              // boxShadow="inner"
            >
              <Formik
                initialValues={{
                  title: "",
                  institute: "",
                  year: "",
                }}
                onSubmit={(values: any) => {
                  console.log(values);
                  dispatch(addCourse({ ...values, id: uuidv4() }));
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
                          type="text"
                          label="Year"
                          name="year"
                          required
                        />
                      </Grid>

                      <Button
                        type="submit"
                        size="sm"
                        colorScheme="blue"
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
