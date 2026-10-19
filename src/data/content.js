// All studio content lives here, separate from the layout components.
// Everything below comes from the studio's Facebook page and posted rate card.

export const studio = {
  name: '2win Angels Photography Studio',
  shortName: '2win Angels',
  tagline: 'Affordable, good-quality photoshoots by twin photographers in Toril, Davao City.',
  address:
    '#2360 Durian St., Daliao, Toril (boundary of Saint Michael and San Roque, at the back of the green apartment), Davao City',
  phoneDisplay: '+63 907 536 9515',
  phoneLocal: '0907 536 9515',
  phoneHref: 'tel:+639075369515',
  email: '2winangels.studio@gmail.com',
  facebook: 'https://www.facebook.com/2winangelsphotography.studio',
  facebookPhotos: 'https://www.facebook.com/2winangelsphotography.studio/photos',
  facebookReviews: 'https://www.facebook.com/2winangelsphotography.studio/reviews',
  messenger: 'https://m.me/2winangelsphotography.studio', // confirm this opens the studio's Messenger
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=2360+Durian+St+Daliao+Toril+Davao+City',
  logo: '/images/logo.jpg',
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Sessions', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Packages', href: '#packages' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  src: '/images/twins-lavender.jpg',
  alt: 'The twin photographers in pink dresses, eyes closed in the sun, in a field of purple flowers under a blue sky',
}

export const about = {
  src: '/images/twins-cameras.jpg',
  alt: 'The twin photographers in matching pink berets and outfits, each holding a film camera',
}

// Cards in the Sessions section. `img: null` renders a typographic card instead.
export const services = [
  { name: 'Solo Portrait', desc: 'Quickshoot, or Dream packages with 10 or 15 photos.', from: 'Promo from ₱150', img: '/images/solo-boy.jpg', alt: 'Solo portrait of a young man against a blue backdrop', pos: '50% 30%' },
  { name: 'Duo Portrait', desc: 'For two, with 15 or 30 photos.', from: 'Promo from ₱399', img: '/images/twins-balloons.jpg', alt: 'Two women in pink berets holding number balloons', pos: '50% 40%' },
  { name: 'Group Portrait', desc: 'Packages for groups of 3 to 8 people.', from: 'Promo from ₱700', img: '/images/family.jpg', alt: 'A family of five posing against a pink backdrop', pos: '50% 30%' },
  { name: 'Studio Prenup', desc: 'Plain, with makeup, themed, or with video.', from: 'Promo from ₱900', img: '/images/couple-sunflower.jpg', alt: 'A couple holding a sunflower bouquet', pos: '50% 30%' },
  { name: 'Pre-birthday for Kids', desc: 'Plain, themed, or with video.', from: 'Promo from ₱650', img: '/images/baby-first.jpg', alt: 'A baby at a pink first-birthday setup', pos: '42% 50%' },
  { name: 'Pre-birthday for Adults', desc: 'Plain, with lights, themed, or with video.', from: 'Promo from ₱650', img: '/images/woman-crown.jpg', alt: 'A woman wearing a gold tiara', pos: '50% 25%' },
  { name: 'Maternity', desc: 'Plain, with makeup, themed, or with video.', from: 'Promo from ₱650', img: null, tone: 'light', title: 'Maternity', sub: 'Sessions available' },
  { name: 'Not sure yet?', desc: "Tell us the occasion and we'll suggest the right package.", from: 'Message us anytime', img: null, tone: 'pink', title: 'Ask the twins', sub: "We'll help you choose", cta: 'Send a message', href: '#book' },
]

