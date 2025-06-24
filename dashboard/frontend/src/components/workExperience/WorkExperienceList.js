import {
  Box,
  Button,
  Stack,
  Typography,
  Chip,
  Paper,
  Container,
  ButtonGroup,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkDataList } from "../common/services";
import { Link } from 'react-router-dom';

function WorkExperienceList() {
  const [filterSelected, setFilterSelected] = useState("All");
  const [workData, setWorkData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = ["All", "Full-time", "Part-time", "Remote"];

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setFilterSelected(newValue);
    }
  };

  // Filter work data based on selected filter
  useEffect(() => {
    if (filterSelected === "All") {
      setFilteredData(workData);
    } else {
      const filtered = workData.filter(work => 
        work.type === filterSelected || 
        (filterSelected === "Remote" && work.isRemote)
      );
      setFilteredData(filtered);
    }
  }, [filterSelected, workData]);

  useEffect(() => {
    getWorkDataList()
      .then((res) => {
        if (res.data) {
          setWorkData(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0 && months > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} mo${months > 1 ? 's' : ''}`;
    } else {
      return "Less than 1 month";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, backgroundColor: 'grey.50' }}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", md: "center" }} spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <WorkIcon color="primary" />
              <Typography variant="h4" fontWeight="bold">
                Work History
              </Typography>
            </Stack>
            <Typography variant="body1" color="text.secondary">
              A journey through my professional growth and experience
            </Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} width={{ xs: "100%", md: "auto" }}>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              size="large"
              sx={{ minWidth: 160 }}
            >
              Download Resume
            </Button>
            <Button 
              variant="outlined" 
              component={Link}
              to="/work-experience/Add"
              startIcon={<AddCircleIcon />}
              size="large"
              sx={{ minWidth: 160 }}
            >
              Add Experience
            </Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Filter Section */}
      <Box mb={4}>
        <Typography variant="h6" mb={2} fontWeight="medium">
          Filter by Employment Type
        </Typography>
        <ToggleButtonGroup
          value={filterSelected}
          exclusive
          onChange={handleChange}
          aria-label="employment type filter"
          sx={{
            '& .MuiToggleButton-root': {
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
            },
          }}
        >
          {filterData.map((item) => (
            <ToggleButton key={item} value={item}>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Work Experience Timeline */}
      {filteredData.length > 0 ? (
        <Stack spacing={3}>
          {filteredData.map((work, index) => (
            <Paper 
              key={work._id || index} 
              elevation={2} 
              sx={{ 
                p: 3, 
                position: 'relative',
                '&:hover': {
                  elevation: 4,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              {/* Timeline indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  left: -12,
                  top: 24,
                  width: 24,
                  height: 24,
                  backgroundColor: 'primary.main',
                  borderRadius: '50%',
                  border: '4px solid white',
                  boxShadow: 1,
                }}
              />
              
              {/* Vertical line for timeline */}
              {index < filteredData.length - 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    left: -2,
                    top: 48,
                    width: 2,
                    height: 'calc(100% + 12px)',
                    backgroundColor: 'primary.light',
                  }}
                />
              )}

              <Stack spacing={2}>
                {/* Header with Company and Actions */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" spacing={2}>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" color="primary" mb={0.5}>
                      {work.company}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} flexWrap="wrap">
                      <Typography variant="h6" fontWeight="medium">
                        {work.position}
                      </Typography>
                      {work.isCurrent && (
                        <Chip
                          label="Current"
                          color="success"
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      )}
                      {work?.type && (
                        <Chip
                          label={work?.type}
                          variant="outlined"
                          size="small"
                        />
                      )}
                    </Stack>
                  </Box>
                  
                  <ButtonGroup variant="contained" size="small">
                    <Button component={Link} to={`/work-experience/edit/${work?._id}`}>
                      Edit
                    </Button> 
                    <Button color="error">
                      Delete
                    </Button> 
                  </ButtonGroup>
                </Stack>

                {/* Date Range and Location */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "flex-start", sm: "center" }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarTodayIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(work.startDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                      })}
                      {" – "}
                      {work.isCurrent
                        ? 'Present'
                        : new Date(work.endDate).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                          })}
                    </Typography>
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    {calculateDuration(work.startDate, work.endDate, work.isCurrent)}
                  </Typography>
                  
                  {work.location && (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {work.location}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {/* Description */}
                {work.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    {work.description}
                  </Typography>
                )}

                <Divider />

                {/* Responsibilities */}
                {work.responsibilities && work.responsibilities.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1.5}>
                      Key Responsibilities:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2 }}>
                      {work.responsibilities.map((item, i) => (
                        <Box component="li" key={i} sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {item}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Tech Stack */}
                {work.techStack && work.techStack.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" fontWeight="bold" mb={1.5}>
                      Technologies Used:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {work.techStack.map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          variant="outlined"
                          size="small"
                          sx={{
                            backgroundColor: 'grey.50',
                            '&:hover': {
                              backgroundColor: 'grey.100',
                            },
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Paper>
          ))}
        </Stack>
      ) : (
        <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
          <WorkIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" mb={1}>
            No work experience found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filterSelected !== "All" 
              ? `No ${filterSelected.toLowerCase()} positions found. Try changing the filter.`
              : "Start adding your work experience to build your professional timeline."
            }
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default WorkExperienceList;