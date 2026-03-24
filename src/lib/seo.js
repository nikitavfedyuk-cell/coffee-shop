function upsertMeta(name, content, attribute = 'name') {
  if (!content) {
    return
  }

  let element = document.head.querySelector(`meta[${attribute}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) {
    return
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

export function applySeo(seo, site) {
  document.documentElement.lang = site.siteLanguage || 'uk'
  document.title = seo.metaTitle || site.siteName

  upsertMeta('description', seo.metaDescription)
  upsertMeta('og:title', seo.ogTitle, 'property')
  upsertMeta('og:description', seo.ogDescription, 'property')
  upsertMeta('og:image', seo.ogImageUrl, 'property')
  upsertMeta('og:type', 'website', 'property')
  upsertLink('canonical', seo.canonicalUrl)
}
