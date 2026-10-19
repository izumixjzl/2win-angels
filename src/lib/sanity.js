import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Without a project ID the site keeps using the built-in photos from content.js
export const sanityEnabled = Boolean(projectId)

export const client = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion: '2025-01-01', useCdn: true })
  : null

const builder = sanityEnabled ? imageUrlBuilder(client) : null

// Photos are `image` items; videos are `video` items (a file plus an optional cover photo)
export const portfolioQuery = `*[_id == "portfolio"][0].photos[defined(asset)]{
  _key,
  _type,
  alt,
  crop,
  hotspot,
  asset->{ _id, url, mimeType, metadata { lqip, dimensions { width, height } } },
  poster{ crop, hotspot, asset->{ _id, metadata { lqip, dimensions { width, height } } } }
}`

const FALLBACK_ALT = 'Photo from 2win Angels Photography Studio'
const FALLBACK_VIDEO_ALT = 'Video from 2win Angels Photography Studio'

const imageUrl = (image, width) => builder.image(image).auto('format').fit('max').quality(82).width(width).url()

// Real size of an image after the owner's crop
function croppedSize(image) {
  const dims = image.asset?.metadata?.dimensions || {}
  const crop = image.crop || {}
  return {
    w: Math.round((dims.width || 1200) * (1 - (crop.left || 0) - (crop.right || 0))),
    h: Math.round((dims.height || 1200) * (1 - (crop.top || 0) - (crop.bottom || 0))),
  }
}

function toGalleryVideo(item) {
  const poster = item.poster?.asset ? item.poster : null
  return {
    key: item._key,
    type: 'video',
    src: item.asset.url,
    mimeType: item.asset.mimeType,
    poster: poster ? imageUrl(poster, 1200) : undefined,
    // Without a cover photo the video's own shape is used once it loads
    ...(poster ? croppedSize(poster) : {}),
    alt: item.alt?.trim() || FALLBACK_VIDEO_ALT,
    lqip: poster?.asset?.metadata?.lqip,
  }
}

// Turns a Sanity portfolio item into the shape the gallery and lightbox expect
export function toGalleryPhoto(item) {
  if (item._type === 'video') return toGalleryVideo(item)
  return {
    key: item._key,
    src: imageUrl(item, 1200),
    srcSet: [600, 900, 1200, 1600].map((width) => `${imageUrl(item, width)} ${width}w`).join(', '),
    large: imageUrl(item, 2000),
    ...croppedSize(item),
    alt: item.alt?.trim() || FALLBACK_ALT,
    lqip: item.asset?.metadata?.lqip,
  }
}

// Opening times and booked slots. Past dates are filtered out by $today.
export const scheduleQuery = `*[_id == "schedule"][0]{
  slots,
  closedWeekdays,
  "unavailable": unavailable[date >= $today]{ date, allDay, times }
}`
