import { useEffect, useRef, useState } from 'react'
import { MenuCard } from './MenuCard'

function CategoryNav({ categories, activeSlug }) {
  const railRef = useRef(null)

  useEffect(() => {
    const container = railRef.current

    if (!container || !activeSlug) {
      return
    }

    const activeLink = container.querySelector(
      `[data-category-link="${activeSlug}"]`,
    )

    if (!activeLink) {
      return
    }

    activeLink.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeSlug])

  return (
    <div
      id="menu-top"
      className="animate-fade-up fixed inset-x-4 bottom-3 z-30 rounded-[24px] bg-[rgba(255,250,244,0.92)] px-2 py-2 shadow-[var(--shadow-soft)] backdrop-blur lg:sticky lg:top-4 lg:inset-auto lg:mb-8 lg:rounded-[26px] lg:px-3 lg:py-3"
    >
      <div
        ref={railRef}
        className="flex gap-2 overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:flex-wrap lg:gap-x-4 lg:gap-y-3"
      >
        {categories.map((category, index) => (
          <a
            key={category.slug}
            data-category-link={category.slug}
            href={`#category-${category.slug}`}
            className={`font-body inline-flex min-w-max items-center gap-2 rounded-full px-3.5 py-2 text-[11px] font-medium tracking-[-0.01em] transition lg:rounded-full lg:px-4 lg:py-2.5 lg:text-sm ${
              activeSlug === category.slug
                ? 'bg-[var(--ink)] text-[var(--surface-strong)] shadow-[0_8px_24px_rgba(19,34,56,0.14)]'
                : 'bg-white/66 text-[var(--ink-soft)] hover:bg-white/90 hover:text-[var(--ink)]'
            }`}
          >
            <span className={`shrink-0 text-[10px] ${activeSlug === category.slug ? 'text-white/65' : 'text-[var(--muted)]'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className={`cms-text ${activeSlug === category.slug ? 'text-white' : ''}`}>
              {category.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function CategoryBlock({ category }) {
  return (
    <section
      id={`category-${category.slug}`}
      className="scroll-mt-24 grid gap-5 border-t border-[rgba(19,34,56,0.08)] py-7 first:border-t-0 first:pt-0 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-6 lg:py-9"
    >
      <div className="animate-fade-up lg:pr-6">
        <h2 className="cms-text font-display text-[2rem] font-semibold uppercase tracking-[0.04em] leading-[0.94] text-[var(--ink)] sm:text-3xl lg:text-4xl">
          {category.name}
        </h2>
        <p className="cms-text font-body mt-2 max-w-[26ch] text-[0.95rem] leading-6 text-[var(--ink-soft)] lg:max-w-[18ch]">
          {category.description ||
            'Вивірена подача, чиста структура та фокус на продукті без зайвих декоративних рішень.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-5 xl:grid-cols-3">
        {category.items.map((item, itemIndex) => (
          <div
            key={item.id}
            className={`animation-delay-${((itemIndex % 3) + 1) * 100}`}
          >
            <MenuCard item={item} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function MenuSection({ categories }) {
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug ?? '')

  useEffect(() => {
    if (categories.length === 0) {
      return
    }

    const sections = categories
      .map((category) => ({
        slug: category.slug,
        element: document.getElementById(`category-${category.slug}`),
      }))
      .filter((item) => item.element)

    if (sections.length === 0) {
      return
    }

    const updateActiveCategory = () => {
      const offset = window.innerWidth < 1024 ? 132 : 160

      let currentSlug = sections[0].slug

      for (const section of sections) {
        const rect = section.element.getBoundingClientRect()

        if (rect.top - offset <= 0) {
          currentSlug = section.slug
        }
      }

      setActiveSlug(currentSlug)
    }

    updateActiveCategory()
    window.addEventListener('scroll', updateActiveCategory, { passive: true })
    window.addEventListener('resize', updateActiveCategory)

    return () => {
      window.removeEventListener('scroll', updateActiveCategory)
      window.removeEventListener('resize', updateActiveCategory)
    }
  }, [categories])

  return (
    <section
      id="menu"
      className="overflow-x-hidden rounded-[30px] bg-[linear-gradient(180deg,rgba(255,250,244,0.88),rgba(255,247,240,0.94))] px-4 py-5 shadow-[var(--shadow-soft)] sm:px-5 lg:rounded-[38px] lg:px-6 lg:py-6"
    >
      <CategoryNav categories={categories} activeSlug={activeSlug} />

      <div className="grid gap-2 overflow-x-hidden">
        {categories.map((category) => (
          <CategoryBlock key={category.slug} category={category} />
        ))}
      </div>
    </section>
  )
}
