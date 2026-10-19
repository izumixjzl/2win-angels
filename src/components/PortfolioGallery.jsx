import { useState } from 'react'
import { Play } from 'lucide-react'
import { photos as builtInPhotos, studio } from '../data/content'
import { usePortfolio } from '../hooks/usePortfolio'
import PortfolioLightbox from './PortfolioLightbox'
import Reveal from './Reveal'

// Varied shapes for the loading placeholders, so the masonry looks natural
const placeholderRatios = ['2 / 3', '3 / 2', '3 / 4', '2 / 3', '1 / 1', '4 / 5']

const tileClass = 'group relative block w-full cursor-zoom-in overflow-hidden bg-rose bg-cover bg-center'
const zoomClass = 'transition-transform duration-700 group-hover:scale-[1.04]'

export default function PortfolioGallery() {
  // Which list the viewer is showing ('photos' or 'videos') and the open item
  const [open, setOpen] = useState({ list: 'photos', index: -1 })
  const { status, photos: items } = usePortfolio(builtInPhotos)
  const loading = status === 'loading'

  const lists = {
    photos: items.filter((p) => p.type !== 'video'),
    videos: items.filter((p) => p.type === 'video'),
  }
  const current = lists[open.list]

  const tileProps = (p, list, i) => ({
    type: 'button',
    onClick: () => setOpen({ list, index: i }),
    style: p.lqip ? { backgroundImage: `url(${p.lqip})` } : undefined,
  })

  return (
    <section id="portfolio" className="py-20 lg:py-36">
      <div className="wrap">
        <Reveal className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="eyebrow mb-4">Portfolio</p>
          <h2 className="h2">
            Stories we've <em className="font-normal text-pink">captured</em>
          </h2>
          <p className="mt-5 text-body">Birthdays, families, couples and portraits from the studio. Tap any photo to view it larger.</p>
        </Reveal>

        <div className="columns-1 gap-[18px] sm:columns-2 lg:columns-3" aria-busy={loading}>
          {loading
            ? placeholderRatios.map((ratio, i) => (
                <div
                  key={i}
                  aria-hidden="true"
                  className="mb-[18px] w-full animate-pulse bg-rose [break-inside:avoid]"
                  style={{ aspectRatio: ratio }}
                />
              ))
            : lists.photos.map((p, i) => (
                <button
                  key={p.key || p.src}
                  {...tileProps(p, 'photos', i)}
                  aria-label={`View larger: ${p.alt}`}
                  className={`${tileClass} mb-[18px] [break-inside:avoid]`}
                >
                  <img
                    src={p.src}
                    srcSet={p.srcSet || undefined}
                    sizes={p.srcSet ? '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw' : undefined}
                    alt=""
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                    className={`h-auto w-full ${zoomClass}`}
                  />
                </button>
              ))}
        </div>

        {lists.videos.length > 0 && (
          <div className="mt-16 lg:mt-24">
            <Reveal className="mb-10 text-center">
              <p className="eyebrow">Videos</p>
            </Reveal>
            <div className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {lists.videos.map((p, i) => (
                <button
                  key={p.key || p.src}
                  {...tileProps(p, 'videos', i)}
                  aria-label={`Play video: ${p.alt}`}
                  className={`${tileClass} aspect-[3/4]`}
                >
                  {/* #t=0.1 shows the first frame when there's no cover photo */}
                  <video
                    src={p.poster ? p.src : `${p.src}#t=0.1`}
                    poster={p.poster}
                    muted
                    playsInline
                    preload={p.poster ? 'none' : 'metadata'}
                    aria-hidden="true"
                    tabIndex={-1}
                    className={`pointer-events-none block h-full w-full object-cover ${zoomClass}`}
                  />
                  <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-[rgba(30,8,20,.4)] text-white">
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <a href={studio.facebookPhotos} target="_blank" rel="noopener noreferrer" className="btn-line">
            View more on Facebook
          </a>
        </div>
      </div>

      {open.index >= 0 && current[open.index] && (
        <PortfolioLightbox
          photos={current}
          index={open.index}
          onChange={(index) => setOpen((o) => ({ ...o, index }))}
          onClose={() => setOpen((o) => ({ ...o, index: -1 }))}
        />
      )}
    </section>
  )
}
