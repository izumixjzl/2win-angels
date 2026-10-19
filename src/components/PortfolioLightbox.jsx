import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function PortfolioLightbox({ photos, index, onChange, onClose }) {
  const dialogRef = useRef(null)
  const touchX = useRef(null)
  const n = photos.length
  const photo = photos[index]

  const go = (d) => onChange((index + d + n) % n)

  // Keyboard controls, focus and scroll lock while open
  useEffect(() => {
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  })

  const onTouchStart = (e) => (touchX.current = e.touches[0]?.clientX ?? null)
  const onTouchEnd = (e) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current
    touchX.current = null
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
  }

  const roundBtn =
    'inline-flex items-center justify-center rounded-full border border-white/45 bg-[rgba(30,8,20,.4)] text-white transition-colors hover:bg-white/15'

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(30,8,20,.95)] px-4 py-[72px] outline-none"
    >
      <button type="button" aria-label="Close photo viewer" onClick={onClose} className={`${roundBtn} absolute right-4 top-4 h-12 w-12`}>
        <X size={20} />
      </button>
      <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={`${roundBtn} absolute left-4 top-1/2 z-10 h-[52px] w-[52px] -translate-y-1/2`}>
        <ChevronLeft size={22} />
      </button>

      <figure className="m-0 flex max-h-full max-w-full flex-col items-center gap-3.5">
        {photo.type === 'video' ? (
          <video
            key={photo.key || photo.src}
            src={photo.src}
            poster={photo.poster}
            aria-label={photo.alt}
            controls
            autoPlay
            playsInline
            className="max-h-[calc(100vh-180px)] w-auto max-w-[min(1100px,100%)] object-contain"
          />
        ) : (
          <img
            key={photo.key || photo.src}
            src={photo.large || photo.src}
            alt={photo.alt}
            className="max-h-[calc(100vh-180px)] w-auto max-w-[min(1100px,100%)] object-contain"
          />
        )}
        <figcaption className="max-w-[640px] text-center text-[13px] tracking-wide text-on-dark">
          {photo.alt} · {index + 1} / {n}
        </figcaption>
      </figure>

      <button type="button" aria-label="Next photo" onClick={() => go(1)} className={`${roundBtn} absolute right-4 top-1/2 z-10 h-[52px] w-[52px] -translate-y-1/2`}>
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
