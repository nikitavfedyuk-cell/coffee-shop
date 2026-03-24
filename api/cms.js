import { getSheetsPayload } from '../src/lib/sheets.js'

export default async function handler(_request, response) {
  try {
    const payload = await getSheetsPayload(process.env.GOOGLE_SHEETS_ID)

    response.setHeader('Cache-Control', 'no-store')
    response.status(200).json(payload)
  } catch (error) {
    response.status(500).json({
      message:
        error instanceof Error ? error.message : 'Failed to load Google Sheets data',
    })
  }
}
