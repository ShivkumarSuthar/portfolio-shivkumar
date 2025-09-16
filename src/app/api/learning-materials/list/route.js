import { connectDB } from "@/app/lib/mongodb";
import LearningMaterial from "@/app/models/learningMaterials";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || ""; // Get search query
    const skip = (page - 1) * limit;

    // Build the filter for search
    const filter = search
      ? {
          title: { $regex: search, $options: "i" }, // Case-insensitive search on title
        }
      : {};

    const total = await LearningMaterial.countDocuments(filter);

    const materials = await LearningMaterial.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return new Response(
      JSON.stringify({
        materials,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET /learning-materials error:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch materials",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
