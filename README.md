# Blue Date Coffee Shop

Premium one-page landing for a coffee shop in Dnipro, built with React, Vite, and Tailwind CSS v4.

## Content model

The frontend expects a Google Sheets document with these tabs:

- `site_settings`
- `categories`
- `menu_items`
- `seo`

See the human-friendly template guide here:

- `docs/google-sheets-template-uk.md`

## Architecture

- The client reads data from `/api/cms`.
- The server-side handler lives in `api/cms.js`.
- Vite dev also serves `/api/cms` through a local middleware, so the same Google Sheet works in development.
- Google Sheets are fetched on the server, not directly from client code.
- If `GOOGLE_SHEETS_ID` is missing or the API is unavailable, the UI falls back to local mock data in `src/lib/mock-cms.js`.

## Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Environment

Set `GOOGLE_SHEETS_ID` in your hosting environment to connect the live Google Sheets file.
The current default sheet ID is already set in code for Blue Date Coffee Shop, and you can override it with the env variable later.
