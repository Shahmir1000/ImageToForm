import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { useQuery } from "@tanstack/react-query";

import { getImageResponse, testAPI } from "../Helper/api.js";
import validateYupSchema from "../Helper/yup-validation";

export default function FormImage() {
  const initialValues = {
    imageName: "",
    imageContent: "",
    fistName: "",
    lastName: "",
    address: "",
    city: "",
    provence: "",
    zip: "",
    country: "",
  };

  const [imageName, setImageName] = useState(null);
  const [imageContent, setImageContent] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const {
    status: userQStatus,
    data: userQData,
    error: userQError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: testAPI,
    enable: false,
    retry: false,
  });

  const {
    status: imageQStatus,
    data: imageQData,
    error: imageQError,
  } = useQuery({
    queryKey: ["imageResponse"],
    queryFn: () => {
      setImageUploaded(false);
      return getImageResponse(imageContent);
    },
    enable: imageUploaded,
    retry: false,
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
        validate={validateYupSchema}
      >
        {(props) => (
          <Form>
            <React.Fragment>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  console.log(file);
                  props.setFieldValue("imageContent", file);
                  props.setFieldValue("imageName", file.name);
                  setImageName(file.name);
                  setImageContent(file);
                  setImageUploaded(true);
                }}
              />
              <Typography variant="h6" gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="firstName"
                    type="text"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="lastName"
                    type="text"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    name="address"
                    type="text"
                    label="Address"
                    fullWidth
                    autoComplete="shipping address-line"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="city"
                    type="text"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="provence"
                    type="text"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    name="country"
                    type="text"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </React.Fragment>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </>
  );
}
