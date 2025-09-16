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
    <Container maxWidth={false} sx={{px: { xs: 2, sm: 3, md: 4, lg: 6 }}}>
      {/* Search and Filter */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 4 }}
      >
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={5}
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography variant="h4" gutterBottom>
                Learning Material
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Organize your knowledge by subjects and topics
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
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
            sx={{ bgcolor: "background.paper" }}
          />
          <FormControl fullWidth>
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
          <Box>
            <Link href="/learning-materials/add" passHref>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ height: 50 }}
              >
                Create New
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Results count */}
      {/* Loading */}
      {loading && (
        <Box display="flex" justifyContent="center" py={10}>
          <CircularProgress />
        </Box>
      )}

      {/* List */}
      {!loading && subjects.length > 0 ? (
        <>
          <Grid container spacing={3}>
            {subjects.map((subject) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={subject._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box
                        sx={{
                          bgcolor: getColor(subject.color),
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          mr: 2,
                        }}
                      >
                        <BookIcon />
                      </Box>
                      <Typography variant="h6">
                        {subject.title || "Untitled"}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      {subject.description || "No description available"}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                      mt={1}
                    >
                      Updated {formatDate(subject.updatedAt)}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Link href={`/learning-materials/${subject._id}`} passHref>
                      <Button
                        size="small"
                        startIcon={<FolderOpenIcon />}
                        variant="outlined"
                      >
                        Open
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
