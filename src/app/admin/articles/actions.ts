"use server";

import { ArticleStatus, ModerationTaskType, ModerationTaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function requireEditor() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");
  return session.user;
}

async function uniqueArticleSlug(base: string, excludeId?: string) {
  let slug = base || "material";
  let i = 0;
  for (;;) {
    const found = await prisma.article.findUnique({ where: { slug } });
    if (!found || found.id === excludeId) return slug;
    i += 1;
    slug = `${base}-${i}`;
  }
}

export async function createArticle(formData: FormData) {
  const user = await requireEditor();
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const body = String(formData.get("body") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "DRAFT") as ArticleStatus;

  if (!title || !body) throw new Error("Заполните заголовок и текст.");

  const baseSlug =
    slugInput ||
    slugify(title, { lower: true, strict: true, trim: true }) ||
    "material";
  const slug = await uniqueArticleSlug(baseSlug);

  const publishedAt = status === "PUBLISHED" ? new Date() : null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { authorProfile: true },
  });

  const article = await prisma.article.create({
    data: {
      title,
      slug,
      excerpt,
      body,
      status,
      categoryId: categoryId || undefined,
      authorId: dbUser?.authorProfile?.id,
      publishedAt,
      ogTitle: title,
      ogDescription: excerpt?.slice(0, 160) ?? null,
    },
  });

  if (status === "REVIEW") {
    await prisma.moderationTask.create({
      data: {
        type: ModerationTaskType.ARTICLE_REVIEW,
        articleId: article.id,
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/news/${article.slug}`);
  redirect(`/admin/articles/${article.id}/edit`);
}

export async function updateArticle(articleId: string, formData: FormData) {
  const user = await requireEditor();
  const prev = await prisma.article.findUnique({ where: { id: articleId } });
  if (!prev) throw new Error("Статья не найдена");

  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const body = String(formData.get("body") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const status = String(formData.get("status") ?? prev.status) as ArticleStatus;
  const ogTitle = String(formData.get("ogTitle") ?? "").trim() || null;
  const ogDescription = String(formData.get("ogDescription") ?? "").trim() || null;

  if (!title || !body) throw new Error("Заполните заголовок и текст.");

  const baseSlug =
    slugInput ||
    slugify(title, { lower: true, strict: true, trim: true }) ||
    "material";
  const slug = await uniqueArticleSlug(baseSlug, articleId);

  let publishedAt = prev.publishedAt;
  if (status === "PUBLISHED") {
    publishedAt = prev.publishedAt ?? new Date();
  } else if (status === "ARCHIVED") {
    publishedAt = prev.publishedAt;
  } else {
    publishedAt = null;
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { authorProfile: true },
  });

  await prisma.article.update({
    where: { id: articleId },
    data: {
      title,
      slug,
      excerpt,
      body,
      status,
      categoryId: categoryId || null,
      authorId: dbUser?.authorProfile?.id ?? prev.authorId,
      publishedAt,
      ogTitle: ogTitle ?? title,
      ogDescription: ogDescription ?? excerpt?.slice(0, 160) ?? null,
    },
  });

  if (status === "REVIEW" && prev.status !== "REVIEW") {
    const open = await prisma.moderationTask.findFirst({
      where: {
        articleId,
        type: ModerationTaskType.ARTICLE_REVIEW,
        status: ModerationTaskStatus.OPEN,
      },
    });
    if (!open) {
      await prisma.moderationTask.create({
        data: {
          type: ModerationTaskType.ARTICLE_REVIEW,
          articleId,
        },
      });
    }
  }

  if (status === "PUBLISHED") {
    await prisma.moderationTask.updateMany({
      where: {
        articleId,
        type: ModerationTaskType.ARTICLE_REVIEW,
        status: ModerationTaskStatus.OPEN,
      },
      data: {
        status: ModerationTaskStatus.APPROVED,
        resolvedAt: new Date(),
      },
    });
  }

  revalidatePath("/");
  revalidatePath(`/news/${prev.slug}`);
  revalidatePath(`/news/${slug}`);
  revalidatePath(`/admin/articles/${articleId}/edit`);
}
