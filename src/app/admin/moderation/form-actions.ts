"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  approveArticleReview,
  promoteIngestionToDraft,
  rejectIngestionItem,
} from "@/server/moderation/workflow";

async function requireEditor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
}

export async function moderationFormAction(formData: FormData) {
  await requireEditor();
  const intent = String(formData.get("intent"));
  const id = String(formData.get("id"));

  if (!id || !intent) throw new Error("Bad request");

  if (intent === "promote_ingestion") {
    const article = await promoteIngestionToDraft(id);
    revalidatePath("/admin/moderation");
    revalidatePath("/admin/articles");
    redirect(`/admin/articles/${article.id}/edit`);
  }

  if (intent === "reject_ingestion") {
    await rejectIngestionItem(id);
    revalidatePath("/admin/moderation");
    return;
  }

  if (intent === "approve_article_review") {
    await approveArticleReview(id);
    revalidatePath("/admin/moderation");
    revalidatePath("/");
    return;
  }

  if (intent === "reject_article_review") {
    await prisma.$transaction([
      prisma.article.update({
        where: { id },
        data: { status: "DRAFT" },
      }),
      prisma.moderationTask.updateMany({
        where: {
          articleId: id,
          status: "OPEN",
          type: "ARTICLE_REVIEW",
        },
        data: { status: "REJECTED", resolvedAt: new Date() },
      }),
    ]);
    revalidatePath("/admin/moderation");
    return;
  }

  throw new Error("Unknown intent");
}
