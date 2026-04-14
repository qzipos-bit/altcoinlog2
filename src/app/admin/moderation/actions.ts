"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateDraftFromIngestionItem } from "@/server/ingestion/ai-draft";

async function requireEditor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
}

export async function applyAiDraftToArticleAction(articleId: string) {
  await requireEditor();
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { ingestionSource: true },
  });
  if (!article?.ingestionSource) {
    throw new Error("К статье не привязан ingestion-элемент.");
  }
  const { body } = await generateDraftFromIngestionItem(
    article.ingestionSource.id,
  );
  await prisma.article.update({
    where: { id: articleId },
    data: { body },
  });
  revalidatePath(`/admin/articles/${articleId}/edit`);
}
