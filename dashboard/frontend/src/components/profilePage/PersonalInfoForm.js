import React from 'react';
import { Box, Stack, Typography, Button } from '@mui/material';
import { useFormik } from 'formik';
import { LabeledTextField } from '../common/CommonFunction';

const PersonalInfoForm = () => {
  const formik = useFormik({
    initialValues: {
      full_name: 'shivkumar suthar',
      title: 'mern stack developer',
      bio: 'Passionate full-stack developer...',
      email: 'shiv.str21@gmail.com',
      phone: '6377290604',
      location: 'jaipur',
    },
    onSubmit: (values) => {
      console.log('Personal Info Submitted:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" mb={2}>Personal Information</Typography>

      <LabeledTextField label="Full Name" name="full_name" formik={formik} />
      <LabeledTextField label="Professional Title" name="title" formik={formik} />
      <LabeledTextField label="Bio" name="bio" formik={formik} multiline rows={4} />

      <Stack direction="row" spacing={2}>
        <Box flex={1}>
          <LabeledTextField label="Email" name="email" formik={formik} />
        </Box>
        <Box flex={1}>
          <LabeledTextField label="Phone" name="phone" formik={formik} />
        </Box>
      </Stack>

      <LabeledTextField label="Location" name="location" formik={formik} />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Save
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
