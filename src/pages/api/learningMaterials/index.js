import { connectDB } from "@/lib/mongodb";
import LearningMaterial from "@/models/learningMaterials";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { title, description, content } = req.body;

      if (!title || !description || !content) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newMaterial = new LearningMaterial({ title, description, content });
      await newMaterial.save();
      return res.status(201).json(newMaterial);

    } catch (err) {
      return res.status(500).json({ message: "Error creating material", error: err.message });
    }
  }

  if (req.method === "GET") {
    try {
      const { page = 1, limit = 6 } = req.query;
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const materials = await LearningMaterial.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);

      const total = await LearningMaterial.countDocuments();

      return res.status(200).json({
        data: materials,
        currentPage: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total
      });

    } catch (err) {
      return res.status(500).json({ message: "Error fetching materials", error: err.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
