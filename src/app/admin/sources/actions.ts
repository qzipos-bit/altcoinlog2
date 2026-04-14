"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireEditor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
}

export async function createSource(formData: FormData) {
  await requireEditor();
  const name = String(formData.get("name") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const feedUrl = String(formData.get("feedUrl") ?? "").trim() || null;
  if (!name || !url) throw new Error("Имя и URL обязательны.");
  await prisma.source.create({
    data: { name, url, feedUrl, enabled: true },
  });
  revalidatePath("/admin/sources");
}

export async function toggleSourceFormAction(formData: FormData) {
  await requireEditor();
  const id = String(formData.get("id"));
  const source = await prisma.source.findUnique({ where: { id } });
  if (!source) throw new Error("Источник не найден");
  await prisma.source.update({
    where: { id },
    data: { enabled: !source.enabled },
  });
  revalidatePath("/admin/sources");
}
