"use client";
import React from "react";
import { Grid, Box, Button, Typography, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function HeroSection() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      className="hero__section__wrapper"
    >
      <Grid container spacing={0}>
        {/* Mern-stack title */}
        <Grid
          size={{ xs: 12, md: 6 }}
          order={{ xs: 1, md: 1 }}
          sx={{ pr: { xs: "0", sm: "2" } }}
        >
          <Typography variant="h3" className="title__text1">
            Mern-stack
          </Typography>
        </Grid>

        {/* Projects button */}
        <Grid
          item
          size={{ xs: 12, md: 6 }}
          py={{xs: 2, md: 0}}
          order={{ xs: 4, md: 2 }}
          display="flex"
          justifyContent={{ xs: "start", md: "flex-end" }}
          alignItems="center"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row", // stack on mobile
              alignItems: { xs: "start", md: "center" },
              justifyContent: { xs: "start", md: "flex-end" },
              gap: { xs: 1.5, sm: 2 }, // responsive gap
            }}
          >
            {/* Projects Text */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 300,
                border: "1px solid #fff",
                padding: { xs: "8px 40px", sm: "10px 80px", md: "10px 100px" },
                borderRadius: "100vh",
                background: "#fff",
                color: "#000",
                textAlign: "center",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              }}
              className="projects__text"
            >
              Projects
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: "50%",
                backgroundColor: "#fff",
                color: "#000",
                minWidth: 0,
                width: { xs: 36, sm: 40, md: 48 },
                height: { xs: 36, sm: 40, md: 48 },
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                "& .MuiButton-endIcon": {
                  marginLeft: 0,
                  marginRight: 0,
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
                },

                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                },

                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            />
          </Box>
        </Grid>

        {/* Goal text */}
        <Grid
          size={{ xs: 12, md: 6 }}
          order={{ xs: 3, md: 3 }}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-end"
          sx={{ pr: { xs: "0", sm: "2" } }}
          pt={2}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 0.5,
            }}
            className="description__text2"
          >
            <Typography component="p" variant="body1">
              My goal is to create, maintainable, clean and understandable code
              to make the development process enjoyable.
            </Typography>
          </Box>
        </Grid>

        {/* Developer title */}
        <Grid
          size={{ xs: 12, md: 6 }}
          order={{ xs: 2, md: 4 }}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ pl: 2 }}
        >
          <Typography variant="h3" className="title__text2">
            Developer
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
