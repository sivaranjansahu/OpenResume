import { Box, Button, Grid, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "../../../components/customprimitives";
import { useAppDispatch, useAppSelector } from "../../../store/reduxhooks";
import { setBasicInfo } from "./reducers";

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
  const basicInfo = useAppSelector((state) => state.basicInfo || {});
  //const [currentInfo,setCurrentInfo]=setState();

  console.log("basic info now", basicInfo);
  const dispatch = useAppDispatch();
  return (
    <Box px={8} pb={8}>
      <Formik
        enableReinitialize={true}
        initialValues={{
          fullName: basicInfo.info.fullName,
          about: basicInfo.info.about,
          address: basicInfo.info.address || "",
          email: basicInfo.info.email || "",
          linkedIn: basicInfo.info.linkedIn || "",
          website: basicInfo.info.website || "",
          phoneno: basicInfo.info.phoneno || "",
        }}
        onSubmit={(values: any) => {
          //updateBasicInfo && updateBasicInfo({ ...values, id: uuidv4() });
          dispatch(setBasicInfo({ info: values }));
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
                  name="linkedIn"
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
