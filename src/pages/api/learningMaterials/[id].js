import { connectDB } from "@/lib/mongodb";
import LearningMaterial from "@/models/learningMaterials";
import mongoose from "mongoose";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    if (req.method === "PUT") {
      const { title, description, content } = req.body;

      if (!title && !description && !content) {
        return res.status(400).json({ message: "No fields provided to update" });
      }

      const updated = await LearningMaterial.findByIdAndUpdate(
        id,
        { title, description, content },
        { new: true, runValidators: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Material not found" });
      }

      return res.status(200).json(updated);
    }

    if (req.method === "DELETE") {
      const deleted = await LearningMaterial.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ message: "Material not found" });
      }

      return res.status(204).end();
    }

    if (req.method === "GET") {
      const post = await LearningMaterial.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Material not found" });
      }

      return res.status(200).json(post);
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}
