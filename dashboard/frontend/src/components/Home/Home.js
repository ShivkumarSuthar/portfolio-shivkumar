import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Skeleton,
  Typography,
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ButtonGroup,
  Tab,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getDashboardData } from '../common/services';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getDashboardData()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, isLoading }) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        minWidth: 200,
        flex: 1,
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {isLoading ? (
        <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto' }} />
      ) : (
        <Typography variant="h5" color="primary" fontWeight="bold">
          {value || 0}
        </Typography>
      )}
    </Paper>
  );

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={3}
        sx={{ mt: 3 }}
        alignItems="stretch"
      >
        <StatCard title="Total Projects" value={data?.totalProjects} isLoading={loading} />
        <StatCard title="Work Experience" value={data?.workExperienceCount} isLoading={loading} />
        <StatCard title="Total Skills" value={data?.totalSkills} isLoading={loading} />
        <StatCard title="Testimonials" value="Coming Soon" isLoading={loading} />
      </Stack>

      <Box mt={5}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2">
            Recent Projects
          </Typography>
          <Button variant="contained" component={Link} to="/projects/list">
            View All
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table aria-label="recent projects table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Live URL</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="90%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="80%" />
                    </TableCell>
                  </TableRow>
                ))
              ) : data?.recentProjects?.length ? (
                data.recentProjects.map((project, index) => (
                  <TableRow key={project._id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{project?.title || 'N/A'}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="body2" noWrap title={project?.description}>
                        {project?.description || 'N/A'}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap title={project?.liveUrl}>
                        {project?.liveUrl || 'N/A'}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <ButtonGroup variant="outlined" size="small">
                        <Button>View</Button>
                        <Button>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No recent projects found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>
        </TableContainer>
      </Box>

      <Box mt={5}>

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recent Work History
          </Typography>
          <Button variant="contained" component={Link} to="/work-experience/list">
            View All
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table aria-label="recent work history">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton width="80%" /></TableCell>
                    <TableCell><Skeleton width="90%" /></TableCell>
                    <TableCell><Skeleton width="100%" /></TableCell>
                    <TableCell><Skeleton width="60%" /></TableCell>
                    <TableCell><Skeleton width="70%" /></TableCell>
                  </TableRow>
                ))
              ) : data?.recentWorkHistory?.length ? (
                data.recentWorkHistory.map((job, index) => (
                  <TableRow key={job._id || index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{job?.position || 'N/A'}</TableCell>
                    <TableCell>{job?.company || 'N/A'}</TableCell>
                    <TableCell>{job?.location || 'N/A'}</TableCell>
                    <TableCell>{job?.duration || 'N/A'}</TableCell>
                    <TableCell>
                      <ButtonGroup variant='outlined' size="small">
                        <Button>View</Button>
                        <Button>Delete</Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No work history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

    </Box>
  );
}

export default Home;
