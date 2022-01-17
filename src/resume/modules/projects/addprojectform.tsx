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
import { addProject } from "./reducers";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(60, "Too long!"),
  about: Yup.string().required("Required").min(3, "Too short!"),
  year: Yup.number()
    .required("Required")
    .min(1900, "Must be a valid year")
    .max(2030, "Must be a valid year"),
});

const AddProjectsForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`

  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New project form" />
            <AccordionPanel
              px={4}
              borderWidth={1}
              mb={4}
              borderColor="primary.200"
            >
              <Heading size="sm" mb={4}>
                New project form
              </Heading>
              <Formik
                validateOnMount={true}
                initialValues={{
                  title: "",
                  about: "",
                  year: "",
                }}
                onSubmit={(values: any, { resetForm, validateForm }) => {
                  dispatch(addProject({ ...values, id: uuidv4() }));
                  dispatch(setDirty({ isDirty: true }));
                  resetForm({});
                  validateForm();
                }}
                validationSchema={validationSchema}
              >
                {(formik: any) => (
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
                          label="Title"
                          name="title"
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
                      <FormikControl
                        control="textarea"
                        type="text"
                        label="About"
                        name="about"
                        help="You can separate sentences with '|' character to create bullet points. "
                        required
                      />

                      <Button
                        type="submit"
                        size="sm"
                        colorScheme="primary"
                        disabled={!formik.isValid}
                      >
                        Add project
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

export default AddProjectsForm;
