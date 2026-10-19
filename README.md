# 2win Angels Photography Studio — Landing Page

React + Vite + Tailwind CSS + Lucide icons.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

1. Unzip the folder and open it in VS Code (**File → Open Folder…**).
2. Open the terminal (**Terminal → New Terminal**) and run:

   ```bash
   npm install
   npm run dev
   ```

3. Your browser opens at `http://localhost:5173`. Edits you save show up instantly.

## Editing content

All text, prices, photos and contact details are in **`src/data/content.js`**. Change them there; the components pick them up automatically.

- **Photos:** put new images in `public/images/` and reference them as `/images/your-photo.jpg`. Update `w` and `h` to the real size so the gallery doesn't jump while loading.
- **Prices:** edit the `packages` list.
- **Colors and fonts:** the brand tokens are at the top of `src/index.css`.

## Portfolio dashboard (optional)

The portfolio photos can be managed from an online dashboard (Sanity Studio, in the `studio/` folder), so the studio owner can add, remove, reorder and describe photos without editing code. See **[SANITY_SETUP.md](SANITY_SETUP.md)** for setup and a short guide for the owner.

Without a `.env` file, the site keeps using the photos in `src/data/content.js`.

## Building for the web

```bash
npm run build
```

The finished site is in the `dist/` folder, ready to upload to Netlify, Vercel, GitHub Pages or any web host. `npm run preview` lets you check the built version first.

## Notes

- The inquiry form has no backend. It validates the fields, then opens a pre-filled email to the studio in the visitor's email app. To receive submissions directly, connect a form service (e.g. Formspree) in `src/components/BookingSection.jsx`.
- Confirm that `https://m.me/2winangelsphotography.studio` opens the studio's Messenger (set in `content.js`).
