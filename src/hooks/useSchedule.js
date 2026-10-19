import { useEffect, useState } from 'react'
import { client, sanityEnabled, scheduleQuery } from '../lib/sanity'
import { studioNow } from '../lib/schedule'

// Loads opening times and booked slots from Sanity, falling back to the
// built-in schedule when Sanity isn't configured, the request fails, or no times are set.
export function useSchedule(fallback) {
  const [state, setState] = useState(() =>
    sanityEnabled ? { status: 'loading', schedule: fallback } : { status: 'ready', schedule: fallback },
  )

  useEffect(() => {
    if (!sanityEnabled) return
    let cancelled = false

    client
      .fetch(scheduleQuery, { today: studioNow().date })
      .then((doc) => {
        if (cancelled) return
        setState({ status: 'ready', schedule: doc?.slots?.length ? doc : fallback })
      })
      .catch((err) => {
        if (cancelled) return
        console.warn('Could not load availability from Sanity, using built-in times.', err)
        setState({ status: 'ready', schedule: fallback })
      })

    return () => {
      cancelled = true
    }
  }, [fallback])

  return state
}
