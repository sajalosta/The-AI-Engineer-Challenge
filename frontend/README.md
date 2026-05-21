# Mental Coach — Frontend

Next.js chat UI for the FastAPI mental coach backend (`POST /api/chat`).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (includes `npm`)
- Backend running at `http://localhost:8000` (see `../api/README.md`)

## Setup

From this `frontend` directory:

```bash
npm install
```

Copy the example env file and adjust if your API runs elsewhere:

```bash
cp .env.example .env.local
```

## Run locally

**Terminal 1 — backend** (from project root):

```bash
export OPENAI_API_KEY=sk-your-key-here
uv run uvicorn api.index:app --reload
```

**Terminal 2 — frontend** (from this directory):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app talks to the backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`).

## Production build

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `frontend`.
3. Add environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed FastAPI URL.
4. Deploy the backend separately (e.g. Railway, Render, or Vercel serverless with a Python adapter) and ensure CORS allows your Vercel domain.

## Design

- Light pink background (`#ffe4ec`) with dark red text (`#8b0000`)
- Garamond, 11.5px base size
- Warrior illustration in the header (`public/warrior.svg`)
