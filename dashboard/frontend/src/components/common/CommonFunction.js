import { Stack, TextField, Typography, Box, Chip } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs'; 
import React from 'react';


export function LabeledTextField({
  label,
  name,
  required = false,
  formik,
  ...props
}) {
  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <TextField
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        {...props}
      />
    </Stack>
  );
}

export function LabeledDatePicker({ label, name, required = false, formik, disabled=false }) {

  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <DatePicker
        value={formik.values[name] ? dayjs(formik.values[name]) : null}
        onChange={(value) => {
          const dateString = value ? value.format('YYYY-MM-DD') : null;
          formik.setFieldValue(name, dateString);
        }}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            onBlur={formik.handleBlur}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            fullWidth
            disabled={disabled}
          />
        )}
      />
    </Stack>
  );
}

export function LabeledTagInput({
  label,
  name,
  required = false,
  formik,
  placeholder = "Type and press Enter",
}) {
  const tags = formik.values[name] || [];
  const [localInput, setLocalInput] = React.useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && localInput.trim()) {
      e.preventDefault();
      const newTag = localInput.trim();

      if (!tags.includes(newTag)) {
        formik.setFieldValue(name, [...tags, newTag]);
      }
      setLocalInput("");
    }
  };

  const handleDelete = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    formik.setFieldValue(name, updatedTags);
  };

  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>

      <TextField
        fullWidth
        name={name}
        placeholder={placeholder}
        value={localInput}
        onChange={(e) => setLocalInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />

      <Stack direction="row" spacing={1} flexWrap="wrap">
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => handleDelete(tag)}
            sx={{
              bgcolor:
                tag.toLowerCase() === "react"
                  ? "#e0edff"
                  : tag.toLowerCase() === "node.js"
                  ? "#d1f7e1"
                  : "#f1f1f1",
              color: "#000",
              borderRadius: "16px",
              fontWeight: 500,
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}