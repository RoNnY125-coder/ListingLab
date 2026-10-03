/**
 * GET /api/process?publicId=<PUBLIC_ID>
 *
 * Builds real Cloudinary transformation URLs for the uploaded asset:
 *   - original: plain secure URL
 *   - optimized: f_auto, q_auto (size-saved % computed via HEAD request)
 *   - instagram: 1080×1080 c_fill, g_auto, f_auto, q_auto
 *   - feed: 1080×1350 c_fill, g_auto, f_auto, q_auto
 *   - marketplace: 900×1200 c_fill, g_auto, f_auto, q_auto
 *   - banner: 1600×900 c_fill, g_auto, f_auto, q_auto
 *
 * Returns sizeSavedPct as a real percentage from Content-Length headers.
 */
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

function buildUrl(publicId: string, options: Record<string, unknown> = {}): string {
  return cloudinary.url(publicId, { secure: true, ...options });
}

async function getContentLength(url: string): Promise<number> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const cl = res.headers.get("content-length");
    if (cl && /^\d+$/.test(cl)) return parseInt(cl, 10);
  } catch {}
  return 0;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const publicId = searchParams.get("publicId")?.trim();

  if (!publicId) {
    return NextResponse.json(
      { detail: "publicId query parameter is required." },
      { status: 400 }
    );
  }

  // Build all transformation URLs
  const urls = {
    original: buildUrl(publicId),
    optimized: buildUrl(publicId, { fetch_format: "auto", quality: "auto" }),
    instagram: buildUrl(publicId, {
      width: 1080, height: 1080, crop: "fill", gravity: "auto",
      fetch_format: "auto", quality: "auto",
    }),
    feed: buildUrl(publicId, {
      width: 1080, height: 1350, crop: "fill", gravity: "auto",
      fetch_format: "auto", quality: "auto",
    }),
    marketplace: buildUrl(publicId, {
      width: 900, height: 1200, crop: "fill", gravity: "auto",
      fetch_format: "auto", quality: "auto",
    }),
    banner: buildUrl(publicId, {
      width: 1600, height: 900, crop: "fill", gravity: "auto",
      fetch_format: "auto", quality: "auto",
    }),
  };

  // Compute real size savings between original and optimized via HEAD requests
  const [originalBytes, optimizedBytes] = await Promise.all([
    getContentLength(urls.original),
    getContentLength(urls.optimized),
  ]);

  let sizeSavedPct = 0;
  if (originalBytes > 0 && optimizedBytes > 0) {
    sizeSavedPct = Math.round(
      Math.max(0, Math.min(100, ((originalBytes - optimizedBytes) / originalBytes) * 100))
    );
  }

  console.log("[process] publicId:", publicId);
  console.log("[process] original:", urls.original);
  console.log("[process] optimized:", urls.optimized);
  console.log("[process] originalBytes:", originalBytes, "optimizedBytes:", optimizedBytes, "saved:", sizeSavedPct, "%");

  return NextResponse.json({ urls, sizeSavedPct });
}
