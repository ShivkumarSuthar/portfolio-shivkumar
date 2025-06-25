import { Box, Button, Stack, Typography, Tabs, Tab } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import EducationInfoForm from './EducationInfoForm';

function ProfileLayout() {
  const { type } = useParams();

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h5">Profile Settings</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your personal information and public profile
          </Typography>
        </Box>
        <Button variant="outlined">Dashboard</Button>
      </Stack>

      <Box display="flex" gap={4}>
        {/* Sidebar */}
        <Box display="block">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={1}
            bgcolor="#98A1BC"
            padding={3}
            borderRadius={2}
          >
            <Typography variant="body1" fontWeight="bold">Profile Photo</Typography>
            <Box width={80} height={80} bgcolor="#ccc" borderRadius="50%" />
            <Button variant="text">Change Photo</Button>
          </Box>

          <Box mt={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body2">Social Links</Typography>
              <Button variant="contained">Add Link</Button>
            </Stack>
          </Box>
        </Box>

        {/* Main Section */}
        <Box flex={1}>
          <Tabs value={type} sx={{ mb: 2 }}>
            <Tab label="Personal Info" value="personal" component={Link} to="/profile-details/personal" />
            <Tab label="Education" value="education" component={Link} to="/profile-details/education" />
          </Tabs>

          {type == 'personal' && <PersonalInfoForm />}
          {type == 'education' && <EducationInfoForm />}
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileLayout;
