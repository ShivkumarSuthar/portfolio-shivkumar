import { Box, Typography } from "@mui/material";
import LearningMaterials from "@/components/learning-material/LearningMaterialsList";
import LearningMaterialPage from "@/components/learning-material/LearningMaterialPage";

// ✅ Server Component version
export default async function LearningMaterialHandler({ params }) {
  const slug = await params.slug || "";

  if (!slug) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography variant="h4" color="error">
          404 - Page Not Found
        </Typography>
      </Box>
    );
  }

  if (slug === "list") return <LearningMaterials />;
  if (slug === "add") return <LearningMaterialPage slug="add" />;

  const isObjectId = /^[a-f\d]{24}$/i.test(slug);
  if (isObjectId) return <LearningMaterialPage slug={slug} />;

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" color="error">
        404 - Page Not Found
      </Typography>
    </Box>
  );
}
