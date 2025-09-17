import { connectDB } from "@/app/lib/mongodb";
import LearningMaterial from "@/app/models/learningMaterials";
import {
  Container,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import parse from "html-react-parser";
import * as cheerio from "cheerio"; // ✅ server-side parser

async function fetchMaterial(id) {
  await connectDB();
  const material = await LearningMaterial.findById(id).lean();
  return JSON.parse(JSON.stringify(material));
}

// ✅ helper: convert HTML into accordion sections
function renderAccordion(content) {
  if (!content) return null;

  const $ = cheerio.load(content);
  const sections = [];
  let currentSection = null;

  $("body")
    .children()
    .each((_, el) => {
      if (/^h[1-6]$/i.test(el.tagName)) {
        // If it's a heading of any level <h1>.. <h6>
        if (currentSection) sections.push(currentSection);
        currentSection = { title: $(el).text(), body: [] };
      } else {
        if (currentSection) {
          currentSection.body.push($.html(el));
        }
      }
    });

  if (currentSection) sections.push(currentSection);

  return sections.map((sec, i) => (
    <Accordion key={i} defaultExpanded={i === 0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={1}>
          {/* Index number */}
          <Typography
            variant="body1"
            color="primary"
            fontWeight={700}
            sx={{
              minWidth: "28px", // keeps alignment neat
              textAlign: "right",
            }}
          >
            {i + 1}.
          </Typography>

          {/* Title */}
          <Typography variant="h6" fontWeight={600}>
            {sec.title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ "& p": { mb: 1 } }}>
          {sec.body.length > 0 ? parse(sec.body.join("")) : <em>No content</em>}
        </Box>
      </AccordionDetails>
    </Accordion>
  ));
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
              textTransform: "none",
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
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            textAlign: "center",
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
      {/* Back button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          component={Link}
          href="/learning-materials/list"
          variant="outlined"
          color="primary"
          startIcon={<ArrowBackIcon />}
          sx={{
            textTransform: "none",
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

      {/* Title */}
      <Box mb={3}>
        <Typography
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "clamp(1.4rem, 4vw, 2rem)",
            lineHeight: 1.3,
            wordBreak: "break-word",
          }}
        >
          {material.title}
        </Typography>
      </Box>

      {/* Accordion Content */}
      <Box mt={3} className="preview-content">
        {material.content ? (
          renderAccordion(material.content)
        ) : (
          <Typography variant="body2" color="text.secondary">
            No content available
          </Typography>
        )}
      </Box>
    </Container>
  );
}
