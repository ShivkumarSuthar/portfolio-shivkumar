"use client";

import { data } from "@/data/constant";
import Image from "next/image";
import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function AboutSection() {
  return (
    <Box
      sx={{
        pt: { xs: 8, sm: 4, md: 8 },
      }}
    >
      {/* Top Section */}
      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "20px", sm: "22px", md: "30px" },
              mb: { xs: "1", sm: "2" },
              fontWeight: 600,
            }}
            className="page__title__text"
          >
            ../About me...
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
          <Typography
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: { xs: "13px", sm: "16px", md: "18px" },
              lineHeight: { xs: "25px", sm: "30px", md: "35px" },
            }}
          >
            I'm Shivkumar Suthar, a MERN Stack Developer at Dev Technosys,
            specializing in dynamic, scalable, and high-performance web app with
            expertise in JavaScript, React, and Node.js. At Dev Technosys, a
            CMMI Level 3 certified IT services company, I transform client
            requirements into innovative solutions that meet the needs of
            businesses globally.
          </Typography>
        </Grid>

        {/* Profile Image */}
        <Grid
          item
          size={{ xs: 12, sm: 12, md: 5 }}
          sx={{ display: { xs: "block", md: "none" } }} // same as desktop__d__none
        >
          <Box sx={{ borderRadius: "5px", overflow: "hidden", mt: "20px" }}>
            <Image
              src={data.profile__image}
              alt="shivkumar suthar"
              width={400}
              height={400}
              style={{
                // border: "1px solid #000",
                borderRadius: "5px",
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Skills Section */}
      <Grid container spacing={{ xs: 0, sm: 2, md: 2 }} sx={{ mt: 4 }}>
        <Grid item size={{ xs: 12 }}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.800",
              p: { xs: "10px 15px", sm: "15px 20px" },
              borderRadius: { xs: "20px", sm: "30px" },
              mb: "10px",
              backgroundColor: "grey.800",
              color: "grey.100",
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px", sm: "22px", md: "25px" }, mb: 1 }}
            >
              {Object.keys(data.skills)[0]}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "13px", sm: "16px", md: "18px" } }}
            >
              {data.skills["Front-end"].join(" / ")}
            </Typography>
          </Box>
        </Grid>

        <Grid item size={{ xs: 7, sm: 10, md: 9, lg: 8 }}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "grey.800",
              p: { xs: "10px 15px", sm: "15px 20px" },
              borderRadius: { xs: "20px", sm: "30px" },
              mb: "10px",
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "16px", sm: "22px", md: "25px" }, mb: 1 }}
            >
              {Object.keys(data.skills)[1]}
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "13px", sm: "16px", md: "18px" } }}
            >
              {data.skills["Styles"].join(" / ")}
            </Typography>
          </Box>
        </Grid>

        {/* GitHub & Arrow buttons */}
        <Grid item>
          <Box
            sx={{ mt: 2, display: "flex", alignItems: "center", mb: "10px" }}
          >
            <IconButton
              sx={{
                bgcolor: "black",
                color: "white",
                width: { xs: 45, sm: 50 },
                height: { xs: 45, sm: 50 },
                borderRadius: "50%",
                mr: -1.5,
              }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>
            <IconButton
              sx={{
                bgcolor: "white",
                color: "black",
                width: { xs: 20, sm: 50 },
                height: { xs: 20, sm: 50 },
                borderRadius: "50%",
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>

        {/* Remaining Skills */}
        <Grid item size={{ lg: 4 }} sx={{ mb: "10px" }}>
          <SkillBox
            title={Object.keys(data.skills)[2]}
            list={data.skills["Programming Languages"]}
          />
        </Grid>
        <Grid item size={{ lg: 5 }}>
          <SkillBox
            title={Object.keys(data.skills)[3]}
            list={data.skills["Design"]}
          />
        </Grid>
        <Grid item size={{ lg: 3 }}>
          <SkillBox
            title={Object.keys(data.skills)[5]}
            list={data.skills["Databases"]}
          />
        </Grid>
        <Grid item size={{ md: 6 }}>
          <SkillBox
            title={Object.keys(data.skills)[4]}
            list={data.skills["Tools"]}
          />
        </Grid>
        <Grid item size={{ md: 6 }} sx={{ mb: "10px" }}>
          <Typography
            sx={{
              fontSize: { xs: "13px", sm: "16px", md: "18px" },
              lineHeight: { xs: "25px", sm: "30px", md: "35px" },
            }}
          >
            Duis do elit mollit consequat aliqua culpa laborum commodo
            consectetur voluptate nulla ad exercitation Lorem.
          </Typography>
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <SkillBox
            title={Object.keys(data.skills)[6]}
            list={data.skills["Deployment"]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const SkillBox = ({ title, list }) => (
  <Box
    sx={{
      border: "1px solid",
      borderColor: "grey.800",
      p: { xs: "10px 15px", sm: "15px 20px" },
      borderRadius: { xs: "20px", sm: "30px" },
      mb: "10px",
    }}
  >
    <Typography
      sx={{ fontSize: { xs: "16px", sm: "22px", md: "25px" }, mb: 1 }}
    >
      {title}
    </Typography>
    <Typography sx={{ fontSize: { xs: "13px", sm: "16px", md: "18px" } }}>
      {list.join(" / ")}
    </Typography>
  </Box>
);

export default AboutSection;
