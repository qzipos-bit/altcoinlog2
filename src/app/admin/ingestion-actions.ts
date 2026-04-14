"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { runIngestionPipeline } from "@/server/ingestion/pipeline";

export async function runIngestionAction() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  const summary = await runIngestionPipeline();
  revalidatePath("/admin/moderation");
  revalidatePath("/admin");
  return summary;
}
