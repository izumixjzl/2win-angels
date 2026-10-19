import { useEffect, useState } from 'react'

// Small "Inquire" button for phones, shown after the visitor scrolls past the hero.
export default function FloatingInquiry() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  if (!show) return null
  return (
    <a
      href="#book"
      className="btn-pink fixed bottom-4 right-4 z-40 !px-5 !py-3.5 shadow-[0_6px_20px_rgba(61,20,40,.25)] lg:hidden"
    >
      Inquire
    </a>
  )
}
