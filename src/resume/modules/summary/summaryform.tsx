import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setSummary } from "./reducers";

const validationSchema = Yup.object({
  summary: Yup.string()
    .min(20, "Too short!")
    .max(300, "Too long!")
    .required("Required"),

});

export default function BasicInfoBlock() {
  //const { basicInfo, updateBasicInfo } = useContext(BasicInfoContext);
  const summary = useAppSelector((state) => state.summary || {});
  //const [currentInfo,setCurrentInfo]=setState();

  console.log("summary now", summary);
  const dispatch = useAppDispatch();
  return (
    <Box px={8} pb={8}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          summary: summary.info.summary,
         
        }}
        onSubmit={(values: any) => {
          dispatch(setSummary({ info: values }));
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
                required
              />
             

              <Button
                type="submit"
                size="sm"
                colorScheme="blue"
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
