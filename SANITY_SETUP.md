# Portfolio dashboard (Sanity) — setup

This lets the studio owner add, remove, reorder and describe portfolio photos from an online dashboard, without touching any code.

Until these steps are done, the website keeps showing the built-in photos from `src/data/content.js`. Nothing breaks.

## One-time setup (for the developer)

### 1. Create a Sanity project

1. Go to [sanity.io/manage](https://www.sanity.io/manage) and sign in (a free account is enough).
2. Create a new project, for example "2win Angels".
3. When asked for a dataset, create one named **`production`** and make it **Public**. (If you create it later: **Datasets → Add dataset**, visibility *Public*.)
4. Copy the **Project ID** shown at the top of the project page (it looks like `abc123xy`).

### 2. Paste the Project ID

Replace `YOUR_PROJECT_ID` with your Project ID in:

- `studio/sanity.config.js`
- `studio/sanity.cli.js`

Then, in the main website folder, copy `.env.example` to a new file named `.env` and fill it in:

```
VITE_SANITY_PROJECT_ID=abc123xy
VITE_SANITY_DATASET=production
```

### 3. Allow the website to read the photos (CORS)

In [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → CORS origins → Add CORS origin**, add:

- `http://localhost:5173` (for testing on your computer)
- your live website address, e.g. `https://2winangels.netlify.app`

Leave **Allow credentials** turned **off** for both.

### 4. Install the dashboard and import the current photos

In a terminal:

```bash
cd studio
npm install
npx sanity login
npm run import-photos
npm run dev
```

- `npm run import-photos` uploads the 9 photos the website shows today, with their descriptions. It does nothing if the portfolio already has photos, so it's safe to run again.
- `npm run dev` opens the dashboard at `http://localhost:3333`. Check that the photos are there.

From the main website folder, `npm run studio` does the same as `npm run dev` inside `studio/`.

### 5. Put the dashboard online and invite the owner

```bash
cd studio
npm run deploy
```

Choose a name when asked. The dashboard will live at `https://<name>.sanity.studio`.

Then in [sanity.io/manage](https://www.sanity.io/manage) → your project → **Members → Invite members**, invite the owner's email. They create a free Sanity account from the invitation and can then log in to the dashboard.

### 6. Connect the live website

On your hosting provider (Netlify, Vercel, etc.), add these environment variables:

| Name | Value |
| --- | --- |
| `VITE_SANITY_PROJECT_ID` | your Project ID |
| `VITE_SANITY_DATASET` | `production` |

Then **redeploy** the site (the values are read when the site is built). The live gallery now shows the photos from the dashboard.

## How the owner uses it

Open `https://<name>.sanity.studio`, log in, and click **Portfolio photos & videos**.

- **Add photos:** drag photos from your computer into the photo area (or click **Add item** and choose **Photo**).
- **Describe a photo:** click the photo and fill in **Short description**, e.g. "A smiling baby at a pink first-birthday setup". This helps visitors who can't see the photo.
- **Reorder:** drag a photo to a new spot. The first photo appears first on the website.
- **Remove:** click the photo's menu (⋯) and choose **Remove**.
- **Crop or choose the focus:** click the photo, then the crop icon. Drag the frame to crop, and the circle to mark the most important part.
- **Publish:** nothing goes live until you press the green **Publish** button at the bottom.

After publishing, changes appear on the website within about a minute. Refresh the page to see them.

Tip: 9 to 12 items look best in the gallery.

### Adding videos

- **Add a video:** drag an MP4 video into the same area as the photos (or click **Add item** and choose **Video**). Videos appear in their own **Videos** section below the photos, with a play button, and play when tapped. Their order follows the order in the list.
- **Describe it:** click the video and fill in **Short description**.
- **Cover photo (optional):** add a photo to show before the video plays. Without one, the first frame of the video is shown.
- **Keep videos short:** under 1 minute and under about 30 MB. Big videos load slowly on phones and use up the free Sanity plan faster. Phones can save a smaller copy when sharing or exporting (choose a lower quality, such as 720p or 1080p).
- Reorder, remove and **Publish** work the same as for photos.

## Opening times and availability

The inquiry form shows the times a visitor can choose after they pick a date. The owner controls these from the same dashboard: click **Opening times & availability**.

- **Session start times:** tick the times a session can start on a normal open day.
- **Closed every week on:** tick days the studio is always closed (leave empty if open every day).
- **Booked or closed dates:** click **Add item**, pick the date, then either
  - tick the **booked times** for that date (they appear crossed out on the website), or
  - turn on **Whole day** if the studio is closed or fully booked that day.
  - A **private note** (e.g. the client's name) is optional and never shown on the website.
- Press **Publish**. Changes appear on the website within about a minute.

Past dates are hidden from visitors automatically, and times that have already passed today can't be picked. Visitors only send an inquiry, so nothing is booked automatically. When you confirm a session with a client, add it under **Booked or closed dates** so nobody else picks that time.

Until the first time you publish this page, the website shows default times from `src/data/content.js` (`schedule`).

After adding this feature, redeploy the dashboard once (`npm run deploy` in `studio/`) so the hosted dashboard shows the new page.
