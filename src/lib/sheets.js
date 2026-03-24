import { mockSheets } from './mock-cms.js'

const DEFAULT_GOOGLE_SHEETS_ID = '1tpfmkpQH2D4NkpNkkgVcLGc-DSTRHucHXjyQImVOScM'
const TAB_NAMES = ['site_settings', 'categories', 'menu_items', 'seo']

function extractValue(cell) {
  if (!cell) {
    return ''
  }

  if (cell.f && typeof cell.v === 'number') {
    return cell.v
  }

  return cell.v ?? ''
}

function parseGoogleVisualization(text) {
  const start = text.indexOf('(')
  const end = text.lastIndexOf(')')

  if (start === -1 || end === -1) {
    throw new Error('Unexpected Google Sheets response')
  }

  return JSON.parse(text.slice(start + 1, end))
}

function parseKeyValueRows(rows) {
  return rows.slice(1).reduce((result, row) => {
    const key = extractValue(row.c?.[0])
    const value = extractValue(row.c?.[1])

    if (key) {
      result[key] = value
    }

    return result
  }, {})
}

async function fetchSheetTab(sheetId, tabName) {
  const url = new URL(
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`,
  )

  url.searchParams.set('tqx', 'out:json')
  url.searchParams.set('sheet', tabName)

  const response = await fetch(url, {
    headers: {
      Accept: 'text/plain',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${tabName}`)
  }

  const text = await response.text()
  const parsed = parseGoogleVisualization(text)
  const rows = parsed.table.rows || []
  const firstRow = rows[0]?.c?.map((cell) =>
    String(extractValue(cell)).toLowerCase(),
  )

  if (firstRow?.[0] === 'key' && firstRow?.[1] === 'value') {
    return [parseKeyValueRows(rows)]
  }

  const headers = parsed.table.cols.map((column) => column.label || column.id)

  return rows.map((row) =>
    Object.fromEntries(
      headers.map((header, index) => [header, extractValue(row.c?.[index])]),
    ),
  )
}

export async function getSheetsPayload(sheetId = DEFAULT_GOOGLE_SHEETS_ID) {
  const activeSheetId = sheetId || DEFAULT_GOOGLE_SHEETS_ID

  if (!activeSheetId) {
    return mockSheets
  }

  const entries = await Promise.all(
    TAB_NAMES.map(async (tabName) => [
      tabName,
      await fetchSheetTab(activeSheetId, tabName),
    ]),
  )

  return Object.fromEntries(entries)
}

export { DEFAULT_GOOGLE_SHEETS_ID }
