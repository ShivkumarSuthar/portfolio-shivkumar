"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home,
  Person,
  Work,
  School,
} from "@mui/icons-material";
import Link from "next/link";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const menuItems = [
    { name: "Home", icon: <Home />, href: "/" },
    { name: "About", icon: <Person />, href: "/about" },
    { name: "Projects", icon: <Work />, href: "/projects" },
    { name: "Learning Material", icon: <School />, href: "/learning-materials/list" },
  ];

  const contactItems = [
    { name: "Phone", value: "+91-XXXXXXXXXX" },
    { name: "Email", value: "shiv.str21@gmail.com" },
  ];

  const MobileDrawer = () => (
    <Drawer
      variant="temporary"
      anchor="right"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "85vw", sm: 320 },
          maxWidth: 400,
          background: "rgba(0, 0, 0, 0.95)",
          color: "white",
          backdropFilter: "blur(20px)",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
        },
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "1.25rem", color: "#ffffff" }}
        >
          Navigation
        </Typography>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            color: "#ffffff",
            p: 1,
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <ListItemButton
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 3,
                mb: 1,
                py: 1.5,
                color: "#e0e0e0",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "#fff",
                  transform: "translateX(6px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{ fontWeight: 400, fontSize: "1rem" }}
              />
            </ListItemButton>
          </Link>
        ))}

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />

        {contactItems.map((item) => (
          <ListItemButton key={item.name} sx={{ pl: 2, mb: 0.5, color: "#ccc" }}>
            <ListItemText
              primary={`${item.name}: ${item.value}`}
              primaryTypographyProps={{ fontSize: "0.9rem" }}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "#121212",
          color: "#fff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            py: { xs: 1, sm: 1.5 },
            minHeight: { xs: 64, sm: 100 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: "#fff",
              fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
              letterSpacing: "-0.5px",
              cursor: "pointer",
              "&:hover": { color: "#f0f0f0", transform: "scale(1.02)" },
              transition: "all 0.3s ease",
            }}
          >
            Shivkumar Suthar
          </Typography>

          {/* Desktop menu (lg and up) */}
          <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1, alignItems: "center" }}>
            {menuItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  startIcon={item.icon}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: 400,
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    fontSize: "0.9rem",
                    minWidth: "auto",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Mobile menu button (below lg) */}
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: "#fff",
                p: 1.5,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  transform: "scale(1.1)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <MobileDrawer />
      </Box>

      {/* Spacer to avoid content overlap */}
      <Toolbar sx={{ minHeight: { xs: 64, sm: 100 } }} />
    </>
  );
};

export default Navbar;
