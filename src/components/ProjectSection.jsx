import { data } from '@/data/constant';
import React from 'react';
import { Grid, Box, Typography, IconButton, Container } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Projects() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ pt: 8 }}
    >
      {/* Section Title */}
      <Typography
        variant="h2"
        component="h2"
        fontWeight={700}
        sx={{ fontSize: {xs:"20px",sm:"22px", md:"30px"}, pb: {xs:2, sm:2, md:3}, fontWeight: 600 }}
      >
        .../Projects...
      </Typography>

      {/* Intro */}
      <Typography
        variant="body1"
        sx={{
          mb: { xs: 3, sm: 4, md: 6 },
          fontSize: {xs:"13px", sm:"16px", md:"18px"},
          textAlign: { xs: 'start', sm: 'left' },
        }}
      >
        These projects were created during my free time before joining the
        professional world. They reflect my passion for coding and my desire
        to learn and experiment with new technologies. Each project is a
        testament to my self-driven initiative and enthusiasm for building
        scalable and functional applications.
      </Typography>

      {/* Projects Grid */}
      <Grid container spacing={3}>
        {data.projects.map((project, index) => (
          <Grid item size={{xs: 12, sm: 6}} key={index}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                height: { xs: 250, sm: 300, md: 350 },
                boxShadow: 3,
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                },
              }}
            >
              {/* Project Image */}
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: '0.5s',
                }}
              />

              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  p: 2,
                  opacity: 0,
                  transition: '0.4s',
                  '&:hover': { opacity: 1 },
                }}
              >
                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    transform: 'translateY(-20px)',
                    transition: '0.4s',
                    '&:hover': { transform: 'translateY(0)' },
                  }}
                >
                  {project.title}
                </Typography>

                {/* Tech Stack */}
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {project.tech.map((tech, i) => (
                    <Box
                      key={i}
                      sx={{
                        background: 'rgba(255,255,255,0.2)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                      }}
                    >
                      {tech}
                    </Box>
                  ))}
                </Box>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    mb: 2,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {project.description}
                </Typography>

                {/* Links */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {project.githubLink && (
                    <IconButton
                      component="a"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                  )}
                  {project.liveLink && (
                    <IconButton
                      component="a"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        border: '1px solid rgba(255,255,255,0.3)',
                        color: '#fff',
                        width: 40,
                        height: 40,
                        '&:hover': {
                          background: 'rgba(255,255,255,0.1)',
                          borderColor: 'rgba(255,255,255,0.5)',
                        },
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Projects;
