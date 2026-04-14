import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme";
  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: "editor@altcoinlog.local" },
    create: {
      email: "editor@altcoinlog.local",
      passwordHash,
      role: "ADMIN",
      authorProfile: {
        create: {
          displayName: "Редакция Altcoinlog",
          slug: "redaktsiya-altcoinlog",
          bio: "Официальный профиль редакции.",
        },
      },
    },
    update: {
      passwordHash,
    },
    include: { authorProfile: true },
  });

  const market = await prisma.category.upsert({
    where: { slug: "rynok" },
    create: {
      slug: "rynok",
      name: "Рынок",
      description: "Цены, тренды, ликвидность.",
    },
    update: {},
  });

  await prisma.category.upsert({
    where: { slug: "regulirovanie" },
    create: {
      slug: "regulirovanie",
      name: "Регулирование",
      description: "Законы, суды, надзор.",
    },
    update: {},
  });

  const tagBtc = await prisma.tag.upsert({
    where: { slug: "bitcoin" },
    create: { slug: "bitcoin", name: "Bitcoin" },
    update: {},
  });

  const authorId = user.authorProfile?.id;

  await prisma.article.upsert({
    where: { slug: "dobro-pozhalovat-v-altcoinlog-2-0" },
    create: {
      slug: "dobro-pozhalovat-v-altcoinlog-2-0",
      title: "Добро пожаловать в Altcoinlog 2.0",
      excerpt:
        "Новая платформа для крипто-новостей: редакция, RSS-ingestion и модерация.",
      body:
        "## Что уже работает\n\n- Публикация новостей и workflow **черновик → ревью → опубликовано**.\n- Импорт из RSS с **дедупликацией** и очередью модерации.\n- SEO: метаданные, sitemap, robots, RSS.\n\nВойдите в админку как `editor@altcoinlog.local` (пароль в `.env` / `SEED_ADMIN_PASSWORD`, по умолчанию `changeme`).",
      status: "PUBLISHED",
      publishedAt: new Date(),
      ogTitle: "Altcoinlog 2.0",
      ogDescription: "Крипто-новости и редакционный контент",
      categoryId: market.id,
      authorId: authorId ?? undefined,
      tags: {
        create: [{ tagId: tagBtc.id }],
      },
    },
    update: {},
  });

  const existingSource = await prisma.source.findFirst({
    where: {
      feedUrl:
        "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",
    },
  });
  if (!existingSource) {
    await prisma.source.create({
      data: {
        name: "CoinDesk (RSS)",
        url: "https://www.coindesk.com",
        feedUrl:
          "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml",
        enabled: true,
      },
    });
  }

  console.log("Seed OK. Editor:", user.email, "| default password:", password);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
