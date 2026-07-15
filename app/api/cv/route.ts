import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { createCv } from "@/lib/db";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are allowed" },
      { status: 400 },
    );
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "CV must be 10 MB or smaller" },
      { status: 400 },
    );
  }

  const blob = await put(`cv/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  const makeActive = formData.get("active") === "true";
  const cv = await createCv(file.name, blob.url, makeActive);

  if (makeActive) revalidatePath("/");

  return NextResponse.json(cv, { status: 201 });
}
