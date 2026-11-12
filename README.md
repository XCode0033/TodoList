# TodoList

A full-stack todo app with a calendar view. A TypeScript, Express, and Postgres API serves a dark-themed React Native (Expo) mobile app.

## Screenshots

_coming soon_

## Features

- Create, edit, complete, and delete todos
- Title, description, category, priority, and due date on every todo
- Priority and category badges on each card
- Completion toggles update instantly and roll back if the server rejects them
- Calendar tab with a visual month grid. The iCal feed endpoint exists on the server but is not wired to the UI yet.
- Dark mode, light mode coming soon

## Tech Stack

| Layer    | Technology                                               |
| -------- | -------------------------------------------------------- |
| Mobile   | React Native (Expo), Expo Router, TypeScript, NativeWind |
| API      | Express, TypeScript, Zod                                 |
| Database | PostgreSQL, `node-pg-migrate` for migrations             |
| Tooling  | ESLint, Prettier                                         |

## Project Structure

```
TodoList/
-- server/ Express + TypeScript API (port 8003)
-- native/ Expo React Native app (primary client)
-- client/ React web app (Vite scaffold, not built out yet)
-- types/ TypeScript types shared by the apps (e.g. Todo)
-- DOCS/ dev log and notes
-- schema-reference.sql Read-only snapshot of the DB schema
```

## Getting Started

### Prerequisites

- Git
- Node.js 20+
- Postgres running locally
- Expo Go on your phone (same Wi-Fi as your computer) or the iOS Simulator

### 0. Clone

```bash
git clone https://github.com/XCode0033/TodoList.git
cd TodoList
```

### 1. Database

```bash
createdb todolist
```

### 2. Server

```bash
cd server
npm install
cp .env.example .env # then set DATABASE_URL and add CALENDAR_FEED_URL
npm run migrate:up   # creates the todo table
npm run dev:all      # or: npm run dev (no type-checker)
```

### 3. Mobile App

```bash
cd native
npm install
cp .env.example .env # set EXPO_PUBLIC_API_URL to your computer's LAN IP
npm run ios          # or: npm run android
```

Find your LAN IP on macOS with `ipconfig getifaddr en0`. A phone can't reach `localhost` on your computer, so the URL must use the IP, e.g. `http://192.168.1.50:8003/api`

## Environment Variables

**`server/.env`**

| Variable            | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `PORT`              | API port, defaults to `8003`                              |
| `DATABASE_URL`      | Postgres connection string                                |
| `CALENDAR_FEED_URL` | URL of an `.ics` calendar feed read by `GET /api/calendar` |
| `JWT_SECRET`        | Not implemented yet                                       |
| `GOOGLE_*`          | Not implemented yet                                       |

**`native/.env`**

| Variable              | Description                                |
| --------------------- | ------------------------------------------ |
| `EXPO_PUBLIC_API_URL` | Base URL of the API, including `/api`      |

## API Reference

All routes are under `/api`.

| Method | Path          | Description                                                                              |
| ------ | ------------- | ---------------------------------------------------------------------------------------- |
| GET    | `/todos`      | Gets all todos, sorted by id                                                             |
| GET    | `/todos/:id`  | Finds a todo by id                                                                       |
| POST   | `/createTodo` | Creates a todo. Body: `todo_title`, `todo_category`, `todo_priority`, `todo_description`, `todo_due_date` |
| PATCH  | `/todos/:id`  | Partially or fully updates a todo                                                        |
| DELETE | `/todos/:id`  | Deletes a todo                                                                           |
| GET    | `/calendar`   | Fetches the iCal feed. Returns `[{id, title, start, end}]`                               |
| GET    | `/createPage` | Placeholder for the create screen                                                        |

## Database

Schema changes are managed with migrations in `server/migrations/`.

```bash
npm run migrate:create add-something # new migration
npm run migrate:up                   # apply
npm run migrate:down                 # undo the latest
```

## Scripts

Both `server/` and `native/` support `npm run lint` and `npm run format`.

## Troubleshooting

<!-- Your section: problems you've actually hit and how you fixed them. -->

## Roadmap

In no particular order for now.

- **Delete bucket**: hold a deleted todo for x amount of time before removing it for good.
