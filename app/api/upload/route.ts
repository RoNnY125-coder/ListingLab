/**
 * POST /api/upload
 * Receives a multipart/form-data file, uploads it to Cloudinary under
 * listinglab/originals, and returns publicId + metadata.
 *
 * Runs as a Next.js Route Handler (Edge-compatible, deployed on Vercel).
 */
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Initialise Cloudinary once per cold-start
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

export async function POST(req: NextRequest) {
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ detail: "Invalid multipart form data." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ detail: "No file field in request." }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { detail: `File type '${file.type}' is not supported. Upload a valid image.` },
      { status: 422 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  if (bytes.length === 0) {
    return NextResponse.json({ detail: "Uploaded file is empty." }, { status: 422 });
  }
  if (bytes.length > MAX_BYTES) {
    return NextResponse.json(
      { detail: `Image exceeds 20 MB limit (${(bytes.length / 1024 / 1024).toFixed(1)} MB).` },
      { status: 413 }
    );
  }

  // Upload to Cloudinary
  const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "listinglab/originals",
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as Record<string, unknown>);
        }
      )
      .end(bytes);
  });

  console.log("[upload] Cloudinary result:", JSON.stringify({
    public_id: result.public_id,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    format: result.format,
    secure_url: result.secure_url,
  }, null, 2));

  return NextResponse.json({
    publicId: result.public_id,
    bytes: result.bytes,
    width: result.width,
    height: result.height,
    format: result.format,
    secureUrl: result.secure_url,
    tags: result.tags ?? [],
  });
}
