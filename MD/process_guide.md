# Process & Handover Guide (For Claude Code / Developers)

## 1. Project Overview
This website for **Caviar Pavers** is built with a **static HTML/CSS** architecture but structured to be easily converted to a dynamic site or maintained via JSON data.

**Core Tech Stack:**
- **HTML5:** Semantic structure ("Luzen" Editorial Style).
- **Vanilla CSS:** Variable-based (`css/variables.css`) design system.
- **Data Source:** `data/content.json` (Contains all text content).

## 2. Directory Structure
```
/
├── index.html       # Homepage (Hero, Lead Form, Split Layout)
├── services.html    # Detailed services (Hardscape vs Outdoor Features)
├── process.html     # 4-Step Work Process
├── portfolio.html   # Image Gallery
├── contact.html     # Dedicated content form
├── assets/
│   └── images/      # logo_dark.png, pattern_gold.png
├── css/
│   ├── variables.css # DEFINITIVE SOURCE for Colors/Fonts
│   └── styles.css    # Layout utilities and component styles
├── data/
│   └── content.json  # TEXT CONTENT REPOSITORY
├── skills/          # AI Context Files (Read these to understand the "Brain")
│   ├── brand_identity.md
│   ├── copywriting.md
│   └── design_styles.md
└── MD/              # Documentation
```

## 3. The "Brain" (Skills)
- **Brand Identity**: Use `#131E32` (Navy) and `#F4B41A` (Gold) strictly.
- **Copywriting**: ALL text changes should logically flow from `content.json`.
- **Design**: "Editorial Narrative". Avoid "boxy" grids. Use split layouts and section counters (01, 02).

## 4. Instructions for Future Updates
**If you (Claude Code) need to update content:**
1.  **Read `data/content.json` first.** This file is the single source of truth for services, phone numbers, and process steps.
2.  If the user asks to "change the phone number", update it in `content.json` AND the HTML files (unless you implement a JS loader).
3.  **Maintaining Style:** Always use `var(--color-primary-blue)` and `var(--color-accent-gold)`. Do NOT hardcode hex values in new CSS.

## 5. Future Enhancements (Ready to Implement)
- **JSON Injection:** Write a simple script to fetch `data/content.json` and populate the HTML elements by ID (e.g., `<h1 id="hero-title">`).
- **Form Handling:** Connect the forms in `index.html` and `contact.html` to a backend service (e.g., Netlify Forms or EmailJS).
