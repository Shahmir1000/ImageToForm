import React from "react";
import { useField } from "formik";
import { Button, TextField } from "@mui/material";
import { fieldToTextField } from "formik-mui";

export default function FileField({ name, ...props }) {
  const [field, meta, helpers] = useField(name);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
  };

  return (
    <div>
      <TextField
        {...field}
        {...props}
        type="text"
        fullWidth
        variant="outlined"
        label="File Name"
        component={fieldToTextField}
        InputLabelProps={{ shrink: true }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id={`file-${name}`}
      />
      <label htmlFor={`file-${name}`}>
        <Button component="span" variant="contained">
          Upload File
        </Button>
      </label>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </div>
  );
}
