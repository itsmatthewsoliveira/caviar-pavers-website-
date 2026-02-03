# Claude Context - Caviar Pavers Website

## Project Overview
Premium paving & outdoor services website for **Caviar Pavers** based in Jacksonville, Florida.

**Live URL:** https://caviar-pavers-website.vercel.app
**GitHub:** https://github.com/itsmatthewsoliveira/caviar-pavers-website-
**Deployment:** Vercel (auto-deploys on git push)

---

## Tech Stack
- **Static HTML/CSS/JS** (no framework)
- **Fonts:** Poppins (headings) + Inter (body) via Google Fonts
- **Deployment:** Vercel with `vercel.json` config
- **Video:** Vimeo embed for hero background

---

## Brand Identity

### Colors
```css
--navy-dark: #1C263F;      /* Main dark sections */
--navy-darker: #070E2C;    /* Footer */
--gold-primary: #FFBC0D;   /* CTA buttons, accents */
--gold-secondary: #FABB18; /* Hover states */
--cream-bg: #FAF9F5;       /* Light sections */
```

### Typography
- **Headings:** Poppins, 700 weight, negative letter-spacing
- **Body:** Inter, 400-600 weight

### Buttons
- Gold pill-shaped (`border-radius: 100px`)
- Hover effects with ripple animation

---

## Pages (9 total)

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with Vimeo drone video, services overview |
| Services | `services.html` | All services overview |
| Pavers | `pavers.html` | Pavers & driveways service page |
| Pool Decks | `pool-decks.html` | Pool decks & waterfront page |
| Turf | `turf.html` | Artificial turf page |
| Screen Enclosures | `screen-enclosures.html` | Screen enclosures with 3D design, permits, etc. |
| Process | `process.html` | How we work |
| Portfolio | `portfolio.html` | Project gallery |
| Contact | `contact.html` | Contact form |

---

## Key Features Built

### 1. Dropdown Navigation
- Services dropdown with categories (Hardscaping, Outdoor Living)
- Mobile menu overlay with collapsible sections
- Defined in `menu.json`

### 2. Hero Video Background
- Vimeo drone footage: `https://vimeo.com/1161595435`
- Auto-play, looped, muted
- Black overlay for text readability
- Trust badges (10+ Years, 500+ Projects, 5-Star)

### 3. Service Page Design (Jax Paver Guys style)
- Trust badges in hero
- Stats section (4-column grid)
- Alternating content sections
- Feature lists with gold checkmarks
- "Project of the Month" featured section
- Gallery grids
- CTA banners

### 4. Animations & Motion
- Fade-in animations for hero content
- Staggered service card animations
- Button hover ripple effects
- Image hover scale/shadow
- Nav link underline animation
- Reduced motion support for accessibility

---

## File Structure
```
/
├── index.html
├── services.html
├── pavers.html
├── pool-decks.html
├── turf.html
├── screen-enclosures.html
├── process.html
├── portfolio.html
├── contact.html
├── vercel.json
├── menu.json
├── IMAGE_PROMPTS_GUIDE.md    # AI prompts for generating images
├── css/
│   ├── variables.css         # Colors, fonts, spacing
│   └── styles.css            # All styles + animations
├── js/
│   └── main.js               # Mobile menu, form handling
├── assets/
│   └── images/
│       ├── logo_dark.png
│       └── pattern_gold.png
├── components/
│   └── header.html           # Header template reference
└── skills/
    └── brand_identity.md     # Brand guidelines
```

---

## Current Status

### Completed
- ✅ All 9 pages created and styled
- ✅ Dropdown navigation on all pages
- ✅ Mobile responsive design
- ✅ Vimeo hero video on homepage
- ✅ Animations and hover effects
- ✅ Deployed to Vercel
- ✅ GitHub repo connected

### Still Using Placeholders
- ⏳ Images are placeholder (placehold.co)
- ⏳ Need real project photos
- ⏳ Logo files may need updating

---

## Important Commands

**Push changes to deploy:**
```bash
cd "/Users/chef/Desktop/caviar pavers website  new"
git add -A && git commit -m "Your message" && git push
```

**Local preview:**
```bash
cd "/Users/chef/Desktop/caviar pavers website  new"
python3 -m http.server 8000
# Then open http://localhost:8000
```

**Deploy manually:**
```bash
npx vercel --prod
```

---

## Style Reference

Inspired by **Jax Paver Guys** (https://jaxpaverguys.com):
- Trust badges in hero sections
- Stats grids with big numbers
- Italicized emphasis words in headlines
- Feature lists with checkmarks
- "Project of the Month" sections
- Alternating light/dark sections

---

## Image Prompts

Full AI image generation prompts are in `IMAGE_PROMPTS_GUIDE.md` with:
- 49 total images needed
- Prompts for Midjourney, DALL-E, Stable Diffusion
- Organized by page
- Drone footage placement notes

---

## Quick Fixes Reference

**Change hero overlay opacity:**
```css
/* In css/styles.css */
.hero-video .hero-overlay {
    background: rgba(0, 0, 0, 0.5); /* Adjust 0.5 for darker/lighter */
}
```

**Change button color:**
```css
/* In css/variables.css */
--gold-primary: #FFBC0D;
```

**Add new service to dropdown:**
Edit `menu.json` and update header in all HTML files.

---

## Contact Info in Site
- **Phone:** 904-749-5327
- **Email:** contact@caviarpavers.com
- **Location:** Jacksonville & Northeast Florida

---

*Last updated: February 2026*
