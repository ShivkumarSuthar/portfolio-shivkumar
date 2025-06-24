import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Alert,
  Stack,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PaletteIcon from '@mui/icons-material/Palette';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Setting = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" mb={1}>Settings</Typography>
      <Typography variant="body2" mb={3}>Manage your account preferences and configurations</Typography>

      <Grid container spacing={2}>
        {/* Change Password */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <LockIcon color="error" />
              <Typography variant="h6">Change Password</Typography>
            </Stack>
            <Stack spacing={2}>
              <TextField label="Current Password" type="password" fullWidth />
              <TextField label="New Password" type="password" fullWidth />
              <TextField label="Confirm New Password" type="password" fullWidth />
              <Button variant="contained" color="error">Update Password</Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Theme Settings */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <PaletteIcon color="secondary" />
              <Typography variant="h6">Theme Settings</Typography>
            </Stack>
            <Typography variant="body2" mb={1}>Customize your dashboard appearance</Typography>
            <RadioGroup defaultValue="light">
              <FormControlLabel value="light" control={<Radio />} label="Light Mode (Default)" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark Mode (Coming soon…)" disabled />
            </RadioGroup>
          </Paper>
        </Grid>

        {/* API Keys */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <VpnKeyIcon color="primary" />
              <Typography variant="h6">API Keys</Typography>
            </Stack>
            <Alert severity="warning" sx={{ mb: 2 }}>Coming Soon — API key management will be available in a future update.</Alert>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>GitHub API — Not configured</Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>Email Service — Not configured</Typography>
          </Paper>
        </Grid>

        {/* Export Data */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <CloudDownloadIcon color="success" />
              <Typography variant="h6">Export Data</Typography>
            </Stack>
            <Typography variant="body2" mb={1}>Download your portfolio data as backup</Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Export includes all your projects, work history, skills, testimonials, and profile information in JSON format.
            </Alert>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success">Export JSON</Button>
              <Button variant="outlined">Export CSV</Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" mt={2} display="block">
              Last backup: December 15, 2024 at 3:45 PM
            </Typography>
          </Paper>
        </Grid>

        {/* Danger Zone */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, bgcolor: '#fff5f5' }}>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <DeleteForeverIcon color="error" />
              <Typography variant="h6" color="error">Danger Zone</Typography>
            </Stack>
            <Typography variant="body2" mb={2}>
              Permanently delete your account and all associated data
            </Typography>
            <Button variant="contained" color="error">Delete Account</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Setting;
