# Wedding Website + AI Concierge

A reusable Next.js wedding website template powered by a single JSON data file, with an optional AI concierge that answers guest questions using only the wedding's own content.

## Stack

- Next.js App Router
- Tailwind CSS
- TypeScript
- OpenAI API

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Configuration

Edit [`data/weddingData.json`](./data/weddingData.json) to customize the site for a couple. The app is structured so the same codebase can be reused across many weddings by swapping data instead of rewriting components.

## AI concierge

1. Add `OPENAI_API_KEY` to `.env.local`
2. Keep `aiConciergeEnabled` set to `true` in `data/weddingData.json`
3. Ask questions from the FAQ section UI

If the answer is not present in the wedding data, the API route is instructed to return the fallback message instead of guessing.
