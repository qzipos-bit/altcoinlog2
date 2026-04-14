import Parser from "rss-parser";
import { IngestionStatus, ModerationTaskType, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ingestionFingerprint } from "./fingerprint";

const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent": "AltcoinlogBot/2.0 (+https://altcoinlog)",
  },
});

export type IngestionRunSummary = {
  sourcesProcessed: number;
  itemsCreated: number;
  itemsSkippedDuplicate: number;
  errors: string[];
};

export async function runIngestionPipeline(): Promise<IngestionRunSummary> {
  const summary: IngestionRunSummary = {
    sourcesProcessed: 0,
    itemsCreated: 0,
    itemsSkippedDuplicate: 0,
    errors: [],
  };

  const sources = await prisma.source.findMany({ where: { enabled: true } });

  for (const source of sources) {
    if (!source.feedUrl) {
      summary.errors.push(`Source "${source.name}" has no feedUrl`);
      continue;
    }
    summary.sourcesProcessed += 1;
    try {
      const feed = await parser.parseURL(source.feedUrl);
      const items = feed.items ?? [];
      for (const item of items) {
        const link = item.link ?? item.guid;
        if (!link) continue;
        const title = (item.title ?? "Untitled").trim();
        const summaryText = (item.contentSnippet ?? item.summary ?? "").trim();
        const rawBody = (item["content:encoded"] as string | undefined) ?? item.content ?? null;
        const fingerprint = ingestionFingerprint(link);
        const existing = await prisma.ingestionItem.findUnique({
          where: { fingerprint },
        });
        if (existing) {
          summary.itemsSkippedDuplicate += 1;
          continue;
        }
        try {
          await prisma.ingestionItem.create({
            data: {
              sourceId: source.id,
              externalId: item.guid ?? item.isoDate ?? null,
              url: link,
              title,
              summary: summaryText || null,
              rawBody: rawBody ? String(rawBody).slice(0, 50_000) : null,
              fingerprint,
              status: IngestionStatus.QUEUED_FOR_MODERATION,
              moderationTasks: {
                create: {
                  type: ModerationTaskType.INGESTION_REVIEW,
                },
              },
            },
          });
          summary.itemsCreated += 1;
        } catch (e) {
          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            summary.itemsSkippedDuplicate += 1;
            continue;
          }
          summary.errors.push(
            `${source.name}: create failed — ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    } catch (e) {
      summary.errors.push(
        `${source.name}: ${e instanceof Error ? e.message : String(e)}`,
      );
    }
  }

  return summary;
}
