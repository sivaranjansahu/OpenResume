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
import { addProject } from "./reducers";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(30, "Too long!"),
  about: Yup.string().required("Required").min(3, "Too short!"),
});

const AddProjectsForm = () => {
  // Use throughout your app instead of plain `useDispatch` and `useSelector`

  const projects = useAppSelector((state) => state.projects.list);
  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        {({ isExpanded }) => (
          <>
            <ToggleButton isExpanded={isExpanded} title="New project form" />
            <AccordionPanel
              px={0}
              // boxShadow="inner"
            >
              <Formik
                initialValues={{
                  title: "",
                  about: "",
                  year: "",
                }}
                onSubmit={(values: any) => {
                  console.log(values);
                  dispatch(addProject({ ...values, id: uuidv4() }));
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
                          type="text"
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
                        colorScheme="blue"
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
