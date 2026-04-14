# Altcoinlog 2.0 (MVP)

Крипто-медиа на **Next.js (App Router) + TypeScript**, **PostgreSQL**, **Prisma**, **Auth.js (credentials)**.

## Продуктовые хабы (SEO + монетизация)

| URL | Назначение |
| --- | --- |
| `/kursy-kriptovalut` | Курсы (CoinGecko), таблица, FAQ (JSON-LD) |
| `/reitingi` и `/reitingi/[slug]` | Рейтинги: биржи, кошельки, обменники, staking |
| `/konverter` | Калькулятор пересчёта между активами |
| `/sravnenie` | Каркас сравнительных таблиц платформ |
| `/novosti` | Хаб категорий из БД + перелинковка |
| `/antiskam-audit` | Лид-форма антискам-аудита |
| `/registratsiya` | Рассылка + интерес к аккаунту (лиды) |
| `/otzyvy` | Хаб отзывов, FAQ, ссылки на рейтинги |

Логотип: `public/brand/logo.png` (фирменный красный + белый `log`).

Макет Figma (референс визуала): [Untitled — node 1-159](https://www.figma.com/design/czwSmdK1JDLVAk7kEYxtEr/Untitled?node-id=1-159).

## Возможности MVP

- Публичная лента, страница новости, категории и теги.
- Админка: статьи (черновик → ревью → опубликовано / архив), модерация ingestion и ревью статей.
- RSS-ingestion с **дедупликацией по fingerprint (SHA-256 нормализованного URL)** и очередью модерации.
- AI-черновик текста: при `OPENAI_API_KEY` — запрос к OpenAI, иначе безопасный **stub** без внешних вызовов.
- SEO: `metadata`, JSON-LD `NewsArticle`, `sitemap.xml`, `robots.txt`, RSS `feed.xml`.

## Быстрый старт

1. Скопируйте окружение:

   ```bash
   cp .env.example .env
   ```

2. Задайте `AUTH_SECRET` (например `openssl rand -base64 32`).

3. Поднимите Postgres (локально или Docker):

   ```bash
   docker compose up -d
   ```

4. Миграции и сид:

   ```bash
   npm install
   npx prisma migrate deploy
   npm run db:seed
   ```

   Лиды с посадочных пишутся в таблицу `MarketingLead` (миграция `20250414140000_marketing_lead`). Просмотр: `npm run db:studio`.

5. Редактор по умолчанию (из сида):

   - **Email:** `editor@altcoinlog.local`
   - **Пароль:** `changeme` (или `SEED_ADMIN_PASSWORD` из `.env` перед сидом)

6. Запуск:

   ```bash
   npm run dev
   ```

Откройте [http://localhost:3000](http://localhost:3000) и админку [http://localhost:3000/admin](http://localhost:3000/admin).

## Ingestion

- Кнопка **«Запустить ingestion»** в `/admin`.
- Либо `POST /api/ingestion/run` с сессией редактора.
- Либо с заголовком `x-ingestion-secret: <INGESTION_CRON_SECRET>` (если переменная задана в `.env`).

## Полезные команды

| Команда            | Описание                |
| ------------------ | ----------------------- |
| `npm run dev`      | Разработка              |
| `npm run build`    | Сборка (`--webpack`; см. примечание ниже) |

### Если `next build` падает на SWC / Turbopack

На части окружений бинарь `@next/swc-darwin-arm64` может оказаться повреждённым. Помогает переустановка Next:

```bash
rm -rf node_modules/@next node_modules/next && npm install
```

Скрипт `build` уже использует `next build --webpack` для совместимости.
| `npm run lint`     | ESLint                  |
| `npm run db:migrate` | Prisma migrate dev    |
| `npm run db:seed`  | Сид данных              |
| `npm run db:studio`| Prisma Studio           |

## Структура (основное)

- `src/app/(public)/` — публичный сайт.
- `src/app/admin/` — админка.
- `src/app/api/` — API (auth, ingestion).
- `src/server/ingestion/` — пайплайн RSS.
- `src/server/moderation/` — promote / reject / publish.
- `prisma/` — схема и миграции.

Подробный чеклист релиза: [docs/RELEASE_CHECKLIST.md](docs/RELEASE_CHECKLIST.md).
