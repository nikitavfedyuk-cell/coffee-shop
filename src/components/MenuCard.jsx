import { useState } from 'react'

const badgeMap = {
  vegan: 'VEGAN',
  cold: 'COLD',
  new: 'NEW',
  'sold out': 'SOLD OUT',
}

function PlaceholderVisual({ title }) {
  return (
    <div className="relative flex h-full min-h-[176px] w-full items-end justify-between overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#fff9f2_0%,#f8f0e4_54%,#eef6fa_100%)] p-3 lg:min-h-[260px] lg:rounded-[24px] lg:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.14),transparent_42%)]" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[rgba(197,143,97,0.10)] blur-2xl" />
      <span className="font-body relative text-[9px] uppercase tracking-[0.22em] text-[var(--muted)] lg:text-[10px] lg:tracking-[0.3em]">
        Image pending
      </span>
      <span className="cms-text font-display relative max-w-[8ch] text-right text-sm font-medium tracking-[-0.04em] text-[var(--accent-strong)] lg:max-w-[10ch] lg:text-lg">
        {title}
      </span>
    </div>
  )
}

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <PlaceholderVisual title={alt} />
  }

  return (
    <div className="relative flex min-h-[176px] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,rgba(255,251,246,0.9),rgba(252,245,237,0.86))] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] lg:min-h-[260px] lg:rounded-[24px] lg:px-6 lg:py-6">
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="relative z-10 h-[142px] w-full object-contain lg:h-[220px]"
      />
    </div>
  )
}

function formatPrice(value) {
  const numeric = Number(value)

  if (Number.isNaN(numeric)) {
    return 'Ціну оновлюємо'
  }

  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    maximumFractionDigits: 0,
  }).format(numeric)
}

export function MenuCard({ item }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const badgeLabel = badgeMap[item.badge]
  const soldOut = item.badge === 'sold out'
  const description = item.description || 'Опис додамо з Google Sheets.'
  const canExpand = Boolean(description)

  const toggleExpanded = () => {
    if (!canExpand) {
      return
    }

    setIsExpanded((value) => !value)
  }

  return (
    <article
      role={canExpand ? 'button' : undefined}
      tabIndex={canExpand ? 0 : undefined}
      onClick={toggleExpanded}
      onKeyDown={(event) => {
        if (!canExpand) {
          return
        }

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggleExpanded()
        }
      }}
      aria-expanded={canExpand ? isExpanded : undefined}
      className={`group min-w-0 w-full animate-fade-up overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,rgba(255,252,247,0.96),rgba(255,248,240,0.92))] p-3 shadow-[var(--shadow-card)] transition duration-300 hover:shadow-[0_16px_36px_rgba(84,61,38,0.12)] active:scale-[0.995] lg:rounded-[28px] lg:p-3.5 ${
        soldOut ? 'opacity-70' : ''
      } ${canExpand ? 'cursor-pointer' : ''}`}
    >
      <div className="relative overflow-hidden rounded-[20px] lg:rounded-[24px]">
        <ProductImage src={item.imageUrl} alt={item.name} />
        {badgeLabel ? (
          <span
            className={`absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] shadow-[0_6px_18px_rgba(19,34,56,0.08)] lg:left-4 lg:top-4 lg:px-3 lg:text-[10px] lg:tracking-[0.24em] ${
              soldOut
                ? 'bg-white/92 text-[var(--ink-soft)]'
                : 'bg-[var(--accent-warm-soft)] text-[var(--accent-warm)]'
            }`}
          >
            {badgeLabel}
          </span>
        ) : null}
      </div>

      <div className="grid w-full gap-3.5 px-1 pb-1 pt-3.5 text-left lg:gap-4 lg:px-2 lg:pb-2 lg:pt-4.5">
        <div className="grid gap-2.5">
          <div className="grid gap-1.5">
            <h3 className="cms-text font-display min-w-0 text-[1.08rem] font-semibold leading-[1.02] text-[var(--ink)] lg:text-[1.42rem]">
              {item.name}
            </h3>
            <div className="flex items-baseline justify-between gap-3">
              {item.serving ? (
                <p className="cms-text font-body min-w-0 text-[11px] font-medium tracking-[0.02em] text-[var(--muted)] lg:text-[12px]">
                  {item.serving}
                </p>
              ) : (
                <span />
              )}
              <span className="font-body shrink-0 whitespace-nowrap rounded-full bg-[rgba(14,165,233,0.10)] px-2.5 py-1 text-[0.92rem] font-semibold leading-none text-[var(--accent-strong)] lg:text-[1rem]">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
          <p
            className={`cms-text font-body max-w-[22ch] text-[12px] leading-5 text-[var(--ink-soft)] lg:max-w-[34ch] lg:text-sm lg:leading-6 ${
              isExpanded ? '' : 'line-clamp-2'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  )
}
