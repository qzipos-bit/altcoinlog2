import { prisma } from "@/lib/prisma";

/**
 * AI-assisted draft: uses OpenAI when OPENAI_API_KEY is set, otherwise a safe local stub.
 */
export async function generateDraftFromIngestionItem(
  ingestionItemId: string,
): Promise<{ body: string; model: string }> {
  const item = await prisma.ingestionItem.findUnique({
    where: { id: ingestionItemId },
  });
  if (!item) throw new Error("Ingestion item not found");

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    const stub = [
      `## Черновик (без API)`,
      ``,
      item.summary?.trim() ||
        `Краткое описание отсутствует. Откройте первоисточник и допишите материал вручную.`,
      ``,
      `**Источник:** ${item.url}`,
      ``,
      `_Чтобы включить генерацию через OpenAI, задайте переменную окружения \`OPENAI_API_KEY\`._`,
    ].join("\n");
    return { body: stub, model: "stub" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Ты редактор крипто-медиа. Напиши черновик новости на русском: заголовок уже дан. Структура: лид, контекст, что дальше. Без выдуманных фактов; если данных мало — явно укажи неизвестность. Markdown.",
        },
        {
          role: "user",
          content: `Заголовок: ${item.title}\n\nАннотация/выдержка:\n${item.summary ?? ""}\n\nURL: ${item.url}`,
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error ${res.status}: ${text.slice(0, 500)}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = json.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("OpenAI returned empty content");

  return { body: content, model: process.env.OPENAI_MODEL ?? "gpt-4o-mini" };
}
