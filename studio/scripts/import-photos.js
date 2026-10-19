// One-time import of the website's built-in portfolio photos into Sanity.
// Run from the studio folder: npm run import-photos
import fs from 'node:fs'
import path from 'node:path'
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2025-01-01' })

// Same photos and descriptions as `photos` in src/data/content.js
const photos = [
  { file: 'kid-tiara.jpg', alt: 'A little girl in a pink lace dress and tiara against an orange backdrop' },
  { file: 'baby-first.jpg', alt: 'A smiling baby in a white tutu at a pink first-birthday setup with a number 1 balloon' },
  { file: 'family.jpg', alt: 'A family of five in floral outfits smiling against a pink backdrop' },
  { file: 'solo-boy.jpg', alt: 'A young man in an argyle sweater vest looking to the side against a blue backdrop' },
  { file: 'twins-balloons.jpg', alt: 'The twin photographers in pink berets holding 2 and 7 number balloons' },
  { file: 'woman-crown.jpg', alt: 'A woman placing a gold tiara on her head, wearing a white fur top' },
  { file: 'kid-sash.jpg', alt: 'A girl with pom-pom hair clips and a birthday sash glancing over her shoulder' },
  { file: 'couple-sunflower.jpg', alt: 'A couple dressed in red holding out a crocheted sunflower bouquet' },
  { file: 'twins-cameras.jpg', alt: 'The twin photographers in matching pink outfits, each holding a film camera' },
]

// npm runs scripts from the studio folder, so the website's images are one level up
const imagesDir = path.resolve(process.cwd(), '../public/images')

const randomKey = () => Math.random().toString(36).slice(2, 14)

async function main() {
  const existing = await client.fetch('count(*[_id == "portfolio"][0].photos)')
  if (existing > 0) {
    console.log(`The portfolio already has ${existing} photo(s). Nothing to import.`)
    return
  }

  const items = []
  for (const { file, alt } of photos) {
    const filePath = path.join(imagesDir, file)
    console.log(`Uploading ${file}…`)
    const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename: file })
    items.push({
      _key: randomKey(),
      _type: 'image',
      alt,
      asset: { _type: 'reference', _ref: asset._id },
    })
  }

  await client.createOrReplace({ _id: 'portfolio', _type: 'portfolio', photos: items })
  console.log(`Done! Imported ${items.length} photos into the portfolio.`)
}

main().catch((err) => {
  console.error('Import failed:', err.message || err)
  process.exitCode = 1
})
