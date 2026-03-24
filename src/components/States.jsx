export function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] px-6">
      <div className="w-full max-w-4xl rounded-[32px] border border-[var(--line)] bg-white/72 p-8">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          Blue Date Coffee Shop
        </p>
        <div className="mt-8 space-y-3">
          <div className="h-5 w-40 animate-pulse rounded-full bg-[var(--skeleton)]" />
          <div className="h-20 max-w-3xl animate-pulse rounded-[24px] bg-[var(--skeleton)]" />
          <div className="h-10 w-72 animate-pulse rounded-full bg-[var(--skeleton)]" />
        </div>
      </div>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] px-6">
      <div className="w-full max-w-3xl rounded-[32px] border border-[var(--line)] bg-white/80 p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          Помилка завантаження
        </p>
        <h1 className="mt-4 text-4xl font-semibold uppercase tracking-[-0.06em] text-[var(--ink)]">
          Меню тимчасово недоступне
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
          {message || 'Спробуйте оновити сторінку або повторити завантаження.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 inline-flex rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-6 py-3 text-sm uppercase tracking-[0.2em] text-[var(--accent-strong)] transition hover:border-[var(--accent)]"
        >
          Спробувати ще раз
        </button>
      </div>
    </div>
  )
}

export function EmptyState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--page-bg)] px-6">
      <div className="w-full max-w-3xl rounded-[32px] border border-[var(--line)] bg-white/80 p-8 text-center">
        <p className="text-[10px] uppercase tracking-[0.32em] text-[var(--muted)]">
          Немає даних
        </p>
        <h1 className="mt-4 text-4xl font-semibold uppercase tracking-[-0.06em] text-[var(--ink)]">
          Меню ще наповнюється
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
          Додайте категорії та позиції в Google Sheets, і контент з'явиться тут
          після оновлення сторінки.
        </p>
      </div>
    </div>
  )
}
