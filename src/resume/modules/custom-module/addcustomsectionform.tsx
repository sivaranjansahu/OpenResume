import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setDirty } from "../../../store/store";
import { addCustomSection } from "./reducers";

const validationSchema = Yup.object({
  summary: Yup.string()
    .min(20, "Too short!")
    .max(300, "Too long!")
    .required("Required"),
});

export default function CustomSectionBlock() {
  const summary = useAppSelector((state) => state.summary || {});

  const dispatch = useAppDispatch();
  return (
    <Box pb={8}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          summary: summary.content,
        }}
        onSubmit={(values: any) => {
          console.log(values)
          dispatch(addCustomSection({title:"my title",content:values.summary} ));
          dispatch(setDirty({ isDirty: true }));
        }}
        validationSchema={validationSchema}
      >
        {(formik: any) => (
          <Form>
            <VStack gridGap={4} alignItems="flex-start">
              <FormikControl
                control="textarea"
                type="text"
                placeholder="Keep it succint"
                // label="Summary"
                name="summary"
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
  );
}
