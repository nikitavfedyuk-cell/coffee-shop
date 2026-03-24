function FooterIcon({ kind }) {
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

function FooterLink({ href, kind, label }) {
  if (!href) {
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white/88 text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)]"
    >
      <FooterIcon kind={kind} />
    </a>
  )
}

export function FooterInfo({ site }) {
  return (
    <footer
      id="contacts"
      className="animate-fade-up animation-delay-300 mt-8 grid gap-6 rounded-[32px] border border-[var(--line)] bg-white/88 px-5 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr]"
    >
      <div>
        <p className="cms-text font-body text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">
          {site.footerEyebrow || 'Blue Date Coffee Shop'}
        </p>
        <p className="cms-text font-display mt-4 max-w-[24ch] text-2xl font-semibold leading-[0.96] text-[var(--ink)]">
          {site.footerTitle || 'Дніпро. Чистий смак. Спокійний ритм.'}
        </p>
      </div>

      <div className="font-body grid gap-4 text-sm text-[var(--ink-soft)]">
        <div>
          <p className="cms-text text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
            {site.footerAddressLabel || 'Адреса'}
          </p>
          <p className="cms-text mt-2 text-base text-[var(--ink)]">
            {site.address || 'Адресу буде додано через Google Sheets'}
          </p>
        </div>
        <div>
          <p className="cms-text text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
            {site.footerHoursLabel || 'Години роботи'}
          </p>
          <p className="cms-text mt-2 text-base text-[var(--ink)]">
            {site.workHours || 'Щодня 08:00 - 21:00'}
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        <p className="cms-text font-body text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
          {site.footerLinksLabel || 'Посилання'}
        </p>
        <div className="flex flex-wrap gap-2">
          <FooterLink
            href={site.instagramUrl}
            kind="instagram"
            label="Instagram"
          />
          <FooterLink
            href={site.telegramUrl}
            kind="telegram"
            label="Telegram"
          />
          <FooterLink
            href={site.googleReviewsUrl}
            kind="maps"
            label="Google Maps"
          />
        </div>
      </div>
    </footer>
  )
}
