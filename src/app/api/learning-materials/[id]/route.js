import { connectDB } from "@/app/lib/mongodb";
import LearningMaterial from "@/app/models/learningMaterials";
import mongoose from "mongoose";

// GET /api/learning-materials/:id
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } =await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    }

    const material = await LearningMaterial.findById(id);
    if (!material) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(material), { status: 200 });
  } catch (error) {
    console.error(`❌ GET /learning-materials/${params.id} error:`, error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch material", error: error.message }),
      { status: 500 }
    );
  }
}

// PUT /api/learning-materials/:id
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    }

    const data = await req.json();
    const updated = await LearningMaterial.findByIdAndUpdate(id, data, { new: true });

    if (!updated) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    console.error(`❌ PUT /learning-materials/${params.id} error:`, error);
    return new Response(
      JSON.stringify({ message: "Failed to update material", error: error.message }),
      { status: 500 }
    );
  }
}

// DELETE /api/learning-materials/:id
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
    }

    const deleted = await LearningMaterial.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(`❌ DELETE /learning-materials/${params.id} error:`, error);
    return new Response(
      JSON.stringify({ message: "Failed to delete material", error: error.message }),
      { status: 500 }
    );
  }
}
