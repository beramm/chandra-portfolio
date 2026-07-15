import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { deleteCv, getCvById, setActiveCv } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function PUT(_req: Request, { params }: Params) {
  const { id } = await params;

  const existing = await getCvById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await setActiveCv(id);
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;

  const existing = await getCvById(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteCv(id);
  await del(existing.url).catch(() => {
    // Blob may already be gone; DB row removal is what matters.
  });
  if (existing.is_active) revalidatePath("/");

  return NextResponse.json({ ok: true });
}
