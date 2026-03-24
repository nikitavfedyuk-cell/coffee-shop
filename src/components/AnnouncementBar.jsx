export function AnnouncementBar({ text }) {
  if (!text) {
    return null
  }

  return (
    <div className="animate-fade-in border-b border-[var(--line)] bg-white/72 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--muted)] sm:px-6 lg:px-10">
        <span>Blue Date Coffee Shop</span>
        <p className="truncate text-right">{text}</p>
      </div>
    </div>
  )
}
