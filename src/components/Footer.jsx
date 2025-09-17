"use client";
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Link,
  Stack,
  Tooltip,
} from "@mui/material";
import * as Icons from "@mui/icons-material"; // import all icons dynamically
import { data } from "@/data/constant";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        color: "#fff",
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 6 },
        position: "relative",
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: { xs: 2, md: 4 },
          fontSize: { xs: "30px", sm: "2rem" },
        }}
      >
        Let’s work together
      </Typography>

      {/* Contact Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 0 },
          mt: { xs: 2, md: 4 },
        }}
      >
        {/* Email */}
        <Link
          href="mailto:shiv.str21@gmail.com"
          underline="none"
          sx={{
            color: "#fff",
            fontSize: { xs: "13px", sm: "16px", md: "18px" },
            transition: "0.3s",
            "&:hover": { color: "#B4DE50" },
          }}
        >
          shiv.str21@gmail.com
        </Link>

        {/* Socials */}
        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 3 }}
          sx={{ justifyContent: "center" }}
        >
          {data.socialLinks.map((item, i) => {
            const IconComp = Icons[item.icon] || Icons.Link;
            return (
              <Tooltip key={i} title={item.label} arrow>
                <IconButton
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    transition: "0.3s",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
                  }}
                >
                  <IconComp />
                </IconButton>
              </Tooltip>
            );
          })}
        </Stack>

        {/* Phone */}
        <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Link
            href="tel:+916377290604"
            underline="none"
            sx={{
              display: "block",
              color: "#fff",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontWeight: 500,
              transition: "0.3s",
              "&:hover": { color: "#B4DE50" },
            }}
          >
            +91 6377290604
          </Link>
          <Typography
            variant="body2"
            sx={{
              color: "#888",
              fontSize: "0.85rem",
              mt: 0.5,
            }}
          >
            Thane, Mumbai (IND)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
