# SPADES — The Detailing Xperts · website

A premium car & bike detailing website for **SPADES — The Detailing Xperts**, Anducode, Kanyakumari.
Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, Framer Motion and Lucide icons.

The design combines the two reference videos in the SPADES black & yellow palette:

- **Modern 2025-style layout:**
  - A bright full-bleed hero in a rounded frame, revealed from the centre on load.
  - A floating glass pill navbar.
  - A yellow service marquee.
  - A bento service grid.
  - Light and dark sections alternating.
- **From the "ONYX Detail Co." reference:**
  - The headline, CTAs and stats card.
  - Package cards with images and a featured yellow border.
  - The "Tell us about your ride" enquiry layout.
- **From the "Auto Spa" reference:**
  - Boxed navigation links and the "Book ↗" button with an arrow tile.
  - Numbered editorial service cards.
  - The curved 3D image arc ("See the detail").
  - The "Who we are" split section.
  - The numbered multi-step booking form.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Windows: double-click `start-dev.bat`.

```bash
npm run build && npm start   # production build
npm run typecheck            # TypeScript check
```

## Deploy free (Vercel)

1. Push this folder to a GitHub repo.
2. On vercel.com, choose **Add New → Project → Import**. Next.js is detected automatically.
3. Click **Deploy**. After that, every `git push` redeploys.
4. Set `siteUrl` in `src/config/business.ts` to the live domain, for the SEO tags and sitemap.

## Pages

| Route | Contents |
|---|---|
| `/` | Hero → marquee → bento services → curved 3D gallery → 4-scene scroll story → who we are → before/after slider → process → packages → Instagram → booking |
| `/services` | Every service as an editorial row, plus packages and booking |
| `/services/[slug]` | 7 detail pages (foam-wash, interior-detailing, paint-correction, ceramic-wax, ceramic-coating, underbody-coating, headlight-restoration) |
| `/gallery` | Filterable grid with a full-screen viewer (keyboard ← → Esc) and an Instagram link |
| `/about` | Story, studio photos, values, process |
| `/contact` | Call / WhatsApp / directions / hours cards, booking form, map |

Also included: `sitemap.xml`, `robots.txt`, Open Graph image, LocalBusiness (AutoWash) JSON-LD, favicon, a 404 page, and a sticky Call / WhatsApp / Book bar on phones.

## Business details: `src/config/business.ts`

Everything here was taken from SPADES' own Instagram posts and signboard:

- Phones: 6374465349 and 8248318912.
- Address: Near Co-operative Society, Anducode, Kanyakumari 629168.
- Instagram: @spades_thedetailingxperts.
- Free pick-up & drop.

**Fill these in before launch (marked TODO):**

| Setting | What to do |
|---|---|
| `whatsapp` | Confirm which number has WhatsApp (currently 6374465349) |
| `email` | Empty, so email links are hidden |
| `hours` | Empty, so the site shows "Call to confirm today's timings" |
| `siteUrl` | Set to the final domain |

**Prices** live in `src/data/packages.ts` and `src/data/services.ts`, taken from the client's posts:

| Item | Price |
|---|---|
| Refresh | ₹499 / ₹599 / ₹699 |
| Rejuvenate | ₹4,500 / ₹5,500 / ₹6,500 |
| Bike wash | from ₹149 |
| Underbody coating | from ₹2,500 |
| Ceramic wax | from ₹4,500 |
| Ceramic coating | from ₹16,999 |

One older post lists ceramic wax at ₹2,500. **Confirm current prices with the client.**
PPF is deliberately not listed because SPADES has not confirmed offering it.

## Photos: what's real and what to replace

All images are listed in **`src/data/images.ts`**. Change one line to swap a photo.

- **SPADES' own photos:**
  - `public/images/about/studio.jpg`: the black-shed studio with the white car.
  - `public/images/gallery/*`: the hexagon-lit bay, cropped from their reels.
  - `public/images/logo/spades-logo.png`: cut out of a post. **Ask the client for the original logo file** and overwrite it, keeping the same name.
- **Placeholder photos:**
  - Every other photo is a free-licence Unsplash photo (https://unsplash.com/license): commercial use is allowed and no credit is required.
  - They're loaded from `images.unsplash.com`, which is allowed in `next.config.mjs`.
  - They show detailing in general and are **not** presented as SPADES' work. The Gallery page shows only SPADES' real photos.
- **Replace with the client's photos when you get them:**
  1. Put the file in `public/images/...`.
  2. Change the matching line in `images.ts`, e.g. `foamWash: "/images/services/foam-wash.jpg"`.
  3. Once no Unsplash links remain, you can delete `remotePatterns` from `next.config.mjs`.
- **Before/after slider:** it currently uses one photo with a "dull" filter, labelled *Illustration only*. Replace it with a real before/after pair of the same panel, then remove the `beforeFilter` and `illustration` props in `src/app/page.tsx`.

## Hero video and 3D

- **Hero video:**
  - The hero already supports a silent background loop. Save it as `public/videos/hero.mp4` and set `MEDIA.hero.video = "/videos/hero.mp4"` in `src/config/business.ts`.
  - It replaces the hero photo and plays behind the headline.
  - Best footage is a slow gimbal walk into the hexagon-lit bay, or light gliding over a freshly coated car: 8–12 s, no audio.
  - To compress it:
    ```bash
    ffmpeg -i input.mp4 -an -vcodec libx264 -crf 26 -preset slow -movflags +faststart -vf scale=1920:-2 public/videos/hero.mp4
    ```
- **Real-time 3D:**
  - Not included. The brief prioritises photorealism, and a low-quality 3D car would look artificial.
  - A real 3D car needs a professional GLB model with PBR materials. It would go in `public/models/`, rendered with React Three Fiber and an HDRI studio environment.
  - Real footage of SPADES' own bay will always look more authentic.

## Enquiries

- **No backend.** Nothing is stored. Booking forms and "Enquire" buttons open WhatsApp with a prefilled, URL-encoded message (`src/lib/whatsapp.ts`).
- **Call buttons** use `tel:` links.
- **Email buttons** use `mailto:` links and appear only once `email` is set.

## Accessibility and performance

- **Reduced motion:** with `prefers-reduced-motion`, the scroll hero, 3D arc and scroll story fall back to static layouts.
- **Keyboard and labels:** skip link, keyboard-operable menu, slider and lightbox, and visible focus rings.
- **Images:**
  - All images use `next/image` (AVIF/WebP, lazy below the fold).
  - The hero still is preloaded. The video uses `preload="metadata"` with a poster.
- **Fonts:** Inter + Inter Tight via `next/font`, self-hosted at build time.

## Structure

```
public/images/{logo,hero,services,gallery,about}  public/videos  public/models
src/app/                 layout, home, services, services/[slug], gallery, about, contact, sitemap, robots, 404, icons
src/components/layout/   Navbar, Footer, MobileBar
src/components/hero/     ShedHero (scroll push-in)
src/components/services/ ServiceShowcase
src/components/gallery/  CurvedGallery (3D arc), GalleryGrid (+ lightbox)
src/components/animations/ Reveal, MaskLines, ScrollStory
src/components/sections/ WhoWeAre, BeforeAfter, Process, Packages, InstagramCTA
src/components/booking/  BookingForm (4 steps), BookingSection
src/components/ui/       Logo, Buttons, SectionHeading, PageHeader, WhatsAppIcon
src/config/business.ts   ← business details
src/data/                services, packages, gallery, story
src/lib/                 whatsapp, utils
```
