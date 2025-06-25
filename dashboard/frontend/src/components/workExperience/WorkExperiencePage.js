import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";

import {
  LabeledDatePicker,
  LabeledTagInput,
  LabeledTextField,
} from "../common/CommonFunction";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CodeIcon from "@mui/icons-material/Code";
import { createWorkData } from "../common/services";
import * as Yup from "yup";

function WorkExperiencePage() {
  const navigate = useNavigate();
  const { type,id } = useParams();

  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: "",
      location: "",
      isCurrent: false,
      techStack: [],
      responsibilities: [""],
    },
    validationSchema: Yup.object().shape({
      company: Yup.string().required("Company is required"),
      position: Yup.string().required("Position is required"),
      jobTitle: Yup.string().required("Job title is required"),
      startDate: Yup.string().required("Start date is required"),
      endDate: Yup.string().nullable().when("isCurrent", {
        is: false,
        then: (schema) => schema.required("End date is required"),
        otherwise: (schema) => schema.nullable(),
      }),
      description: Yup.string().required("Description is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      const cleanedResponsibilities = values.responsibilities
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const payload = {
        ...values,
        responsibilities: cleanedResponsibilities,
      };

      createWorkData(payload)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Work experience saved successfully.",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/work-experience/list");
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: err?.response?.data?.message || "Something went wrong.",
          });
        });
    },
  });

  const handleCurrentWorking = (e) => {
    formik.setFieldValue("isCurrent", e.target.checked);
    if (e.target.checked) {
      formik.setFieldValue("endDate", "");
    }
  };

  const handleCancel = () => {
    if (type === "Add") {
      navigate(-1);
    } else {
      formik.resetForm();
    }
  };

  const handleDeleteResponsibility = (index) => {
    if (formik.values.responsibilities.length > 1) {
      const updated = formik.values.responsibilities.filter(
        (_, i) => i !== index
      );
      formik.setFieldValue("responsibilities", updated);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", overflowY: "auto", p: "50px" }}>
      <Stack direction="row" justifyContent="space-between">
        <Stack>
          <Typography variant="h5">{type == 'edit' ? 'Edit' : 'Add'} Work Experience</Typography>
          <Typography variant="body2">
            {type == 'edit' ? 'Edit' : 'Add'} your professional experience and achievements
          </Typography>
        </Stack>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>

      <Box mt={3}>
        <Typography variant="h6">Basic Information</Typography>

        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <Box flex={1}>
              <LabeledTextField
                label="Company Name"
                name="company"
                required
                placeholder="e.g. Google"
                formik={formik}
                fullWidth
              />
            </Box>
            <Box flex={1}>
              <LabeledTextField
                label="Position Name"
                name="position"
                required
                placeholder="e.g. Full Stack Developer"
                formik={formik}
                fullWidth
              />
            </Box>
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <Box flex={1}>
              <LabeledTextField
                label="Job Title"
                name="jobTitle"
                required
                placeholder="e.g. Senior Software Engineer"
                formik={formik}
                fullWidth
              />
            </Box>
            <Box flex={1}>
              <LabeledTextField
                label="Location"
                name="location"
                required
                placeholder="e.g. San Francisco, CA"
                formik={formik}
                fullWidth
              />
            </Box>
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="row" spacing={2} mt={2}>
              <Box flex={1}>
                <LabeledDatePicker
                  label="Start Date"
                  name="startDate"
                  required
                  formik={formik}
                />
              </Box>
              <Box flex={1}>
                <LabeledDatePicker
                  disabled={formik.values.isCurrent}
                  label="End Date"
                  name="endDate"
                  required={!formik.values.isCurrent}
                  formik={formik}
                />
              </Box>
            </Stack>
          </LocalizationProvider>

          <Stack direction="row" alignItems="center" py={1}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isCurrent}
                  onChange={handleCurrentWorking}
                />
              }
              label="I currently work here"
            />
          </Stack>

          <Stack direction="column" spacing={2} mt={2}>
            <Box flex={1}>
              <LabeledTextField
                label="Description"
                name="description"
                required
                placeholder="e.g. A global tech company specializing in cloud solutions"
                formik={formik}
                fullWidth
                multiline
                rows={3}
              />
            </Box>
          </Stack>

          {/* Responsibilities */}
          <Stack direction="column" spacing={2} mt={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <FormatListBulletedIcon />
              <Typography variant="h6">
                Responsibilities & Achievements
              </Typography>
            </Stack>

            {formik.values.responsibilities.map((info, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                spacing={1}
                width="100%"
              >
                <TextField
                  fullWidth
                  placeholder="e.g. Built REST APIs using Node.js"
                  value={info}
                  onChange={(e) => {
                    const updated = [...formik.values.responsibilities];
                    updated[index] = e.target.value;
                    formik.setFieldValue("responsibilities", updated);
                  }}
                />
                <IconButton
                  onClick={() => handleDeleteResponsibility(index)}
                  color="error"
                  disabled={formik.values.responsibilities.length === 1}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            ))}

            <Box width="fit-content">
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                  formik.setFieldValue("responsibilities", [
                    ...formik.values.responsibilities,
                    "",
                  ])
                }
              >
                Add Responsibility
              </Button>
            </Box>
          </Stack>

          {/* Tech Stack */}
          <Stack direction="column" spacing={2} py={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CodeIcon />
              <Typography variant="h6">Technologies Used</Typography>
            </Stack>
            <LabeledTagInput
              label="Tech Stack"
              name="techStack"
              formik={formik}
            />
          </Stack>

          {/* Save / Cancel */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

export default WorkExperiencePage;