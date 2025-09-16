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
        <Typography variant="h5" color="error">
          Material not found
        </Typography>
        <Link href="/learning-materials/list" passHref>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      {/* Title + Back button in same row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h3" gutterBottom>
          {material.title}
        </Typography>
        <Link href="/learning-materials/list" passHref>
          <Button variant="outlined" startIcon={<ArrowBackIcon />}>
            Back
          </Button>
        </Link>
      </Box>

      {/* Content */}
      <Box mt={3}>
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
