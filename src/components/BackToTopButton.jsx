import { useEffect, useState } from 'react'

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 520)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      type="button"
      aria-label="Повернутися нагору"
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-white/94 text-[var(--ink)] shadow-[0_14px_36px_rgba(0,20,74,0.1)] backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)] lg:bottom-6 lg:right-6"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M12 5 5.5 11.5l1.4 1.4 4.1-4.1V19h2V8.8l4.1 4.1 1.4-1.4L12 5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  )
}
