import { auth } from "@/auth";
import { runIngestionPipeline } from "@/server/ingestion/pipeline";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const cronSecret = process.env.INGESTION_CRON_SECRET;
  if (cronSecret) {
    const header = req.headers.get("x-ingestion-secret");
    if (header !== cronSecret) {
      return new Response("Forbidden", { status: 403 });
    }
  } else {
    const session = await auth();
    if (!session?.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }
  }

  const summary = await runIngestionPipeline();
  return Response.json(summary);
}
