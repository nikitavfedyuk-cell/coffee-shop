import { useState } from 'react'

function BurgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      aria-label="Відкрити меню категорій"
      aria-expanded={isOpen}
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(255,250,244,0.96)] text-[var(--ink)] shadow-[var(--shadow-card)] transition hover:text-[var(--accent-strong)] lg:hidden"
    >
      <span className="relative h-4 w-5">
        <span
          className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition ${
            isOpen ? 'translate-y-[7px] rotate-45' : ''
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-[1.5px] w-5 bg-current transition ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`absolute left-0 top-[14px] h-[1.5px] w-5 bg-current transition ${
            isOpen ? '-translate-y-[7px] -rotate-45' : ''
          }`}
        />
      </span>
    </button>
  )
}

function SocialIcon({ kind }) {
  if (kind === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M7.2 3h9.6A4.2 4.2 0 0 1 21 7.2v9.6a4.2 4.2 0 0 1-4.2 4.2H7.2A4.2 4.2 0 0 1 3 16.8V7.2A4.2 4.2 0 0 1 7.2 3Zm0 1.8A2.4 2.4 0 0 0 4.8 7.2v9.6a2.4 2.4 0 0 0 2.4 2.4h9.6a2.4 2.4 0 0 0 2.4-2.4V7.2a2.4 2.4 0 0 0-2.4-2.4H7.2Zm9.9 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (kind === 'telegram') {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M21.7 4.6 18.5 20c-.24 1.1-.87 1.37-1.76.85l-4.87-3.6-2.35 2.27c-.26.26-.48.48-.97.48l.35-4.98 9.07-8.2c.39-.35-.09-.55-.61-.2l-11.2 7.05-4.83-1.51c-1.05-.33-1.07-1.05.22-1.55L20.1 3.6c.89-.33 1.67.2 1.6 1Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function QuickLink({ href, kind, label, onClick }) {
  if (!href) {
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(255,250,244,0.96)] text-[var(--ink)] shadow-[var(--shadow-card)] transition hover:text-[var(--accent-strong)]"
    >
      <SocialIcon kind={kind} />
    </a>
  )
}

function CategoryJump({ category, onClick }) {
  return (
    <a
      href={`#category-${category.slug}`}
      onClick={onClick}
      className="font-body inline-flex items-center rounded-[18px] bg-[rgba(255,252,247,0.92)] px-4 py-3 text-sm font-medium tracking-[-0.01em] text-[var(--ink)] shadow-[var(--shadow-card)] transition hover:text-[var(--accent-strong)]"
    >
      <span>{category.name}</span>
    </a>
  )
}

export function SiteHeader({ site, categories }) {
  const [isOpen, setIsOpen] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)

  const closeMenu = () => setIsOpen(false)
  const showLogo = Boolean(site.logoUrl && !logoFailed)

  return (
    <header className="animate-fade-up mb-4 pb-2 lg:mb-5 lg:pb-3">
      <div className="relative flex min-h-16 items-start justify-center sm:min-h-20">
        <div className="absolute right-0 top-0 z-10 shrink-0">
          <BurgerButton
            isOpen={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          />
        </div>

        <a
          href="#top"
          className="block min-w-0 px-14 pt-1 text-center sm:px-16"
          onClick={closeMenu}
        >
          {showLogo ? (
            <img
              src={site.logoUrl}
              alt={site.siteName || 'Blue Date Coffee Shop'}
              onError={() => setLogoFailed(true)}
              className="mx-auto h-auto max-h-28 w-auto max-w-[min(100%,24rem)] object-contain sm:max-h-32 sm:max-w-[28rem]"
            />
          ) : (
            <h1 className="cms-text font-display text-[2rem] font-semibold leading-[0.9] text-[var(--ink)] sm:text-[2.45rem]">
              {site.siteName || 'Blue Date Coffee Shop'}
            </h1>
          )}
        </a>
      </div>

      <div className="mt-3 hidden flex-wrap gap-2 lg:flex">
        <QuickLink
          href={site.instagramUrl}
          kind="instagram"
          label="Instagram"
        />
        <QuickLink
          href={site.telegramUrl}
          kind="telegram"
          label="Telegram"
        />
        <QuickLink
          href={site.googleReviewsUrl}
          kind="maps"
          label="Google Maps"
        />
      </div>

      {isOpen ? (
        <div className="mt-4 grid gap-4 rounded-[24px] bg-[rgba(255,250,244,0.96)] p-4 shadow-[0_18px_40px_rgba(84,61,38,0.10)] lg:hidden">
          <div>
            <p className="cms-text font-body text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Категорії
            </p>
            <div className="mt-3 grid gap-2">
              {categories.map((category) => (
                <CategoryJump
                  key={category.slug}
                  category={category}
                  onClick={closeMenu}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="cms-text font-body text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
              Посилання
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <QuickLink
                href={site.instagramUrl}
                kind="instagram"
                label="Instagram"
                onClick={closeMenu}
              />
              <QuickLink
                href={site.telegramUrl}
                kind="telegram"
                label="Telegram"
                onClick={closeMenu}
              />
              <QuickLink
                href={site.googleReviewsUrl}
                kind="maps"
                label="Google Maps"
                onClick={closeMenu}
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