// Rate card, exactly as posted by the studio (promo / regular).
const pk = (name, promo, regular) => ({ name, promo, regular })
export const packages = [
  { category: 'Solo Portrait', items: [pk('Quickshoot (8)', '₱150', '₱250'), pk('Dream A · 10 photos', '₱200', '₱300'), pk('Dream B · 15 photos', '₱399', '₱499')] },
  { category: 'Duo Portrait', items: [pk('Dream A · 15 photos', '₱399', '₱499'), pk('Dream B · 30 photos', '₱850', '₱950')] },
  { category: 'Group Portrait', items: [pk('Dream A · 3–4 people', '₱700', '₱850'), pk('Dream B · 4–5 people', '₱1,000', '₱1,150'), pk('Dream C · 6–8 people', '₱1,550', '₱1,700')] },
  { category: 'Studio Prenup', items: [pk('Dream A · Plain', '₱900', '₱1,200'), pk('Dream B · Makeup', '₱1,500', '₱1,800'), pk('Dream C · Theme', '₱3,200', '₱3,500'), pk('Dream D · With video', '₱3,700', '₱4,000')] },
  { category: 'Pre-birthday for Kids', items: [pk('Dream A · Plain', '₱650', '₱950'), pk('Dream B · Theme', '₱1,990', '₱2,300'), pk('Dream C · With video', '₱2,500', '₱2,800')] },
  { category: 'Pre-birthday for Adults', items: [pk('Dream A · Plain', '₱650', '₱950'), pk('Dream B · With lights', '₱1,000', '₱1,300'), pk('Dream C · Theme', '₱3,000', '₱3,300'), pk('Dream D · With video', '₱3,500', '₱3,800')] },
  { category: 'Maternity', items: [pk('Dream A · Plain', '₱650', '₱950'), pk('Dream B · Makeup', '₱1,100', '₱1,400'), pk('Dream C · Theme', '₱3,000', '₱3,300'), pk('Dream D · With video', '₱3,500', '₱3,800')] },
]

export const sessionOptions = [
  'Solo portrait', 'Duo portrait', 'Group portrait', 'Studio prenup',
  'Pre-birthday for kids', 'Pre-birthday for adults', 'Maternity', 'Not sure yet',
]

// Portfolio gallery. Width/height are the real image sizes (prevents layout shift).
export const photos = [
  { src: '/images/kid-tiara.jpg', w: 1000, h: 1500, alt: 'A little girl in a pink lace dress and tiara against an orange backdrop' },
  { src: '/images/baby-first.jpg', w: 1500, h: 1000, alt: 'A smiling baby in a white tutu at a pink first-birthday setup with a number 1 balloon' },
  { src: '/images/family.jpg', w: 1061, h: 1500, alt: 'A family of five in floral outfits smiling against a pink backdrop' },
  { src: '/images/solo-boy.jpg', w: 1000, h: 1500, alt: 'A young man in an argyle sweater vest looking to the side against a blue backdrop' },
  { src: '/images/twins-balloons.jpg', w: 1500, h: 1210, alt: 'The twin photographers in pink berets holding 2 and 7 number balloons' },
  { src: '/images/woman-crown.jpg', w: 1000, h: 1500, alt: 'A woman placing a gold tiara on her head, wearing a white fur top' },
  { src: '/images/kid-sash.jpg', w: 1500, h: 1500, alt: 'A girl with pom-pom hair clips and a birthday sash glancing over her shoulder' },
  { src: '/images/couple-sunflower.jpg', w: 1000, h: 1500, alt: 'A couple dressed in red holding out a crocheted sunflower bouquet' },
  { src: '/images/twins-cameras.jpg', w: 1028, h: 1500, alt: 'The twin photographers in matching pink outfits, each holding a film camera' },
]

export const reasons = [
  { title: 'Affordable, good quality', text: 'Solo portraits start at ₱150 on promo, so good photos are within reach for everyday milestones too.' },
  { title: 'A cozy home studio', text: 'Our studio is home-based in Toril, so sessions feel personal and unhurried, with themed setups when you want them.' },
  { title: 'Recommended by clients', text: '100% recommend across 60 reviews on our Facebook page.', link: { label: 'Read the reviews', href: studio.facebookReviews } },
]

// Inquiry form time slots, used until the owner sets them in the Sanity dashboard.
// Times are "HH:mm" (24-hour). Placeholder hours: confirm them with the studio.
export const schedule = {
  slots: ['09:00', '10:30', '13:00', '14:30', '16:00'],
  closedWeekdays: [], // e.g. ['sun']
  unavailable: [], // e.g. [{ date: '2026-12-24', allDay: true }, { date: '2026-11-05', times: ['13:00'] }]
}
