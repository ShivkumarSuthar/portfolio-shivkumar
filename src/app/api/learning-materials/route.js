import { connectDB } from "@/app/lib/mongodb";
import LearningMaterial from "@/app/models/learningMaterials";

// POST /api/learning-materials
export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    if (!data.title || !data.description || !data.content) {
      return new Response(
        JSON.stringify({ message: "Missing required fields" }),
        { status: 400 }
      );
    }

    const newMaterial = await LearningMaterial.create(data);
    return new Response(JSON.stringify(newMaterial), { status: 201 });
  } catch (error) {
    console.error("❌ POST /learning-materials error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to create material", error: error.message }),
      { status: 500 }
    );
  }
}
