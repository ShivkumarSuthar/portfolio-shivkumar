import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Divider,
  IconButton,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import FolderIcon from '@mui/icons-material/Folder';
import SkillIcon from '@mui/icons-material/Code';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { createSkillData } from '../common/services';

function SkillForm() {
  const [category, setCategory] = useState('');
  const [newCategoryMode, setNewCategoryMode] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const [skill, setSkill] = useState({
    name: '',
    level: '',
    experience: '',
    experienceUnit: 'Years',
    description: '',
  });

  const handleCreateCategoryToggle = () => setNewCategoryMode(!newCategoryMode);

  const handleSubmit = () => {
    if (!skill.name || !skill.level) {
      Swal.fire({
        icon: 'warning',
        title: 'Skill Name & Level are required!',
        timer: 1500,
      });
      return;
    }

    const payload = {
      category: newCategoryMode ? newCategory.name : category,
      cat_description: newCategoryMode ? newCategory.description : '',
      skills: [
        {
          name: skill.name,
          level: skill.level,
          experienceYears: Number(skill.experience || 0),
          description: skill.description,
        },
      ],
    };

    createSkillData(payload)
      .then(() => {
        Swal.fire({
          title: 'Skill added successfully!',
          icon: 'success',
          timer: 1500,
        });
        navigate('/skills/List');
      })
      .catch((err) => {
        console.log(err,'err')
        Swal.fire({
          title: 'Error occurred!',
          text:err?.responsedata?.message,
          icon: 'error',
          timer: 1500,
        });
      });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'warning';
      case 'Intermediate': return 'info';
      case 'Expert': return 'success';
      default: return 'default';
    }
  };

  return (
    <Stack direction="row" spacing={4} sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Left Section */}
      <Box flex={1}>
        {/* Category Selection */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FolderIcon sx={{ mr: 1 }} /> Category Selection
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant="body2">Select Existing Category</Typography>
                <IconButton size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Box>

              <FormControl fullWidth size="small" disabled={newCategoryMode}>
                <InputLabel>Choose a category</InputLabel>
                <Select
                  displayEmpty
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem value="" disabled>Choose a category</MenuItem>
                  <MenuItem value="frontend">Frontend Development</MenuItem>
                  <MenuItem value="backend">Backend Development</MenuItem>
                  <MenuItem value="devops">DevOps & Infrastructure</MenuItem>
                  <MenuItem value="design">UI/UX Design</MenuItem>
                  <MenuItem value="mobile">Mobile Development</MenuItem>
                  <MenuItem value="data">Data Science</MenuItem>
                </Select>
              </FormControl>

              <Divider>OR</Divider>

              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleCreateCategoryToggle}
                color={newCategoryMode ? 'secondary' : 'primary'}
              >
                {newCategoryMode ? 'Cancel New Category' : 'Create New Category'}
              </Button>

              {newCategoryMode && (
                <Stack spacing={2} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <TextField
                    size="small"
                    label="Category Name"
                    required
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  />
                  <TextField
                    size="small"
                    label="Category Description"
                    multiline
                    rows={2}
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  />
                </Stack>
              )}
            </Stack>
          </CardContent>
        </Card>

        {/* Skill Details */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SkillIcon sx={{ mr: 1 }} /> Skill Details
            </Typography>

            <Stack spacing={2}>
              <TextField
                size="small"
                required
                label="Skill Name"
                placeholder="e.g., React, Node.js, Figma"
                value={skill.name}
                onChange={(e) => setSkill({ ...skill, name: e.target.value })}
                fullWidth
              />

              <FormControl size="small" fullWidth required>
                <InputLabel>Proficiency Level</InputLabel>
                <Select
                  value={skill.level}
                  label="Proficiency Level"
                  onChange={(e) => setSkill({ ...skill, level: e.target.value })}
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Expert">Expert</MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={2}>
                <TextField
                  size="small"
                  type="number"
                  label="Experience"
                  placeholder="2"
                  value={skill.experience}
                  onChange={(e) => setSkill({ ...skill, experience: e.target.value })}
                  inputProps={{ min: 0, max: 50 }}
                  sx={{ flex: 1 }}
                />
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Unit</InputLabel>
                  <Select
                    value={skill.experienceUnit}
                    label="Unit"
                    onChange={(e) => setSkill({ ...skill, experienceUnit: e.target.value })}
                  >
                    <MenuItem value="Years">Years</MenuItem>
                    <MenuItem value="Months">Months</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                size="small"
                multiline
                label="Notes & Description (Optional)"
                rows={3}
                placeholder="Add any notes about your experience, projects, or achievements with this skill..."
                value={skill.description}
                onChange={(e) => setSkill({ ...skill, description: e.target.value })}
                fullWidth
              />

              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Add Skill
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Live Preview Section */}
      <Box sx={{ minWidth: 320, maxWidth: 400 }}>
        <Card sx={{ position: 'sticky', top: 20 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              👁️ Live Preview
            </Typography>

            <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {skill.name || 'Skill Name'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {(newCategoryMode ? newCategory.name : category) || 'Category'}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {skill.level && (
                  <Chip
                    label={skill.level}
                    color={getLevelColor(skill.level)}
                    size="small"
                  />
                )}
                {skill.experience && (
                  <Typography variant="caption" color="text.secondary">
                    {skill.experience} {skill.experienceUnit}
                  </Typography>
                )}
              </Box>
              {skill.description && (
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  {skill.description.substring(0, 100)}
                  {skill.description.length > 100 ? '...' : ''}
                </Typography>
              )}
            </Card>

            <Card variant="outlined" sx={{ bgcolor: 'primary.50' }}>
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                  💡 Tips
                </Typography>
                <Typography variant="body2" component="div">
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.875rem' }}>
                    <li>Use specific skill names (React vs JavaScript)</li>
                    <li>Be honest about your proficiency level</li>
                    <li>Add relevant project experience in notes</li>
                    <li>Create categories to organize skills better</li>
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
}

export default SkillForm;
