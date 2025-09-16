import { data } from "@/data/constant";
import React from "react";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

function WorkPage() {
  const isSmall = useMediaQuery("(max-width:576px)");

  return (
    <Box sx={{ pt: 1, pt: 5 }}>
      {/* Title */}
      <Grid container>
        <Grid item size={{ xs: 12 }}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              fontSize: { xs: "20px", sm: "22px", md: "30px" },
              mb: { xs: "1", sm: "2" },
              fontWeight: 600,
              textAlign: "end",
              fontWeight: "bold",
              pb: 1,
            }}
          >
            Work Profiles
          </Typography>
        </Grid>
      </Grid>

      {/* Job Boxes */}
      {data.experience.jobs.map((job, index) => (
        <Grid
          container
          key={index}
          sx={{
            // px: { xs: 2, sm: 4, md: 8 },
            py: { xs: 2, sm: 3 },
            borderTop: "1px solid #cccccc65",
            borderBottom: "1px solid #cccccc65",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": {
              backgroundColor: "#cccccc65",
              color: "#000",
            },
          }}
        >
          {/* Left Section (Dates) */}
          <Grid item size={{ xs: 12, md: 3 }}>
            <Typography sx={{ fontSize: { xs: 16, sm: 16,md:18 }, mb: 0.5 }}>
              {job.duration}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 13, sm: 14, md: 18, py: { xs: "10px", sm: 0 } },
                color: "text.secondary",
              }}
            >
              {job.period}
            </Typography>
          </Grid>

          {/* Right Section (Company, Role, Tech) */}
          <Grid item size={{ xs: 13, md: 9 }}>
            <Typography
              sx={{ fontWeight: "bold", fontSize: { xs: 14, sm: 16, md: 18 }, mb: 0 }}
            >
              {job.company}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 18 } }}>
                {job.role}
              </Typography>
              <Typography
                component="span"
                sx={{
                  display: { xs: "none", sm: "inline" },
                  px: 1,
                }}
              >
                |
              </Typography>
              <Typography sx={{ fontSize: { xs: 13, sm: 14, md: 18 } }}>
                {job.tech}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}

      {/* Work Experience Summary */}
      <Grid container>
        <Grid
          item
          size={{ xs: 12 }}
          sx={{
            textAlign: "end",
            // px: { xs: 2, sm: 4, md: 8 },
            pt: { xs: 2, sm: 3 },
          }}
        >
          <Typography
            variant={isSmall ? "subtitle1" : "h6"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <WorkOutlineIcon fontSize="small" />
            Work Experience
          </Typography>
          <Typography
            variant={isSmall ? "body2" : "h5"}
            sx={{ fontWeight: "bold", mt: 0.5 }}
          >
            {data.experience.total}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WorkPage;
