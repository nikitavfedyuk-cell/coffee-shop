import { useEffect, useState } from 'react'
import { BackToTopButton } from './components/BackToTopButton'
import { FooterInfo } from './components/FooterInfo'
import { MenuSection } from './components/MenuSection'
import { ErrorState, LoadingState, EmptyState } from './components/States'
import { SiteHeader } from './components/SiteHeader'
import { loadCmsData } from './lib/cms'
import { applySeo } from './lib/seo'

function App() {
  const [state, setState] = useState({
    status: 'loading',
    data: null,
    message: '',
  })

  useEffect(() => {
    let isMounted = true

    async function bootstrap() {
      setState((current) => ({ ...current, status: 'loading', message: '' }))

      try {
        const data = await loadCmsData()

        if (!isMounted) {
          return
        }

        applySeo(data.seo, data.site)
        setState({ status: 'ready', data, message: '' })
      } catch (error) {
        if (!isMounted) {
          return
        }

        setState({
          status: 'error',
          data: null,
          message:
            error instanceof Error
              ? error.message
              : 'Не вдалося завантажити меню.',
        })
      }
    }

    bootstrap()

    return () => {
      isMounted = false
    }
  }, [])

  const retry = async () => {
    try {
      setState((current) => ({ ...current, status: 'loading', message: '' }))
      const data = await loadCmsData()
      applySeo(data.seo, data.site)
      setState({ status: 'ready', data, message: '' })
    } catch (error) {
      setState({
        status: 'error',
        data: null,
        message:
          error instanceof Error
            ? error.message
            : 'Не вдалося завантажити меню.',
      })
    }
  }

  if (state.status === 'loading') {
    return <LoadingState />
  }

  if (state.status === 'error') {
    return <ErrorState message={state.message} onRetry={retry} />
  }

  if (!state.data || state.data.categories.length === 0) {
    return <EmptyState />
  }

  const { site, menuByCategory } = state.data

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-[var(--page-bg)] text-[var(--ink)]"
    >
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(197,143,97,0.12),_rgba(197,143,97,0)_70%)]" />
        <div className="absolute right-0 top-[24%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.08),_rgba(14,165,233,0)_72%)]" />
        <div className="absolute left-[-8rem] top-[38%] h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.42),_rgba(255,255,255,0)_72%)]" />
      </div>

      <div className="mx-auto max-w-[1600px] overflow-x-hidden px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-10">
        <SiteHeader site={site} categories={menuByCategory} />
        <MenuSection categories={menuByCategory} />
        <FooterInfo site={site} />
      </div>

      <BackToTopButton />
    </div>
  )
}

export default App
