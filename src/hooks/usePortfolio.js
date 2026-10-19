import { useEffect, useState } from 'react'
import { client, portfolioQuery, sanityEnabled, toGalleryPhoto } from '../lib/sanity'

// Loads portfolio photos from Sanity, falling back to the built-in photos
// when Sanity isn't configured, the request fails, or the portfolio is empty.
export function usePortfolio(fallback) {
  const [state, setState] = useState(() =>
    sanityEnabled ? { status: 'loading', photos: [] } : { status: 'ready', photos: fallback },
  )

  useEffect(() => {
    if (!sanityEnabled) return
    let cancelled = false

    client
      .fetch(portfolioQuery)
      .then((items) => {
        if (cancelled) return
        const photos = Array.isArray(items) ? items.map(toGalleryPhoto) : []
        setState({ status: 'ready', photos: photos.length ? photos : fallback })
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('Could not load portfolio from Sanity, using built-in photos.', err)
        setState({ status: 'ready', photos: fallback })
      })

    return () => {
      cancelled = true
    }
  }, [fallback])

  return state
}
