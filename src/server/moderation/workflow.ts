import {
  ArticleStatus,
  IngestionStatus,
  ModerationTaskStatus,
  ModerationTaskType,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

function buildSlugFromTitle(title: string, suffix?: string) {
  const base = slugify(title, { lower: true, strict: true, trim: true });
  return suffix ? `${base}-${suffix}` : base;
}

async function ensureUniqueArticleSlug(base: string) {
  let slug = base || "material";
  let i = 0;
  for (;;) {
    const clash = await prisma.article.findUnique({ where: { slug } });
    if (!clash) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function promoteIngestionToDraft(ingestionItemId: string) {
  const item = await prisma.ingestionItem.findUnique({
    where: { id: ingestionItemId },
    include: { moderationTasks: true },
  });
  if (!item) throw new Error("Ingestion item not found");
  if (item.articleId) throw new Error("Already promoted");

  const slug = await ensureUniqueArticleSlug(buildSlugFromTitle(item.title));

  const body =
    item.summary?.trim() ||
    `Источник: ${item.url}\n\nДобавьте текст и проверьте факты перед публикацией.`;

  const article = await prisma.$transaction(async (tx) => {
    const created = await tx.article.create({
      data: {
        slug,
        title: item.title,
        excerpt: item.summary?.slice(0, 500) ?? null,
        body,
        status: ArticleStatus.DRAFT,
        ogTitle: item.title,
        ogDescription: item.summary?.slice(0, 160) ?? null,
      },
    });

    await tx.ingestionItem.update({
      where: { id: item.id },
      data: {
        articleId: created.id,
        status: IngestionStatus.PROMOTED,
      },
    });

    await tx.moderationTask.updateMany({
      where: {
        ingestionItemId: item.id,
        type: ModerationTaskType.INGESTION_REVIEW,
        status: ModerationTaskStatus.OPEN,
      },
      data: {
        status: ModerationTaskStatus.APPROVED,
        resolvedAt: new Date(),
      },
    });

    await tx.moderationTask.create({
      data: {
        type: ModerationTaskType.ARTICLE_REVIEW,
        articleId: created.id,
      },
    });

    return created;
  });

  return article;
}

export async function rejectIngestionItem(ingestionItemId: string) {
  await prisma.$transaction([
    prisma.ingestionItem.update({
      where: { id: ingestionItemId },
      data: { status: IngestionStatus.REJECTED },
    }),
    prisma.moderationTask.updateMany({
      where: {
        ingestionItemId,
        status: ModerationTaskStatus.OPEN,
      },
      data: {
        status: ModerationTaskStatus.REJECTED,
        resolvedAt: new Date(),
      },
    }),
  ]);
}

export async function approveArticleReview(articleId: string) {
  await prisma.$transaction([
    prisma.article.update({
      where: { id: articleId },
      data: {
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    }),
    prisma.moderationTask.updateMany({
      where: {
        articleId,
        type: ModerationTaskType.ARTICLE_REVIEW,
        status: ModerationTaskStatus.OPEN,
      },
      data: {
        status: ModerationTaskStatus.APPROVED,
        resolvedAt: new Date(),
      },
    }),
  ]);
}
