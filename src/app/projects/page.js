// pages/coming-soon.js
"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";

export default function ComingSoon() {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        textAlign: "center",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" gutterBottom>
          Coming Soon
        </Typography>
        <Typography variant="h6">
          Our website is under construction. We'll be here soon with something amazing.
        </Typography>
      </Container>
    </Box>
  );
}
