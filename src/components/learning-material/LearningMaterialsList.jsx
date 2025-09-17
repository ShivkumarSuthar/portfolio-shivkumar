"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
} from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import LoadingCard from "./LoadingCard";

// Utility functions
const formatDate = (dateString) => {
  if (!dateString) return "Unknown";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
};

const getColor = (color) => {
  const colorMap = {
    primary: "primary.main",
    success: "success.main",
    info: "info.main",
    warning: "warning.main",
    secondary: "secondary.main",
    danger: "error.main",
  };
  return colorMap[color] || "primary.main";
};

const colorOptions = [
  { value: "", label: "All Colors" },
  { value: "primary", label: "Primary" },
  { value: "success", label: "Success" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "secondary", label: "Secondary" },
  { value: "danger", label: "Danger" },
];

export default function LearningMaterials() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const limit = 6;

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(filter && { filter }),
      });

      const response = await fetch(`/api/learning-materials/list?${params}`);
      const data = await response.json();

      setSubjects(data.materials || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.totalItems || 0);
    } catch (error) {
      console.error("❌ Error fetching materials:", error);
      setSubjects([]);
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [page, debouncedSearch, filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page when search changes
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler); // Clear timeout if user types before 500ms
    };
  }, [search]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
      {/* Search and Filter */}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={3}
        sx={{ py: 4 }}
      >
        {/* Left Section */}
        <Grid item xs={12} md="auto">
          <Box>
            <Typography variant="h4" gutterBottom fontWeight={600}>
              Learning Material
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Organize your knowledge by subjects and topics
            </Typography>
          </Box>
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          md
          sx={{
            display: "flex",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
            justifyContent: { xs: "flex-start", md: "flex-end" },
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search learning materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              bgcolor: "background.paper",
              flex: { xs: "1 1 100%", md: "1 1 40%" }, // full width on mobile, 40% on desktop
            }}
          />

          {/* Filter */}
          <FormControl
            sx={{
              flex: { xs: "1 1 100%", md: "0 0 200px" }, // full width mobile, fixed desktop
            }}
          >
            <InputLabel>Filter by Color</InputLabel>
            <Select
              value={filter}
              onChange={handleFilterChange}
              label="Filter by Color"
              startAdornment={
                <FilterListIcon sx={{ mr: 1, color: "action.active" }} />
              }
            >
              {colorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Create Button */}
          <Link href="/learning-materials/add" passHref>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ whiteSpace: "nowrap", height: 48 }}
            >
              Create New
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/* Results count */}
      {/* Loading */}
      {loading && (
        <Grid container spacing={3}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item size={{xs:12, md:6, lg:4}} key={i}>
              <LoadingCard />
            </Grid>
          ))}
        </Grid>
      )}

      {/* List */}
      {!loading && subjects.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {subjects.map((subject) => (
              <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={subject._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: "hidden",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {/* Colored Header */}
                  <Box
                    sx={{
                      bgcolor: getColor(subject.color),
                      height: 6,
                    }}
                  />

                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Icon + Title */}
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: getColor(subject.color),
                          width: 56,
                          height: 56,
                          borderRadius: 2.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: 28,
                          boxShadow: 2,
                          mr: 2,
                        }}
                      >
                        <BookIcon fontSize="inherit" />
                      </Box>
                      <Typography variant="h6" fontWeight={600}>
                        {subject.title || "Untitled"}
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {subject.description || "No description available"}
                    </Typography>

                    {/* Updated */}
                    <Typography variant="caption" color="text.secondary">
                      Updated {formatDate(subject.updatedAt)}
                    </Typography>
                  </CardContent>

                  {/* Actions */}
                  <CardActions
                    sx={{
                      p: 2,
                      pt: 0,
                      display: "flex",
                      gap: 1,
                      justifyContent: "start",
                    }}
                  >
                    <Link href={`/learning-materials/${subject._id}`} passHref>
                      <Button
                        size="small"
                        startIcon={<FolderOpenIcon />}
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          bgcolor: getColor(subject.color),
                          "&:hover": {
                            bgcolor: getColor(subject.color, true), // darker shade if your fn supports it
                          },
                        }}
                      >
                        Open
                      </Button>
                    </Link>
                    <Link
                      href={`/preview/${subject._id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      passHref
                    >
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          borderRadius: 2,
                          bgcolor: getColor(subject.color),
                          "&:hover": {
                            bgcolor: getColor(subject.color, true), // darker shade if your fn supports it
                          },
                        }}
                      >
                        Preview
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      ) : !loading ? (
        <Box textAlign="center" py={10}>
          <BookIcon sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" color="text.secondary" mb={1}>
            {search || filter
              ? "No matching materials found"
              : "No learning materials found"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {search || filter
              ? "Try adjusting your search criteria or create a new material"
              : "Get started by creating your first learning material"}
          </Typography>
          <Link href="/learning-materials/add" passHref>
            <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 3 }}>
              {search || filter
                ? "Create New Material"
                : "Create First Material"}
            </Button>
          </Link>
        </Box>
      ) : null}
    </Container>
  );
}
