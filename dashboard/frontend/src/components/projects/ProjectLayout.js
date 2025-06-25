import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    TextField,
    Paper,
    Grid,
    Chip,
    Avatar,
    CardMedia,
    ButtonGroup
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getProjectData } from '../common/services';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

function ProjectLayout() {
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        getProjectData()
            .then(res => {
                console.log("FULL API RESPONSE:", res);
                console.log("DATA:", res.data);
                setProjectData(res.data || []);
            })
            .catch(err => {
                console.error('Error fetching projects:', err);
            });
    }, []);



    return (
        <Box component="section" p={2}>
            {/* Header */}
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: '100%', mb: 3 }}
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h5" component="h1">
                        My Projects
                    </Typography>
                    <TextField
                        type="search"
                        size="small"
                        placeholder="Search..."
                        variant="outlined"
                        InputProps={{
                            sx: {
                                borderRadius: '100vw',
                                backgroundColor: '#fff',
                            },
                        }}
                    />
                </Stack>

                <Button variant="contained" component={Link} to="/projects/add">
                    + Add New Project
                </Button>
            </Stack>


            {console.log("projectData", projectData)}
            {/* Project Grid */}
            <Grid container spacing={3}>
                {projectData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                        <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {/* Image */}
                            {item.image && (
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt={item.title}
                                    height="140"
                                    sx={{ borderRadius: 2, objectFit: 'cover' }}
                                />
                            )}

                            {/* Title */}


                            <Stack direction="row" justifyContent='space-between'>
                                <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                                    {item.title}
                                </Typography>

                                <ButtonGroup>
                                    <Button size='small' component={Link} to={`/projects/edit/${item?._id}`}>Edit</Button>
                                    <Button size='small'>Delete</Button>
                                </ButtonGroup>
                            </Stack>

                            {/* Description */}
                            <Typography variant="body2" color="text.secondary">
                                {item.description}
                            </Typography>

                            {/* Tech Stack */}
                            <Stack direction="row" flexWrap="wrap" spacing={1} mt={1}>
                                {item.techStack?.map((tech, idx) => (
                                    <Chip key={idx} label={tech} size="small" />
                                ))}
                            </Stack>

                            {/* Action Buttons */}
                            <Stack direction="row" spacing={1} mt="auto">
                                {item.githubUrl && (
                                    <Button
                                        size="small"
                                        startIcon={<GitHubIcon />}
                                        href={item.githubUrl}
                                        target="_blank"
                                    >
                                        GitHub
                                    </Button>
                                )}
                                {item.liveUrl && (
                                    <Button
                                        size="small"
                                        startIcon={<LaunchIcon />}
                                        href={item.liveUrl}
                                        target="_blank"
                                    >
                                        Live
                                    </Button>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default ProjectLayout;
