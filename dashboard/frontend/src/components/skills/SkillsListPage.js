import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewListIcon from "@mui/icons-material/ViewList";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSkiisListData } from "../common/services";

function SkillsListPage() {
  const [viewMode, setViewMode] = useState("cards");
  const [category, setCategory] = useState("all");
  const [skillListData, setSkillListData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    getSkiisListData()
      .then((res) => {
        if (isMounted) setSkillListData(res.data);
      })
      .catch((err) => {
        if (isMounted) console.error("Error fetching skill list:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSkills = skillListData
    .filter((cat) => category === "all" || cat.category.toLowerCase().includes(category))
    .flatMap((cat) =>
      cat.skills.map((skill) => ({
        category: cat.category,
        name: skill.name,
        level: skill.level,
        experienceYears: skill.experienceYears,
        description: skill.description,
        _id: skill._id,
      }))
    );

  return (
    <Box padding={4}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Stack spacing={1}>
          <Typography variant="h5" fontWeight={600}>
            Skills Portfolio
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and showcase your technical expertise
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField placeholder="Search skills..." size="small" />
          <Button
            variant="outlined"
            component={Link}
            to="/skills/add"
            startIcon={<AddCircleIcon />}
            size="large"
            sx={{ minWidth: 160 }}
          >
            Add Skill
          </Button>
        </Stack>
      </Stack>

      {/* Controls */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" py={2} px={3} bgcolor="#f9f9f9">
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2">View Mode:</Typography>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, value) => value && setViewMode(value)}
            size="small"
          >
            <ToggleButton value="cards">
              <ViewModuleIcon fontSize="small" /> &nbsp;Cards
            </ToggleButton>
            <ToggleButton value="list">
              <ViewListIcon fontSize="small" /> &nbsp;List
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <FormControl size="small">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ borderRadius: "20px", minWidth: 150 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="devops">DevOps</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Skill List */}
      <Stack direction="column" spacing={3} mt={3}>
        {viewMode == "list" ? (
          <Box>
            {/* Table Header */}
            <Stack direction="row" spacing={2} px={2} py={1} bgcolor="#eaeaea" fontWeight="bold">
              <Box width="20%">Category</Box>
              <Box width="20%">Skill</Box>
              <Box width="15%">Level</Box>
              <Box width="15%">Experience</Box>
              <Box flex={1}>Description</Box>
            </Stack>

            {/* Table Rows */}
            {filteredSkills.map((skill) => (
              <Stack
                key={skill._id}
                direction="row"
                spacing={2}
                alignItems="flex-start"
                px={2}
                py={1.5}
                borderBottom="1px solid #eee"
                bgcolor="#fafafa"
              >
                <Box width="20%">
                  <Typography>{skill.category}</Typography>
                </Box>
                <Box width="20%">
                  <Typography>{skill.name}</Typography>
                </Box>
                <Box width="15%">
                  <Typography color="text.secondary">{skill.level || "N/A"}</Typography>
                </Box>
                <Box width="15%">
                  <Typography color="text.secondary">{skill.experienceYears} yrs</Typography>
                </Box>
                <Box flex={1}>
                  <Typography color="text.secondary">{skill.description}</Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        ) : (
          // Cards View Grouped by Category
          skillListData
            .filter((item) => category === "all" || item.category.toLowerCase().includes(category))
            .map((skillCategory) => (
              <Box key={skillCategory._id} p={3} bgcolor="#fff" boxShadow={2} borderRadius={2}>
                <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                  <Button variant="contained" color="primary" sx={{ borderRadius: 20 }}>
                    {skillCategory.category}
                  </Button>
                  <Typography variant="body1" color="text.secondary">
                    {skillCategory.cat_description}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {skillCategory.skills.map((skill) => (
                    <Box
                      key={skill._id}
                      p={2}
                      border="1px solid #ddd"
                      borderRadius={2}
                      minWidth="250px"
                      bgcolor="#f8f9fa"
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Level: {skill.level || "N/A"} | {skill.experienceYears} yrs
                      </Typography>
                      {skill.description && (
                        <Typography variant="body2" mt={1}>
                          {skill.description}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Stack>
              </Box>
            ))
        )}
      </Stack>
    </Box>
  );
}

export default SkillsListPage;
