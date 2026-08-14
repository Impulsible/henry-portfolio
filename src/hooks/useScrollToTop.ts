import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top instantly on route change
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    // Or smooth scroll:
    // window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
}