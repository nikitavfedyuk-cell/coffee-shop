import { mockSheets } from './mock-cms'

function valueToBoolean(value) {
  if (typeof value === 'boolean') {
    return value
  }

  return ['true', '1', 'yes'].includes(String(value).toLowerCase())
}

function byOrder(a, b) {
  return Number(a.order ?? 0) - Number(b.order ?? 0)
}

function normalizeSite(row = {}) {
  return {
    siteName: row.site_name || 'Blue Date Coffee Shop',
    siteLanguage: row.site_language || 'uk',
    logoUrl: row.logo_url || '',
    footerEyebrow: row.footer_eyebrow || 'Blue Date Coffee Shop',
    footerTitle: row.footer_title || 'Дніпро. Чистий смак. Спокійний ритм.',
    footerAddressLabel: row.footer_address_label || 'Адреса',
    footerHoursLabel: row.footer_hours_label || 'Години роботи',
    footerLinksLabel: row.footer_links_label || 'Посилання',
    address: row.address || '',
    workHours: row.work_hours || '',
    instagramUrl: row.instagram_url || '',
    telegramUrl: row.telegram_url || '',
    googleReviewsUrl: row.google_reviews_url || '',
  }
}

function normalizeSeo(row = {}, site) {
  return {
    metaTitle: row.meta_title || `${site.siteName} | Дніпро`,
    metaDescription:
      row.meta_description || 'Меню кавʼярні Blue Date',
    ogTitle: row.og_title || row.meta_title || site.siteName,
    ogDescription: row.og_description || row.meta_description || '',
    ogImageUrl: row.og_image_url || '',
    canonicalUrl: row.canonical_url || '',
  }
}

function normalizeCms(raw) {
  const site = normalizeSite(raw.site_settings?.[0] || {})
  const seo = normalizeSeo(raw.seo?.[0] || {}, site)

  const categories = (raw.categories || [])
    .filter((item) => valueToBoolean(item.is_active))
    .sort(byOrder)
    .map((item) => ({
      slug: item.slug,
      name: item.name_uk || item.slug,
      description: item.description_uk || '',
      order: Number(item.order ?? 0),
    }))

  const items = (raw.menu_items || [])
    .filter((item) => valueToBoolean(item.is_active))
    .sort(byOrder)
    .map((item) => ({
      id:
        item.id ||
        globalThis.crypto?.randomUUID?.() ||
        `${item.category_slug || 'item'}-${item.order || '0'}`,
      categorySlug: item.category_slug,
      name: item.name_uk || 'Без назви',
      serving: item.serving_uk || '',
      description: item.description_uk || '',
      price: item.price,
      imageUrl: item.image_url || '',
      badge: String(item.badge || '').toLowerCase(),
      order: Number(item.order ?? 0),
    }))

  const menuByCategory = categories.map((category) => ({
    ...category,
    items: items.filter((item) => item.categorySlug === category.slug),
  }))

  return { site, seo, categories, menuByCategory }
}

export async function loadCmsData() {
  const endpoint = `/api/cms?ts=${Date.now()}`

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (response.ok) {
      const contentType = response.headers.get('content-type') || ''

      if (!contentType.includes('application/json')) {
        return normalizeCms(mockSheets)
      }

      const raw = await response.json()
      return normalizeCms(raw)
    }

    if (response.status === 404) {
      return normalizeCms(mockSheets)
    }

    let errorMessage = 'Не вдалося завантажити CMS.'

    try {
      const payload = await response.json()
      errorMessage = payload.message || errorMessage
    } catch {
      errorMessage = `CMS endpoint responded with ${response.status}`
    }

    throw new Error(errorMessage)
  } catch (error) {
    if (error instanceof TypeError || error instanceof SyntaxError) {
      return normalizeCms(mockSheets)
    }

    throw error
  }
}
