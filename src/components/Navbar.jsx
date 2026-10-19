import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, studio } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled || open
  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-rose bg-blush/95 text-berry backdrop-blur' : 'border-transparent bg-transparent text-white'
      }`}
    >
      <div className="wrap flex h-[76px] items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3 no-underline" aria-label={`${studio.name}, home`}>
          <img src={studio.logo} alt="" width="48" height="48" className="h-12 w-12 rounded-full object-cover ring-2 ring-white/70" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[25px] font-semibold tracking-wide">{studio.shortName}</span>
            <span className="mt-1 text-[10px] uppercase tracking-[.28em]">Photography Studio</span>
          </span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm tracking-wide lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="no-underline hover:opacity-70">
              {l.label}
            </a>
          ))}
          <a href="#book" className="btn-pink !px-5 !py-3">Book a Session</a>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="flex flex-col border-t border-rose bg-blush px-4 pb-6 pt-2 text-ink lg:hidden">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={close} className="border-b border-rose py-3 font-serif text-[28px] no-underline">
              {l.label}
            </a>
          ))}
          <a href="#book" onClick={close} className="btn-pink mt-5">Book a Session</a>
        </nav>
      )}
    </header>
  )
}
