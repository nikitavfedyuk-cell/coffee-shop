function HeroTitle({ site }) {
  return (
    <div className="animate-fade-up animation-delay-200 order-1">
      <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] lg:mb-5 lg:text-[11px] lg:tracking-[0.34em]">
        Designer menu board
      </p>
      <h1 className="max-w-[8.5ch] text-[clamp(2.5rem,13vw,9.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.085em] text-[var(--ink)]">
        <span className="block">{site.heroTitleLine1 || 'Blue'}</span>
        <span className="block text-[var(--accent-strong)]">
          {site.heroTitleLine2 || 'Date'}
        </span>
        <span className="block">{site.heroTitleLine3 || 'Coffee Shop'}</span>
      </h1>
    </div>
  )
}

function HeroNote({ site }) {
  return (
    <div className="animate-fade-up animation-delay-300 order-2 lg:pl-6">
      <div className="space-y-4 rounded-[22px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(243,247,252,0.92))] p-4 lg:space-y-5 lg:rounded-[28px] lg:p-5">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] lg:text-[11px] lg:tracking-[0.32em]">
          Дніпро, Україна
        </p>
        <p className="max-w-[28ch] text-sm leading-6 text-[var(--ink-soft)] lg:text-base lg:leading-7">
          {site.heroNote ||
            'Мінімальний cold-tone простір із сезонним меню, подачею без зайвого шуму та акцентом на чистий смак.'}
        </p>
        <div className="grid gap-3 border-t border-[var(--line)] pt-3 text-sm text-[var(--ink)] lg:pt-4">
          <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <span className="uppercase tracking-[0.18em] text-[var(--muted)]">
              Адреса
            </span>
            <span className="sm:text-right">
              {site.address || 'Дані оновлюються'}
            </span>
          </div>
          <div className="grid gap-1 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <span className="uppercase tracking-[0.18em] text-[var(--muted)]">
              Години
            </span>
            <span>{site.workHours || 'Щодня 08:00 - 21:00'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSection({ site }) {
  return (
    <section
      id="hero"
      className="mb-6 grid gap-4 rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(249,251,255,0.92))] px-4 py-4 sm:px-5 sm:py-5 lg:mb-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8 lg:rounded-[36px] lg:px-8 lg:py-8"
    >
      <HeroTitle site={site} />
      <HeroNote site={site} />
    </section>
  )
}
