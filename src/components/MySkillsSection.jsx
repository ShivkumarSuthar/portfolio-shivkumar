import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { data } from "@/data/constant";

function MySkillsSection() {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: data.skills.frontend || [],
      color: "#61DAFB"
    },
    {
      title: "Backend Development", 
      skills: data.skills.backend || [],
      color: "#68A063"
    },
    {
      title: "Database",
      skills: data.skills.database || [],
      color: "#336791"
    },
    {
      title: "Tools & Others",
      skills: [...(data.skills.tools || []), ...(data.skills.languages || [])],
      color: "#FF6B6B"
    }
  ];

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      px: { xs: 2, md: 6 }, 
      py: 4,
      backgroundColor: '#121212',
      overflow: 'hidden',
    }}>
      {/* Header - 15vh */}
      <Box sx={{ 
        textAlign: 'center', 
        height: '15vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mb: 2,
      }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: '#ffffff',
            fontSize: { xs: 24, md: 36 },
            mb: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Tech Stack
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#888888',
            fontSize: { xs: 14, md: 16 },
          }}
        >
          Technologies I work with
        </Typography>
      </Box>

      {/* Skills Grid - 85vh */}
      <Box sx={{ 
        height: '85vh',
        maxWidth: '1200px', 
        mx: 'auto', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Grid container spacing={4} sx={{ height: 'fit-content' }}>
          {skillCategories.map((category, categoryIndex) => (
            <Grid item xs={12} md={6} key={categoryIndex}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backgroundColor: '#1e1e1e',
                  border: '1px solid #2a2a2a',
                  height: { xs: 'auto', md: '320px' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: category.color,
                    boxShadow: `0 8px 32px ${category.color}20`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Category Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: '#ffffff',
                    mb: 4,
                    fontSize: { xs: 18, md: 22 },
                    textAlign: 'center',
                  }}
                >
                  {category.title}
                </Typography>

                {/* Skills Grid */}
                <Grid container spacing={2}>
                  {category.skills.slice(0, 12).map((skill, skillIndex) => (
                    <Grid item xs={4} sm={3} md={4} key={skill}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          p: 2,
                          borderRadius: 3,
                          backgroundColor: '#2a2a2a',
                          border: '1px solid #3a3a3a',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          height: '80px',
                          justifyContent: 'center',
                          '&:hover': {
                            backgroundColor: '#333333',
                            borderColor: category.color,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 4px 16px ${category.color}30`,
                          },
                        }}
                      >
                        {/* Skill Icon (First Letter for now) */}
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            backgroundColor: category.color,
                            color: '#ffffff',
                            fontSize: 14,
                            fontWeight: 700,
                            mb: 1,
                            boxShadow: `0 2px 8px ${category.color}40`,
                          }}
                        >
                          {skill.charAt(0).toUpperCase()}
                        </Avatar>
                        
                        {/* Skill Name */}
                        <Typography
                          sx={{
                            color: '#e0e0e0',
                            fontSize: { xs: 10, md: 11 },
                            fontWeight: 600,
                            textAlign: 'center',
                            lineHeight: 1.2,
                          }}
                        >
                          {skill.length > 8 ? skill.substring(0, 8) + '..' : skill}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>

                {/* Show more indicator */}
                {category.skills.length > 12 && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 1,
                      borderRadius: 2,
                      backgroundColor: category.color,
                      textAlign: 'center',
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#ffffff',
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      +{category.skills.length - 12} more technologies
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Floating Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: { xs: 150, md: 200 },
              height: { xs: 150, md: 200 },
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${skillCategories[i]?.color || '#667eea'}, ${skillCategories[(i + 1) % 4]?.color || '#764ba2'})`,
              opacity: 0.05,
              top: `${20 + i * 20}%`,
              left: `${10 + i * 25}%`,
              animation: `float${i} ${15 + i * 3}s ease-in-out infinite`,
              '@keyframes float0': {
                '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                '33%': { transform: 'translate(20px, -20px) rotate(120deg)' },
                '66%': { transform: 'translate(-20px, 10px) rotate(240deg)' },
              },
              '@keyframes float1': {
                '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                '33%': { transform: 'translate(-15px, -25px) rotate(-120deg)' },
                '66%': { transform: 'translate(25px, 15px) rotate(-240deg)' },
              },
              '@keyframes float2': {
                '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                '50%': { transform: 'translate(-30px, -15px) rotate(180deg)' },
              },
              '@keyframes float3': {
                '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                '50%': { transform: 'translate(15px, -30px) rotate(-180deg)' },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default MySkillsSection;