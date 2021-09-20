import { VStack, Button, Box, Grid } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useContext } from "react";
import FormikControl from "../../../components/customprimitives";
import { BasicInfoContext, SkillsContext } from "../../profilebuilder";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Required").max(60, "Too long!"),
  about: Yup.string().required("Required"),
});

export default function BasicInfoBlock() {
  const { basicInfo, updateBasicInfo } = useContext(BasicInfoContext);
  return (
    <Box px={8}>
      <Formik
        initialValues={{}}
        onSubmit={(values: any) => {
          updateBasicInfo && updateBasicInfo({ ...values, id: uuidv4() });
          console.log("values", basicInfo);
        }}
        validationSchema={validationSchema}
      >
        {(formik: any) => (
          <Form>
            <VStack gridGap={4}>
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

              <Button type="submit" disabled={!formik.isValid}>
                Update
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
