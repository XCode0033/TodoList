# TodoList

Monorepo: Express/TypeScript API, React (Vite) web client, Expo React Native app, Postgres.

## Structure

- `server/` — Express + TypeScript API, listens on port 8003, home route at `/api`
- `client/` — React web app (Vite, TypeScript, Tailwind v4)
- `native/` — Expo React Native app (TypeScript, tabs, NativeWind)

## Server

```bash
cd server
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET, Google OAuth creds
npm run dev
```

Create the `todo` table with `src/db/schema.sql` against your Postgres database:

```bash
psql "$DATABASE_URL" -f src/db/schema.sql
```

## Client (web)

```bash
cd client
npm run dev
```

## Native

```bash
cd native
npm run ios     # or npm run android / npm run web
```
