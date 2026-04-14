import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Плейсхолдеры обложек (Unsplash, без ключей). */
const IMG = {
  market: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80&auto=format&fit=crop",
  law: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80&auto=format&fit=crop",
  security: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80&auto=format&fit=crop",
  defi: "https://images.unsplash.com/photo-1640345175186-ee6d7d0c9f50?w=1200&q=80&auto=format&fit=crop",
  analytics: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80&auto=format&fit=crop",
} as const;

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

  const catRynok = await prisma.category.upsert({
    where: { slug: "rynok" },
    create: {
      slug: "rynok",
      name: "Рынок",
      description: "Цены, тренды, ликвидность.",
    },
    update: {},
  });

  const catRegul = await prisma.category.upsert({
    where: { slug: "regulirovanie" },
    create: {
      slug: "regulirovanie",
      name: "Регулирование",
      description: "Законы, суды, надзор.",
    },
    update: {},
  });

  const catBez = await prisma.category.upsert({
    where: { slug: "bezopasnost" },
    create: {
      slug: "bezopasnost",
      name: "Безопасность",
      description: "Кошельки, скам, аудит.",
    },
    update: {},
  });

  const catDefi = await prisma.category.upsert({
    where: { slug: "defi" },
    create: {
      slug: "defi",
      name: "DeFi",
      description: "Протоколы, доходность, риски.",
    },
    update: {},
  });

  const catAnal = await prisma.category.upsert({
    where: { slug: "analitika" },
    create: {
      slug: "analitika",
      name: "Аналитика",
      description: "Обзоры, метрики, сценарии.",
    },
    update: {},
  });

  const tagBtc = await prisma.tag.upsert({
    where: { slug: "bitcoin" },
    create: { slug: "bitcoin", name: "Bitcoin" },
    update: {},
  });

  const tagEth = await prisma.tag.upsert({
    where: { slug: "ethereum" },
    create: { slug: "ethereum", name: "Ethereum" },
    update: {},
  });

  const tagDefi = await prisma.tag.upsert({
    where: { slug: "defi" },
    create: { slug: "defi", name: "DeFi" },
    update: {},
  });

  const authorId = user.authorProfile?.id;

  const baseArticles: Array<{
    slug: string;
    title: string;
    excerpt: string;
    body: string;
    categoryId: string;
    featuredImageUrl: string;
    publishedAt: Date;
    tagIds: string[];
  }> = [
    {
      slug: "dobro-pozhalovat-v-altcoinlog-2-0",
      title: "Добро пожаловать в Altcoinlog 2.0",
      excerpt:
        "Новая платформа для крипто-новостей: редакция, RSS-ingestion и модерация.",
      body:
        "## Что уже работает\n\n- Публикация новостей и workflow **черновик → ревью → опубликовано**.\n- Импорт из RSS с **дедупликацией** и очередью модерации.\n- SEO: метаданные, sitemap, robots, RSS.\n\n> Это демо-врезка: так оформляются важные мысли в тексте.\n\nВойдите в админку как `editor@altcoinlog.local` (пароль в `.env` / `SEED_ADMIN_PASSWORD`, по умолчанию `changeme`).",
      categoryId: catRynok.id,
      featuredImageUrl: IMG.market,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      tagIds: [tagBtc.id],
    },
    {
      slug: "regulirovanie-kripto-2026-chego-zhdat",
      title: "Регулирование крипты в 2026: чего ждать бизнесу и инвесторам",
      excerpt:
        "Короткий ориентир по трендам надзора: отчётность, стейблкоины, маркетплейсы цифровых активов.",
      body:
        "## Ключевые направления\n\n1. Прозрачность операций на биржах и у кастодианов.\n2. Таксономия токенов: когда актив похож на ценную бумагу.\n3. Требования к рекламе и лидогенерации.\n\n> Врезка: перед крупной сделкой имеет смысл свериться с локальным консультантом — правила меняются быстро.\n\n### Что делать портфелю\n\n- Фиксировать источник средств и цель сделок.\n- Использовать площадки с понятной юрисдикцией.\n- Не хранить всё на одной бирже.",
      categoryId: catRegul.id,
      featuredImageUrl: IMG.law,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
      tagIds: [tagBtc.id],
    },
    {
      slug: "bezopasnost-seed-fraza-i-apk-chek-list",
      title: "Сид-фраза и смартфон: чек-лист безопасности на 10 минут",
      excerpt:
        "Как снизить риск кражи средств: бэкапы, отдельное устройство, фишинг в мессенджерах.",
      body:
        "## Базовые правила\n\n- **Никогда** не вводите сид в «проверочные» формы и боты.\n- Делайте резервную копию офлайн, в двух независимых местах.\n- Проверяйте адрес контракта токена перед свапом.\n\n> Если предлагают «разблокировать аирдроп» за подпись в кошельке — это почти всегда скам.\n\n### Дополнительно\n\n1. Отдельный браузер только под крипто.\n2. Аппаратный кошелёк для крупных сумм.\n3. Подозрительные APK только из официального сайта разработчика.",
      categoryId: catBez.id,
      featuredImageUrl: IMG.security,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      tagIds: [tagEth.id],
    },
    {
      slug: "defi-dohodnost-i-riski-prostym-yazykom",
      title: "Доходность в DeFi: откуда берутся проценты и гдериски",
      excerpt:
        "Ликвидность, кредитные пулы, имперманент-лосс — объясняем без лишней математики.",
      body:
        "## Откуда доход\n\nПулы ликвидности получают комиссии трейдеров. Кредитные протоколы делят проценты заёмщиков.\n\n### Риски\n\n- **Имперманент-лосс** при волатильной паре.\n- Взломы смарт-контрактов и оракулов.\n- Резкие изменения параметров протокола.\n\n> Не гонитесь за APY выше рынка без понимания источника дохода.\n\n## Практика\n\n1. Начните с малых сумм.\n2. Читайте аудиты и трек-рекорд команды.\n3. Диверсифицируйте протоколы.",
      categoryId: catDefi.id,
      featuredImageUrl: IMG.defi,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      tagIds: [tagDefi.id, tagEth.id],
    },
    {
      slug: "analitika-bitok-dominirovanie-i-sezon-altov",
      title: "Доминирование BTC и «сезон альтов»: как читать метрики",
      excerpt:
        "Что смотреть вместе с ценой: доминация, объёмы стейблкоинов, funding фьючерсов.",
      body:
        "## Метрики\n\n- Доля Bitcoin в капитализации рынка.\n- Притоки/оттоки стейблкоинов.\n- Открытый интерес и funding по фьючерсам.\n\n### Интерпретация\n\nРост доминации часто сопровождает **фазу риск-офф** в альтах. Снижение — интерес к спекуляции вне BTC.\n\n> Одна метрика не решает — смотрите связку с макро и ликвидностью.\n\n## Вывод\n\nФиксируйте сценарии заранее и не усредняйтесь без плана выхода.",
      categoryId: catAnal.id,
      featuredImageUrl: IMG.analytics,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      tagIds: [tagBtc.id],
    },
  ];

  for (const a of baseArticles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        body: a.body,
        status: "PUBLISHED",
        publishedAt: a.publishedAt,
        featuredImageUrl: a.featuredImageUrl,
        ogTitle: a.title,
        ogDescription: a.excerpt,
        categoryId: a.categoryId,
        authorId: authorId ?? undefined,
        tags: {
          create: a.tagIds.map((tagId) => ({ tagId })),
        },
      },
      update: {
        title: a.title,
        excerpt: a.excerpt,
        body: a.body,
        status: "PUBLISHED",
        publishedAt: a.publishedAt,
        featuredImageUrl: a.featuredImageUrl,
        ogTitle: a.title,
        ogDescription: a.excerpt,
        categoryId: a.categoryId,
        authorId: authorId ?? undefined,
      },
    });
  }

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
  console.log("Categories with demo articles: rynok, regulirovanie, bezopasnost, defi, analitika");
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
