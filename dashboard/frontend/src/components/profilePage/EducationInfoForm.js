import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import { LabeledTextField } from '../common/CommonFunction';

const EducationInfoForm = () => {
  const formik = useFormik({
    initialValues: {
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: '',
    },
    onSubmit: (values) => {
      console.log('Education Info Submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" mb={2}>Education Details</Typography>

      <LabeledTextField label="School / University" name="school" formik={formik} />
      <LabeledTextField label="Degree" name="degree" formik={formik} />
      <LabeledTextField label="Field of Study" name="field" formik={formik} />

      <Stack direction="row" spacing={2}>
        <Box flex={1}>
          <LabeledTextField label="Start Year" name="startYear" formik={formik} />
        </Box>
        <Box flex={1}>
          <LabeledTextField label="End Year" name="endYear" formik={formik} />
        </Box>
      </Stack>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </form>
  );
};

export default EducationInfoForm;
