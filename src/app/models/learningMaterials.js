// app/models/learningMaterials.js
import mongoose from "mongoose";

const LearningMaterialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

// ✅ Use mongoose.models directly, never destructure
const LearningMaterial =
  mongoose.models?.LearningMaterial ||
  mongoose.model("LearningMaterial", LearningMaterialSchema);

export default LearningMaterial;
