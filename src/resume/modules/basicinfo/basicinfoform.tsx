import { VStack, Button, Box, Grid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useContext } from "react";
import FormikControl from "../../../components/customprimitives";
import { BasicInfoContext, SkillsContext } from "../../profilebuilder";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { setBasicInfo } from "./reducers";
import { useAppDispatch } from "../../../store/reduxhooks";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Required")
    .min(3, "Too short!")
    .max(50, "Too long!"),
  about: Yup.string()
    .min(20, "Too short!")
    .max(300, "Too long!")
    .required("Required"),
  email: Yup.string().email().required("Email is required!"),
  address: Yup.string().required("Address is required!"),
  phoneno: Yup.string().required("Phone number is required!"),
  linkedinUrl: Yup.string().url(),
  website: Yup.string().url(),
});

export default function BasicInfoBlock() {
  //const { basicInfo, updateBasicInfo } = useContext(BasicInfoContext);
  const dispatch = useAppDispatch();
  return (
    <Box px={8} pb={8}>
      <Formik
        initialValues={{}}
        onSubmit={(values: any) => {
          //updateBasicInfo && updateBasicInfo({ ...values, id: uuidv4() });
          dispatch(setBasicInfo({ ...values }));
          console.log("values", values);
        }}
        validationSchema={validationSchema}
      >
        {(formik: any) => (
          <Form>
            <VStack gridGap={4} alignItems="flex-start">
              <FormikControl
                control="input"
                type="text"
                label="Full name"
                name="fullName"
                required
              />
              <FormikControl
                control="textarea"
                type="text"
                label="Short intro"
                name="about"
                required
              />
              <Grid gridGap={4} width="100%" gridTemplateColumns="1fr 1fr">
                <FormikControl
                  control="input"
                  type="text"
                  label="Email"
                  name="email"
                  required
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Address"
                  name="address"
                  required
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Phone no"
                  name="phoneno"
                  required
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="LinkedIn Url"
                  name="linkedinUrl"
                  required
                />
                <FormikControl
                  control="input"
                  type="text"
                  label="Website"
                  name="website"
                  required
                />
              </Grid>

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
