import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Chip,
    Grid,
    Card,
    CardContent,
    Switch,
    FormControlLabel,
    Container,
    Avatar,
    InputAdornment,
    Stack,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    ArrowBack,
    Info,
    Code,
    Image,
    Settings,
    CloudUpload,
    Add,
    Close,
    GitHub,
    Launch
} from '@mui/icons-material';
import { createProject, getOneProjectData } from '../common/services';
import { useNavigate, useParams } from 'react-router-dom';

// Validation schema
const validationSchema = Yup.object({
    title: Yup.string()
        .required('Project title is required')
        .min(3, 'Title must be at least 3 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),
    liveUrl: Yup.string().url('Please enter a valid URL'),
    githubUrl: Yup.string().url('Please enter a valid URL'),
    displayOrder: Yup.number()
        .required('Display order is required')
        .min(1, 'Display order must be at least 1')
});

function ProjectAddPage() {
    const [projectData, setProjectData]=useState({})
    const [technologies, setTechnologies] = useState(['React', 'Tailwind CSS']);
    const [newTech, setNewTech] = useState('');
    const [featuredProject, setFeaturedProject] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');
     const [dataLoaded, setDataLoaded] = useState(false);
    const fileInputRef = useRef(null);
    const {type, id} = useParams()

 useEffect(() => {
        if (type !== 'edit') {
            setDataLoaded(true);
            return;
        }

        getOneProjectData({ id: id })
            .then((res) => {
                const data = res.data;
                setProjectData(data);
                setTechnologies(data.techStack || []);
                setFeaturedProject(data.featured || false);
                setFilePreview(data.image);
                setDataLoaded(true);
            })
            .catch(err => {
                console.log(err);
                setSubmitError('Failed to load project data');
                setDataLoaded(true);
            });
    }, [type, id]);


  // Initial values with proper dependency on dataLoaded
    const initialValues = useMemo(() => {
        if (!dataLoaded) {
            return {
                title: '',
                description: '',
                liveUrl: '',
                githubUrl: '',
                displayOrder: 1,
                image: ''
            };
        }

        return {
            title: type === 'edit' ? projectData?.title || '' : '',
            description: type === 'edit' ? projectData?.description || '' : '',
            liveUrl: type === 'edit' ? projectData?.liveUrl || '' : '',
            githubUrl: type === 'edit' ? projectData?.githubUrl || '' : '',
            displayOrder: type === 'edit' ? projectData?.order || 1 : 1,
            image: type === 'edit' ? projectData?.image || '' : ''
        };
    }, [type, projectData, dataLoaded]);


    const Navigate= useNavigate()
    // Formik setup
    const formik = useFormik({
        enableReinitialize: true, 
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            await handleCreateProject(values);
        }
    });

    console.log("formik",formik)


    // File handling
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) { // 10MB limit
                setSubmitError('File size must be less than 10MB');
                return;
            }

            if (!file.type.startsWith('image/')) {
                setSubmitError('Please select an image file');
                return;
            }

            setSelectedFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setSubmitError('');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files[0]) {
            const fakeEvent = { target: { files } };
            handleFileSelect(fakeEvent);
        }
    };

    // Technology management
    const handleAddTechnology = () => {
        if (newTech.trim() && !technologies.includes(newTech.trim())) {
            setTechnologies([...technologies, newTech.trim()]);
            setNewTech('');
        }
    };

    const handleRemoveTechnology = (techToRemove) => {
        setTechnologies(technologies.filter(tech => tech !== techToRemove));
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTechnology();
        }
    };

    // Create project function
    const handleCreateProject = (formValues) => {
        if (technologies.length === 0) {
            setSubmitError('Please add at least one technology');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess('');

        const formData = new FormData();
        formData.append('title', formValues.title);
        formData.append('description', formValues.description);
        formData.append('liveUrl', formValues.liveUrl || '');
        formData.append('githubUrl', formValues.githubUrl || '');
        formData.append('displayOrder', formValues.displayOrder);
        formData.append('featured', featuredProject);
        formData.append('techStack', JSON.stringify(technologies));
        formData.append('image', formik.values.image);

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        createProject(formData)
            .then((res) => {
                setSubmitSuccess('Project created successfully!');

                // Reset form after success
                setTimeout(() => {
                    formik.resetForm();
                    setTechnologies(['React', 'Tailwind CSS']);
                    setFeaturedProject(false);
                    setSelectedFile(null);
                    setFilePreview(null);
                    setSubmitSuccess('');
                    Navigate("/projects/list")
                }, 2000);
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err.message || 'Failed to create project';
                setSubmitError(message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };


    const handleCancel = () => {
        formik.resetForm();
        setTechnologies(['React', 'Tailwind CSS']);
        setFeaturedProject(false);
        setSelectedFile(null);
        setFilePreview(null);
        setSubmitError('');
        setSubmitSuccess('');
        // Add navigation logic here
        console.log('Form cancelled');
    };

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="md">
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ color: '#1976d2', fontWeight: 600, mb: 0.5 }}>
                            Create New Project
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a new project to your portfolio
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={handleCancel}
                        sx={{ borderColor: '#1976d2', color: '#1976d2' }}
                    >
                        Back
                    </Button>
                </Box>

                {/* Alert Messages */}
                {submitError && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError('')}>
                        {submitError}
                    </Alert>
                )}

                {submitSuccess && (
                    <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitSuccess('')}>
                        {submitSuccess}
                    </Alert>
                )}

                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        {/* Project Details Section */}
                        <Card elevation={1}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                                        <Info fontSize="small" />
                                    </Avatar>
                                    <Typography variant="h6" component="h2" fontWeight={600}>
                                        Project Details
                                    </Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Project Title"
                                        placeholder="e.g. E-commerce Dashboard, Portfolio Website"
                                        name="title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.title && Boolean(formik.errors.title)}
                                        helperText={formik.touched.title && formik.errors.title}
                                        required
                                        variant="outlined"
                                    />

                                    <TextField
                                        fullWidth
                                        label="Description"
                                        placeholder="Describe your project, its features, and what makes it special..."
                                        name="description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                        required
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="Live URL"
                                                placeholder="https://your-project.com"
                                                name="liveUrl"
                                                value={formik.values.liveUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.liveUrl && Boolean(formik.errors.liveUrl)}
                                                helperText={formik.touched.liveUrl && formik.errors.liveUrl}
                                                type="url"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Launch fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                label="GitHub URL"
                                                placeholder="https://github.com/username/repo"
                                                name="githubUrl"
                                                value={formik.values.githubUrl}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                error={formik.touched.githubUrl && Boolean(formik.errors.githubUrl)}
                                                helperText={formik.touched.githubUrl && formik.errors.githubUrl}
                                                type="url"
                                                variant="outlined"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <GitHub fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Technologies Section */}
                        <Card elevation={1}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                                        <Code fontSize="small" />
                                    </Avatar>
                                    <Typography variant="h6" component="h2" fontWeight={600}>
                                        Technologies
                                    </Typography>
                                </Box>

                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            Tech Stack *
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="Type technology and press Enter (e.g. React, Node.js, MongoDB)"
                                                value={newTech}
                                                onChange={(e) => setNewTech(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                variant="outlined"
                                            />
                                            <Button
                                                onClick={handleAddTechnology}
                                                disabled={!newTech.trim()}
                                                variant="contained"
                                                sx={{ minWidth: 'auto', px: 2 }}
                                            >
                                                <Add />
                                            </Button>
                                        </Box>
                                    </Box>

                                    {technologies.length > 0 && (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {technologies.map((tech, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tech}
                                                    onDelete={() => handleRemoveTechnology(tech)}
                                                    deleteIcon={<Close />}
                                                    color="primary"
                                                    variant="outlined"
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Project Image Section */}
                        <Card elevation={1}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                                        <Image fontSize="small" />
                                    </Avatar>
                                    <Typography variant="h6" component="h2" fontWeight={600}>
                                        Project Image
                                    </Typography>
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Upload Project Screenshot
                                    </Typography>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />

                                    <Paper
                                        variant="outlined"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDrop={handleDrop}
                                        sx={{
                                            border: '2px dashed #ccc',
                                            borderRadius: 2,
                                            p: 4,
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                borderColor: '#1976d2',
                                                bgcolor: '#f8f9fa'
                                            }
                                        }}
                                    >
                                        {filePreview ? (
                                            <Box>
                                                <img
                                                    src={filePreview}
                                                    alt="Preview"
                                                    style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                                                />
                                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                    {selectedFile?.name}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <>
                                                <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                                                    Click to upload or drag and drop
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    PNG, JPG up to 10MB
                                                </Typography>
                                            </>
                                        )}
                                    </Paper>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Settings Section */}
                        <Card elevation={1}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
                                        <Settings fontSize="small" />
                                    </Avatar>
                                    <Typography variant="h6" component="h2" fontWeight={600}>
                                        Settings
                                    </Typography>
                                </Box>

                                <Stack spacing={3}>
                                    <TextField
                                        label="Display Order"
                                        name="displayOrder"
                                        type="number"
                                        value={formik.values.displayOrder}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.displayOrder && Boolean(formik.errors.displayOrder)}
                                        helperText={formik.touched.displayOrder && formik.errors.displayOrder || "Lower numbers appear first"}
                                        size="small"
                                        sx={{ width: 200 }}
                                        inputProps={{ min: 1 }}
                                    />

                                    <Box>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={featuredProject}
                                                    onChange={(e) => setFeaturedProject(e.target.checked)}
                                                    color="primary"
                                                />
                                            }
                                            label="Featured Project"
                                        />
                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
                                            Highlight this project on homepage
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                            <Button
                                onClick={handleCancel}
                                variant="outlined"
                                size="large"
                                sx={{ px: 4 }}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ px: 4 }}
                                disabled={isSubmitting || technologies.length === 0}
                                startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                            >
                                {
                                    isSubmitting
                                        ? type !== 'edit'
                                            ? 'Creating...'
                                            : '..saving'
                                        : type !== 'edit'
                                            ? 'Create Project'
                                            : 'Save Changes'
                                }
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Container>
        </Box>
    );
}

export default ProjectAddPage;