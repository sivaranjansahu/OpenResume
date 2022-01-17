import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button, Heading,
  VStack
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import ToggleButton from "../../components/togglebutton";
import { addCustomSection } from "./reducers";

const validationSchema = Yup.object({
  summary: Yup.string()
    .min(20, "Too short!")
    .max(300, "Too long!")
    .required("Required"),
});

export default function CustomSectionForm() {
  const summary = useAppSelector((state) => state.summary || {});

  const addSection = (values: any) => {
    dispatch(
      addCustomSection({
        title: values.title,
        content: values.content,
        guid: uuidv4(),
      })
    );
    dispatch(setDirty({ isDirty: true }));
  };

  const dispatch = useAppDispatch();
  return (
    <Accordion allowToggle>
    <AccordionItem border="none">
      {({ isExpanded }) => (
    <>
      <ToggleButton isExpanded={isExpanded} title="New section" label="New section" />
      <AccordionPanel px={4} borderWidth={1} mb={4} borderColor="primary.200">
        <Heading size="sm" mb={4}>
          New section
        </Heading>
        <Box pb={8}>
          <Formik
            enableReinitialize={true}
            initialValues={{
              summary: summary.content,
            }}
            onSubmit={(values: any) => addSection(values)}
            validationSchema={validationSchema}
          >
            {(formik: any) => (
              <Form>
                <VStack gridGap={4} alignItems="flex-start">
                  <FormikControl
                    control="input"
                    type="text"
                    label="Section title"
                    name="title"
                    required
                  />
                  <FormikControl
                    control="textarea"
                    type="text"
                    placeholder="Keep it succint"
                    // label="Summary"
                    name="content"
                    showBullet={false}
                    required
                  />

                  <Button
                    type="submit"
                    size="sm"
                    colorScheme="primary"
                    disabled={!formik.isValid}
                  >
                    Update
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Box>
      </AccordionPanel>
    </>
    )}
    </AccordionItem>
    </Accordion>
  );
}
