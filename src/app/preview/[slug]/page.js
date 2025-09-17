import { connectDB } from "@/app/lib/mongodb";
import LearningMaterial from "@/app/models/learningMaterials";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

async function fetchMaterial(id) {
  await connectDB();
  const material = await LearningMaterial.findById(id).lean();
  return JSON.parse(JSON.stringify(material));
}

export default async function LearningMaterialPreview({ params }) {
  const material = await fetchMaterial(params.slug);

  if (!material) {
    return (
      <Container sx={{ py: 5 }}>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            component={Link}
            href="/learning-materials/list"
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none", // keeps "Back" text normal case
              borderRadius: 2,
              px: 2,
              py: 0.5,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Typography
          component="p"
          color="error"
          sx={{
            fontWeight: 600,
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)", // responsive scaling
            textAlign: "center", // optional, makes error stand out
            mt: 2,
          }}
        >
          Material not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      {/* Title + Back button in same row */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          component={Link}
          href="/learning-materials/list"
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none", // keeps "Back" text normal case
            borderRadius: 2,
            px: 2,
            py: 0.5,
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Box mb={3}>
        <Typography
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "clamp(1.4rem, 4vw, 2rem)", // scales between mobile & desktop
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {material.title}
        </Typography>
      </Box>

      {/* Content */}
      <Box mt={3} className="preview-content">
        {material.content ? (
          <Typography
            variant="body1"
            component="div"
            sx={{ whiteSpace: "pre-line" }}
          >
            <span dangerouslySetInnerHTML={{ __html: material.content }} />
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No content available
          </Typography>
        )}
      </Box>
    </Container>
  );
}
