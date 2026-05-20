# DESIGN.md — Maygift Glory Portfolio
> Design system reference, component architecture, and Next.js migration guide.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Design Tokens](#2-design-tokens)
3. [Typography](#3-typography)
4. [Layout Architecture](#4-layout-architecture)
5. [Component Inventory](#5-component-inventory)
6. [Section Specifications](#6-section-specifications)
7. [Motion & Animation](#7-motion--animation)
8. [Responsive Behaviour](#8-responsive-behaviour)
9. [Next.js Migration Guide](#9-nextjs-migration-guide)
10. [File & Folder Structure (Next.js)](#10-file--folder-structure-nextjs)
11. [Dependency Reference](#11-dependency-reference)

---

## 1. Design Philosophy

| Principle | Decision |
|---|---|
| **Aesthetic direction** | Editorial luxury — magazine-scale typography, generous whitespace, asymmetric grids |
| **Tone** | Warm, premium, professional. Not corporate-cold. Not playful-casual. |
| **Anti-pattern** | No SaaS templates, no purple gradients, no centered card-on-white-box layouts |
| **Differentiator** | The persistent dark sidebar against a blush canvas creates immediate visual tension and sophistication |
| **Memorable moment** | The oversized serif headline in the hero — biggest element on the page, sets authority immediately |

---

## 2. Design Tokens

All tokens live in a single source of truth. In the current HTML implementation they are CSS custom properties on `:root`. In Next.js they move to `tokens.ts` and `tailwind.config.ts`.

### Color Palette

| Token | Hex | Role |
|---|---|---|
| `--bg` / `color.bg` | `#F2E2E2` | Global page background (Pale Blush) |
| `--text` / `color.text` | `#3A2A2A` | All primary typography (Deep Charcoal/Espresso) |
| `--accent` / `color.accent` | `#5684A6` | Primary CTAs, key links, underline accents (Steel Blue) |
| `--rose` / `color.rose` | `#D198A8` | Labels, hover states, callout borders, drop shadows (Dusty Rose/Mauve) |
| `--slate` / `color.slate` | `#7CA8C1` | Secondary hover tones, subtle link states (Light Slate Blue) |
| `--card-bg` / `color.cardBg` | `#EDD4D4` | Card and section backgrounds, large number glyphs |
| `--white` / `color.white` | `#FDFAFA` | Service cards, work placeholders (Warm White) |

### Spacing Scale

The project uses an 8px base unit. Key values:

| Token | Value | Usage |
|---|---|---|
| `--sidebar-w` | `220px` | Fixed sidebar width |
| Section padding | `0 6vw` | Horizontal breathing room inside every section |
| Card padding | `2.5rem 2rem` | Internal service card spacing |
| Section gap | `3rem–4rem` | Between major elements within a section |

### Easing

```
--ease: cubic-bezier(.16, 1, .3, 1)
```
A fast-out, slow-in spring curve. Used on all transforms, color transitions, and reveals. Feels purposeful and confident — not bouncy.

---

## 3. Typography

### Font Families

| Role | Family | Fallback |
|---|---|---|
| Display / Headings | `Playfair Display` | `Georgia, serif` |
| Body / UI / Labels | `DM Sans` | `system-ui, sans-serif` |

### Weights Used

| Family | Weights |
|---|---|
| Playfair Display | 400 (regular), 600, 700, 900 — plus italic variants 400i, 700i |
| DM Sans | 300 (light), 400, 500, 600 |

### Type Scale

| Element | Font | Size (clamp) | Weight | Notes |
|---|---|---|---|---|
| Hero headline | Playfair Display | `clamp(2.6rem, 5vw, 5rem)` | 900 | `letter-spacing: -0.02em`, `line-height: 1.05` |
| Section headline | Playfair Display | `clamp(2rem, 3.5vw, 3.6rem)` | 700 | `letter-spacing: -0.02em`, `line-height: 1.1` |
| Service card title | Playfair Display | `1.3rem` | 700 | `line-height: 1.2` |
| Body copy | DM Sans | `1rem–1.05rem` | 300 | `line-height: 1.7–1.8` |
| Labels | DM Sans | `0.7rem` | 600 | `letter-spacing: 0.18em`, `text-transform: uppercase` |
| Nav links | DM Sans | `0.78rem` | 500 | `letter-spacing: 0.1em`, `text-transform: uppercase` |
| Card list items | DM Sans | `0.82rem` | 400 | `opacity: 0.7` |
| Card tools | DM Sans | `0.78rem` | 500 | `color: var(--accent)` |

### Italic Usage

Italic in Playfair Display is always intentional and carries semantic weight — it marks the **emotive or memorable phrase** inside a headline. Never use italic for decoration alone.

```
"Core services & <em>niches.</em>"
"I run the backend of leaders who don't have time to <em>run it themselves.</em>"
```

---

## 4. Layout Architecture

### The Shell

```
┌─────────────┬──────────────────────────────────────────┐
│             │                                          │
│   SIDEBAR   │          MAIN SCROLL CANVAS             │
│   220px     │    (scroll-snap, height: 100vh)          │
│   fixed     │                                          │
│             │   ┌──────────────────────────────────┐  │
│   dark bg   │   │  SECTION 1 — 100vh               │  │
│   #3A2A2A   │   ├──────────────────────────────────┤  │
│             │   │  SECTION 2 — 100vh               │  │
│   z: 100    │   ├──────────────────────────────────┤  │
│             │   │  SECTION 3 — 100vh               │  │
│             │   └──────────────────────────────────┘  │
└─────────────┴──────────────────────────────────────────┘
```

- The **sidebar** is `position: fixed`, always visible, `z-index: 100`
- The **main canvas** has `margin-left: 220px`, `height: 100vh`, `overflow-y: scroll`
- `scroll-snap-type: y mandatory` on the canvas; `scroll-snap-align: start` + `scroll-snap-stop: always` on every `<section>`
- The scroll progress bar is `position: fixed`, sits above the sidebar offset at `left: 220px`

### Section Grid Patterns

**Hero (Section 1)** — Flex row, `justify-content: space-between`
```
[Content block — flex:1] [Image block — flex: 0 0 380px]
```

**About (Section 2)** — CSS Grid `1fr 1fr`
```
[Bio + CTA]  [Legal callout box]
```

**Services (Section 3)** — CSS Grid `repeat(3, 1fr)` with header row above
```
[Header + CTA row — full width]
[Card 01]  [Card 02]  [Card 03]
```

**Work (Section 4)** — Asymmetric CSS Grid `2fr 1fr 1fr`, two rows
```
[Large feature item — row-span 2]  [Item 2]  [Item 3]
                                   [Item 4]  [Item 5]
```

**Contact (Section 5)** — CSS Grid `1.1fr 1fr`
```
[Info + links + final CTA]  [Contact form]
```

---

## 5. Component Inventory

### `<Sidebar>`
- Logo lockup (serif name + sans tagline in rose)
- Vertical nav list with animated line indicator (`::before` pseudo-element grows to 20px on active/hover)
- Social/contact links at bottom in muted rose
- Active state driven by `IntersectionObserver` on scroll canvas

### `<Button>`
Two variants — driven by a `variant` prop:

| Variant | Background | Text | Hover |
|---|---|---|---|
| `primary` | `#5684A6` | `#FDFAFA` | `bg: #3A2A2A`, `translateY(-2px)` |
| `outline` | `transparent` | `#3A2A2A` | `bg: #3A2A2A`, `color: #FDFAFA` |

Both: `font-size: 0.8rem`, `font-weight: 600`, `letter-spacing: 0.1em`, `text-transform: uppercase`, `padding: 0.9rem 2rem`, **no border-radius** (sharp corners are intentional).

### `<Label>`
Reusable uppercase overline. Rose color, `0.7rem`, `letter-spacing: 0.18em`. Used above every section headline.

### `<ServiceCard>`
- Sharp corners, white background (`#FDFAFA`)
- Large decorative number (`4rem`, color: `#EDD4D4`)
- Bottom `3px` accent bar animates in on hover via `::after` pseudo-element `scaleX(0 → 1)`
- `transform: translateY(-4px)` + box shadow on hover

### `<WorkItem>`
- Tinted background per category (blush, blue, rose, green tones)
- Centered icon + label placeholder
- Absolute-positioned category tag (bottom-left, accent blue)
- First item spans 2 grid rows (feature item)

### `<ContactForm>`
- Dark-themed inputs: `background: rgba(242,226,226,.06)`, `border: 1px solid rgba(242,226,226,.15)`
- Focus state: border becomes `--rose`, background warms slightly
- Submit button: Steel Blue → Rose on hover

### `<RevealWrapper>`
Wraps any element that should animate in on scroll entry. Uses `IntersectionObserver` on the scroll canvas (not `window`) to add `.visible` class.

```css
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s ease, transform .7s ease; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

Delay variants: `.reveal-delay-1` through `.reveal-delay-5` (steps of `0.1s`).

---

## 6. Section Specifications

### Section 1 — Hero (`#home`)
- **Background:** `#F2E2E2`
- **Layout:** Flex row, `padding: 0 6vw`, `gap: 4vw`
- **Image block:** `320×420px` container, rose drop-shadow offset `18px` bottom-right, `z-index` layering
- **Deco line:** `1px` vertical gradient line, absolutely positioned right of image — `linear-gradient(to bottom, transparent, var(--rose), transparent)`

### Section 2 — About (`#about`)
- **Background:** `#3A2A2A` (dark)
- **Callout box:** Left border `3px solid #D198A8`, `background: rgba(209,152,168,.07)`. Decorative `§` glyph positioned top-right at `3rem`, `opacity: 0.15`

### Section 3 — Services (`#services`)
- **Background:** `#F2E2E2`
- Card number `opacity` is set via color `#EDD4D4` (card-bg), so it reads as a ghost behind the title

### Section 4 — Sample Work (`#work`)
- **Background:** `#EDD4D4` (card-bg — slightly darker than main bg for contrast)
- Grid item backgrounds use `linear-gradient` pairs for visual variety without relying on images

> ⚠️ **This section has an expanded spec — see Section 12 below before building `WorkSection.tsx`.**

### Section 5 — Contact (`#contact`)
- **Background:** `#3A2A2A` (dark, matches About section — creates bookend symmetry)
- Final CTA callout: `background: rgba(86,132,166,.12)`, `border: 1px solid rgba(86,132,166,.3)` — glassy blue tint

---

## 7. Motion & Animation

All animation is CSS-only (no JS animation libraries) in the current implementation.

| Element | Property | Duration | Easing |
|---|---|---|---|
| Scroll reveals | `opacity`, `translateY(28px → 0)` | `0.7s` | `cubic-bezier(.16,1,.3,1)` |
| Nav hover line | `width: 0 → 20px` | `0.3s` | same |
| Button hover | `translateY(-2px)`, `background` | `0.3s` | same |
| Card hover lift | `translateY(-4px)`, `box-shadow` | `0.3s` | same |
| Card accent bar | `scaleX(0 → 1)` | `0.4s` | same |
| Form focus | `border-color`, `background` | `0.25s` | linear |
| Progress bar | `scaleX` | `0.1s` | linear |

**Stagger pattern:** Delay increments of `0.1s`, from `reveal-delay-1` (0.1s) through `reveal-delay-5` (0.5s). Apply to sibling elements within the same section.

---

## 8. Responsive Behaviour

### Breakpoint: `≤ 900px`

| Element | Desktop | Mobile |
|---|---|---|
| Sidebar | Fixed left, `220px` wide, full height | Sticky top bar, full width, `auto` height |
| Sidebar logo tagline | Visible | Hidden |
| Sidebar social links | Visible | Hidden |
| Nav direction | Vertical column | Horizontal row |
| Main canvas margin | `margin-left: 220px` | `margin-left: 0` |
| Hero layout | 2-column flex row | Single column (image hidden) |
| About grid | `1fr 1fr` | `1fr` (stacked) |
| Services grid | `repeat(3, 1fr)` | `1fr` (stacked) |
| Work grid | Asymmetric `2fr 1fr 1fr` | `1fr 1fr` uniform |
| Contact grid | `1.1fr 1fr` | `1fr` (stacked) |

---

## 9. Next.js Migration Guide

### Overview

Migrating from a single HTML file to a Next.js App Router project involves three main steps:
1. Setting up the project with the right dependencies
2. Recreating the design system in Tailwind + CSS variables
3. Splitting the HTML into components and pages

---

### Step 1 — Scaffold the Project

```bash
npx create-next-app@latest maygift-glory \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd maygift-glory
```

Install additional dependencies:

```bash
# Fonts (next/font replaces the Google Fonts <link> tag)
# Built into Next.js — no extra install needed

# Animation (optional upgrade from CSS-only)
npm install framer-motion

# Form handling (optional)
npm install react-hook-form
```

---

### Step 2 — Configure Tailwind

Replace the contents of `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:      '#F2E2E2',
        text:    '#3A2A2A',
        accent:  '#5684A6',
        rose:    '#D198A8',
        slate:   '#7CA8C1',
        cardBg:  '#EDD4D4',
        white:   '#FDFAFA',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.6rem, 5vw, 5rem)',
        'section': 'clamp(2rem, 3.5vw, 3.6rem)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(.16,1,.3,1)',
      },
      width: {
        'sidebar': '220px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Step 3 — Set Up Fonts in `layout.tsx`

```tsx
// src/app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Maygift Glory — Executive Virtual Assistant',
  description: 'Premium Virtual and Executive Assistant services. Reclaim 10+ hours every week.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

---

### Step 4 — Global CSS

```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --sidebar-w: 220px;
  --ease: cubic-bezier(.16, 1, .3, 1);
}

::selection {
  background: #D198A8;
  color: #FDFAFA;
}

/* Scroll canvas */
.main-canvas {
  margin-left: var(--sidebar-w);
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

/* Sections */
section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

/* Noise grain overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 999;
  opacity: 0.4;
}

@media (max-width: 900px) {
  :root { --sidebar-w: 0px; }
  .main-canvas { margin-left: 0; height: calc(100vh - 56px); }
}
```

---

### Step 5 — Component Architecture

```
src/
└── components/
    ├── layout/
    │   ├── Sidebar.tsx          ← Fixed nav, logo, social links
    │   └── ProgressBar.tsx      ← Scroll progress indicator
    ├── ui/
    │   ├── Button.tsx           ← variant: 'primary' | 'outline'
    │   ├── Label.tsx            ← Uppercase overline label
    │   └── RevealWrapper.tsx    ← IntersectionObserver reveal HOC
    └── sections/
        ├── HeroSection.tsx
        ├── AboutSection.tsx
        ├── ServicesSection.tsx
        ├── WorkSection.tsx
        └── ContactSection.tsx
```

---

### Step 6 — Key Component Examples

#### `Button.tsx`
```tsx
// src/components/ui/Button.tsx
import { ReactNode } from 'react'
import Link from 'next/link'

type ButtonProps = {
  variant?: 'primary' | 'outline'
  href?: string
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function Button({ variant = 'primary', href, children, onClick, type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-8 py-3.5 transition-all duration-300 ease-spring'
  const styles = {
    primary: 'bg-accent text-white hover:bg-text hover:-translate-y-0.5 hover:shadow-lg',
    outline: 'border border-text text-text hover:bg-text hover:text-white',
  }
  const cls = `${base} ${styles[variant]}`

  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
```

#### `RevealWrapper.tsx`
```tsx
// src/components/ui/RevealWrapper.tsx
'use client'
import { useEffect, useRef, ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number   // in ms, e.g. 100, 200, 300
  className?: string
}

export function RevealWrapper({ children, delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = document.getElementById('mainCanvas')
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible') },
      { root: canvas, threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

#### `Sidebar.tsx`
```tsx
// src/components/layout/Sidebar.tsx
'use client'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home',        id: 'home' },
  { label: 'About',       id: 'about' },
  { label: 'Services',    id: 'services' },
  { label: 'Sample Work', id: 'work' },
  { label: 'Contact',     id: 'contact' },
]

export function Sidebar() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const canvas = document.getElementById('mainCanvas')
    const sections = document.querySelectorAll('section')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { root: canvas, threshold: 0.5 }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed left-0 top-0 w-[220px] h-screen bg-text flex flex-col justify-between p-12 z-[100]">
      {/* Logo */}
      <div className="font-serif font-bold text-bg leading-snug">
        Maygift<br />Glory
        <span className="block font-sans font-light text-[0.68rem] text-rose tracking-[0.12em] uppercase mt-1">
          Executive VA
        </span>
      </div>

      {/* Nav */}
      <ul className="flex flex-col gap-1">
        {navItems.map(({ label, id }) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`flex items-center gap-3 text-[0.78rem] font-medium tracking-widest uppercase py-2.5 transition-colors duration-200 w-full text-left
                ${active === id ? 'text-bg' : 'text-bg/40 hover:text-bg'}
              `}
            >
              <span className={`h-px bg-rose transition-all duration-300 flex-shrink-0 ${active === id ? 'w-5' : 'w-0'}`} />
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Social */}
      <div className="flex flex-col gap-2">
        {[
          { label: 'Email',    href: 'mailto:maygiftglory64@gmail.com' },
          { label: 'LinkedIn', href: 'https://linkedin.com' },
          { label: 'Calendly', href: 'https://calendly.com' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener"
            className="text-[0.68rem] font-medium tracking-widest uppercase text-bg/30 hover:text-rose transition-colors duration-200">
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}
```

#### `page.tsx` (App Router entry point)
```tsx
// src/app/page.tsx
import { HeroSection }     from '@/components/sections/HeroSection'
import { AboutSection }    from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WorkSection }     from '@/components/sections/WorkSection'
import { ContactSection }  from '@/components/sections/ContactSection'
import { Sidebar }         from '@/components/layout/Sidebar'
import { ProgressBar }     from '@/components/layout/ProgressBar'

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Sidebar />
      <main className="main-canvas" id="mainCanvas">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <ContactSection />
      </main>
    </>
  )
}
```

---

### Step 7 — Image Handling (Headshot)

Replace the SVG placeholder with Next.js `<Image>`:

```tsx
import Image from 'next/image'

// In HeroSection.tsx — inside the .hero__img-box div:
<Image
  src="/images/maygift-headshot.jpg"
  alt="Maygift Glory, Executive Virtual Assistant"
  fill
  priority
  className="object-cover object-top"
  sizes="(max-width: 900px) 0px, 320px"
/>
```

Place the photo at `public/images/maygift-headshot.jpg`.

---

### Step 8 — Contact Form with Server Action

```tsx
// src/app/actions/contact.ts
'use server'

export async function submitContact(formData: FormData) {
  const name    = formData.get('name') as string
  const email   = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  // Option A: Send via Resend (npm install resend)
  // Option B: Send via Nodemailer
  // Option C: POST to a webhook (Zapier, Make.com)

  // Minimal example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({
  //   from: 'portfolio@yourdomain.com',
  //   to: 'maygiftglory64@gmail.com',
  //   subject: `New enquiry: ${subject}`,
  //   text: `From: ${name} (${email})\n\n${message}`,
  // })

  return { success: true }
}
```

---

## 10. File & Folder Structure (Next.js)

```
maygift-glory/
├── public/
│   └── images/
│       └── maygift-headshot.jpg      ← Drop photo here
├── src/
│   ├── app/
│   │   ├── layout.tsx                ← Font setup, metadata
│   │   ├── page.tsx                  ← Root page, section assembly
│   │   ├── globals.css               ← Base styles, scroll-snap, noise grain
│   │   └── actions/
│   │       └── contact.ts            ← Server action for form
│   └── components/
│       ├── layout/
│       │   ├── Sidebar.tsx
│       │   └── ProgressBar.tsx
│       ├── ui/
│       │   ├── Button.tsx
│       │   ├── Label.tsx
│       │   └── RevealWrapper.tsx
│       └── sections/
│           ├── HeroSection.tsx
│           ├── AboutSection.tsx
│           ├── ServicesSection.tsx
│           ├── WorkSection.tsx
│           └── ContactSection.tsx
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── DESIGN.md                         ← This file
```

---

## 11. Dependency Reference

### Core (always needed)
| Package | Version | Purpose |
|---|---|---|
| `next` | `^15` | Framework |
| `react` / `react-dom` | `^19` | UI library |
| `typescript` | `^5` | Type safety |
| `tailwindcss` | `^3` | Utility-first CSS |

### Optional but recommended
| Package | Purpose |
|---|---|
| `framer-motion` | Replaces CSS reveals with cleaner scroll animations via `useInView` |
| `react-hook-form` | Form state management and validation for the contact form |
| `resend` | Transactional email for the contact form server action |
| `@vercel/analytics` | Page view analytics (free on Vercel) |

### Framer Motion upgrade note
If you install `framer-motion`, replace `RevealWrapper.tsx` with:

```tsx
'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export function RevealWrapper({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

---

*Last updated: May 2026. Design by brief — Maygift Glory Portfolio.*

---

## 12. Portfolio Section — Expanded Spec (Cloudinary + Mixed Media)

> **For Antigravity:** This section replaces the placeholder `WorkSection` component entirely. Do not modify any other section. The aesthetic — palette, typography, easing, sidebar, scroll-snap — is locked. Only build what is described here.

---

### 12.1 What This Section Needs to Do

The Sample Work section must:
- Display a **mixed feed** of screenshots (images) and screen recordings (videos) sourced from Cloudinary
- Clearly distinguish between media types so the viewer always knows what they're looking at
- Let the viewer **see the work clearly** — not just thumbnail it. Clicking any item should open a focused lightbox
- Feel **editorial and intentional**, not like a photo grid dump. Asymmetric layout, dynamic aspect ratios, category filtering
- Handle video natively (autoplay muted on hover, full sound in lightbox)
- Remain **within the existing design system** — no new colors, no new fonts, no new motion curves

---

### 12.2 Data Model

Each portfolio item comes from Cloudinary. Define this type in `src/types/portfolio.ts`:

```ts
// src/types/portfolio.ts

export type MediaType = 'image' | 'video'

export type PortfolioCategory =
  | 'Executive VA'
  | 'Admin & Operations'
  | 'Creative & Social'

export type PortfolioItem = {
  id: string                    // Cloudinary public_id
  type: MediaType
  category: PortfolioCategory
  title: string                 // e.g. "Multi-timezone Calendar Setup"
  description?: string          // 1–2 sentence caption shown in lightbox
  cloudinaryId: string          // Cloudinary public_id, used to build URLs
  aspectRatio: '16/9' | '4/3' | '1/1' | '9/16'   // drives grid sizing
  featured?: boolean            // if true, item gets the large feature slot
  duration?: string             // for videos only, e.g. "1:24"
}
```

---

### 12.3 Cloudinary Integration

Install:
```bash
npm install @cloudinary/react @cloudinary/url-gen
```

Configure once in `src/lib/cloudinary.ts`:
```ts
import { Cloudinary } from '@cloudinary/url-gen'

export const cld = new Cloudinary({
  cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME }
})
```

Add to `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

**URL helpers** — use these to build `src` values, never hardcode URLs:

```ts
import { cld } from '@/lib/cloudinary'
import { thumbnail, fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { format, quality } from '@cloudinary/url-gen/actions/delivery'
import { auto } from '@cloudinary/url-gen/qualifiers/format'

// For image thumbnails in the grid
export function getImageUrl(publicId: string, width: number, height: number) {
  return cld.image(publicId)
    .resize(fill().width(width).height(height).gravity(autoGravity()))
    .delivery(quality('auto'))
    .delivery(format(auto()))
    .toURL()
}

// For video thumbnails (poster frame)
export function getVideoPosterUrl(publicId: string, width: number, height: number) {
  return cld.video(publicId)
    .resize(fill().width(width).height(height))
    .delivery(quality('auto'))
    .delivery(format(auto()))
    .toURL()
}

// For full video streaming src
export function getVideoUrl(publicId: string) {
  return cld.video(publicId)
    .delivery(quality('auto'))
    .delivery(format(auto()))
    .toURL()
}
```

---

### 12.4 Data Source

Portfolio items are defined in a static data file. Cloudinary IDs get swapped in as Maygift uploads her work. Keep data co-located with the section:

```ts
// src/components/sections/work/portfolioData.ts
import { PortfolioItem } from '@/types/portfolio'

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'item-01',
    type: 'image',
    category: 'Executive VA',
    title: 'Multi-timezone Calendar Setup',
    description: 'Google Calendar structured across 3 timezones for a US/UK/AU executive team.',
    cloudinaryId: 'portfolio/calendar-setup',   // ← swap in real ID
    aspectRatio: '16/9',
    featured: true,
  },
  {
    id: 'item-02',
    type: 'video',
    category: 'Admin & Operations',
    title: 'Inbox Zero Workflow',
    description: 'Screen recording demonstrating a full inbox triage and label system in Gmail.',
    cloudinaryId: 'portfolio/inbox-workflow',
    aspectRatio: '16/9',
    duration: '1:12',
  },
  {
    id: 'item-03',
    type: 'image',
    category: 'Creative & Social',
    title: 'Instagram Content Batch',
    description: 'Canva-designed carousel set for a B2B brand's monthly content plan.',
    cloudinaryId: 'portfolio/social-batch',
    aspectRatio: '1/1',
  },
  {
    id: 'item-04',
    type: 'video',
    category: 'Admin & Operations',
    title: 'ClickUp Workspace Setup',
    description: 'Walkthrough of a full project management workspace built from scratch.',
    cloudinaryId: 'portfolio/clickup-setup',
    aspectRatio: '16/9',
    duration: '2:04',
  },
  {
    id: 'item-05',
    type: 'image',
    category: 'Executive VA',
    title: 'Travel Itinerary Doc',
    description: 'Structured travel brief with flights, hotels, and local logistics.',
    cloudinaryId: 'portfolio/travel-brief',
    aspectRatio: '4/3',
  },
  {
    id: 'item-06',
    type: 'image',
    category: 'Creative & Social',
    title: 'Brand Positioning Deck',
    description: 'Slide deck supporting a client rebrand across LinkedIn and Instagram.',
    cloudinaryId: 'portfolio/brand-deck',
    aspectRatio: '16/9',
  },
]
```

---

### 12.5 Layout — The Grid

The grid is **asymmetric and editorial**. It uses CSS Grid with named areas that shift at breakpoints. The featured item (`featured: true`) always takes the large slot.

**Desktop layout (≥ 1024px):** `3-column × 2-row` base unit, feature item spans `2 rows × 2 cols`

```
┌──────────────────────┬─────────────┬─────────────┐
│                      │   item-02   │   item-03   │
│   item-01 (feature)  │  (video)    │  (image)    │
│   2col × 2row        ├─────────────┼─────────────┤
│                      │   item-04   │   item-05   │
│                      │  (video)    │  (image)    │
├──────────────────────┴─────────────┴─────────────┤
│   item-06 (image) — full width strip, short       │
└───────────────────────────────────────────────────┘
```

**Tablet (768px–1023px):** `2-column`, feature item spans `2 cols`, others stack normally.

**Mobile (< 768px):** Single column, all items full width, featured item first.

CSS Grid implementation:

```css
.work-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 1rem;
}

.work-grid__item--feature {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

.work-grid__item--strip {
  grid-column: 1 / -1;
  height: 200px;
}

@media (max-width: 1023px) {
  .work-grid { grid-template-columns: 1fr 1fr; }
  .work-grid__item--feature { grid-column: 1 / -1; grid-row: auto; }
}

@media (max-width: 767px) {
  .work-grid { grid-template-columns: 1fr; }
  .work-grid__item--strip { height: auto; }
}
```

---

### 12.6 Category Filter Bar

A filter bar sits between the section header and the grid. It uses pill-style buttons. **No external library** — plain button state.

```
[ All ]  [ Executive VA ]  [ Admin & Operations ]  [ Creative & Social ]
```

**Active pill:** background `#3A2A2A` (text), label `#F2E2E2` (bg)
**Inactive pill:** background `transparent`, border `1px solid rgba(58,42,42,.2)`, label `#3A2A2A` at `60%` opacity
**Hover (inactive):** border color `#D198A8` (rose), label full opacity

Filtering animates items out with `opacity: 0, scale: 0.97` and back in with `opacity: 1, scale: 1` over `0.25s`. Use CSS transitions on each item, not a library.

```tsx
// src/components/sections/work/FilterBar.tsx
'use client'
type Category = 'All' | 'Executive VA' | 'Admin & Operations' | 'Creative & Social'
const categories: Category[] = ['All', 'Executive VA', 'Admin & Operations', 'Creative & Social']

export function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 text-[0.7rem] font-semibold tracking-widest uppercase transition-all duration-200
            ${active === cat
              ? 'bg-text text-bg border border-text'
              : 'bg-transparent text-text/60 border border-text/20 hover:border-rose hover:text-text'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
```

---

### 12.7 Grid Item — `<WorkCard>`

Each card in the grid:

**Visual anatomy (stacked from back to front):**
```
[ Cloudinary image or video poster — object-cover ]
[ Dark gradient overlay — bottom 60%, opacity 0 → 0.7 on hover ]
[ Category tag — top-left, always visible ]
[ Video badge — top-right, only on video items ]
[ Title + description — bottom-left, slides up on hover ]
[ Play button — centered, only on video items, appears on hover ]
```

**Category tag:** `font-size: 0.65rem`, `font-weight: 600`, `letter-spacing: 0.1em`, `text-transform: uppercase`, `background: #5684A6` (accent), `color: #FDFAFA`, `padding: 0.25rem 0.7rem`. Sharp corners.

**Video badge (top-right):** Small pill — `background: rgba(58,42,42,.7)`, white text, a play icon SVG + duration text (e.g. `▶ 1:12`). `font-size: 0.65rem`.

**Play button (center, video only):** `60px` circle, `background: rgba(242,226,226,.15)`, `border: 1.5px solid rgba(242,226,226,.5)`, white play icon SVG. On hover: `background: rgba(86,132,166,.8)`, scale `1 → 1.08`.

**Hover for video items:** The `<video>` element autoplays muted when the cursor enters the card (`onMouseEnter` → `videoRef.current.play()`). Pauses on leave.

```tsx
// src/components/sections/work/WorkCard.tsx
'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { PortfolioItem } from '@/types/portfolio'
import { getImageUrl, getVideoPosterUrl, getVideoUrl } from '@/lib/cloudinary'

type Props = {
  item: PortfolioItem
  className?: string
  onClick: (item: PortfolioItem) => void
}

export function WorkCard({ item, className = '', onClick }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = () => { if (item.type === 'video') videoRef.current?.play() }
  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`relative overflow-hidden cursor-pointer group bg-cardBg ${className}`}
      onClick={() => onClick(item)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Media */}
      {item.type === 'image' ? (
        <Image
          src={getImageUrl(item.cloudinaryId, 800, 600)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-spring group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <>
          <Image
            src={getVideoPosterUrl(item.cloudinaryId, 800, 600)}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <video
            ref={videoRef}
            src={getVideoUrl(item.cloudinaryId)}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        </>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-text/70 via-transparent to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category tag */}
      <span className="absolute top-3 left-3 z-10 bg-accent text-white text-[0.65rem] font-semibold
        tracking-widest uppercase px-2.5 py-1">
        {item.category}
      </span>

      {/* Video duration badge */}
      {item.type === 'video' && item.duration && (
        <span className="absolute top-3 right-3 z-10 bg-text/70 text-white text-[0.65rem]
          font-medium px-2 py-1 flex items-center gap-1">
          <PlayIcon size={10} /> {item.duration}
        </span>
      )}

      {/* Play button — video only */}
      {item.type === 'video' && (
        <div className="absolute inset-0 flex items-center justify-center z-10
          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full border border-white/50 bg-white/15
            flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <PlayIcon size={20} className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Title — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4
        translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
        transition-all duration-300 ease-spring">
        <p className="font-serif font-bold text-white text-sm leading-snug">{item.title}</p>
      </div>
    </div>
  )
}

function PlayIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}
```

---

### 12.8 Lightbox — `<WorkLightbox>`

Clicking any card opens a full-screen lightbox. This is the "see the work clearly" moment.

**Anatomy:**
```
┌──────────────────────────────────────────────────────────┐
│  [✕ close — top right]                                   │
│                                                          │
│         [Media — image or video player]                  │
│         max 85vw × 85vh, centered, letter-boxed          │
│                                                          │
│  ┌─────────────────────────────┐                         │
│  │ Category tag                │                         │
│  │ Title (Playfair, 1.5rem)    │                         │
│  │ Description (DM Sans, .9rem)│                         │
│  └─────────────────────────────┘                         │
│                                                          │
│  [ ← prev ]                               [ next → ]    │
└──────────────────────────────────────────────────────────┘
```

**Background:** `rgba(58,42,42,.95)` — the deep charcoal at near-opacity, not pure black. Maintains brand warmth.

**Close button:** top-right, `2rem × 2rem`, `✕` glyph in `#F2E2E2` at `60%` opacity, full on hover. No circle/box around it — just the character.

**Navigation arrows:** Left/right edges, `position: absolute`. DM Sans, `2rem`, `#F2E2E2` at `40%` opacity → full on hover. Use `←` and `→` Unicode or SVG chevrons. Navigate through the **filtered** set (not all items).

**Video in lightbox:** Use a native `<video>` element with `controls`, `autoPlay`, audio unmuted. `width: 100%`, `max-height: 85vh`, `object-fit: contain`. No custom player — native controls are fine.

**Image in lightbox:** Next.js `<Image>` with `fill` inside a sized container, `object-fit: contain`.

**Open/close animation:** Lightbox `<dialog>` or fixed `<div>` scales from `0.96 → 1` and fades in over `0.2s`. Close reverses.

**Keyboard:** `Escape` closes. `ArrowLeft`/`ArrowRight` navigates.

```tsx
// src/components/sections/work/WorkLightbox.tsx
'use client'
import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { PortfolioItem } from '@/types/portfolio'
import { getImageUrl, getVideoUrl } from '@/lib/cloudinary'

type Props = {
  item: PortfolioItem
  items: PortfolioItem[]          // current filtered set for prev/next
  onClose: () => void
  onNavigate: (item: PortfolioItem) => void
}

export function WorkLightbox({ item, items, onClose, onNavigate }: Props) {
  const currentIndex = items.findIndex(i => i.id === item.id)
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < items.length - 1

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft' && hasPrev) onNavigate(items[currentIndex - 1])
    if (e.key === 'ArrowRight' && hasNext) onNavigate(items[currentIndex + 1])
  }, [currentIndex, items, hasPrev, hasNext, onClose, onNavigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      style={{ background: 'rgba(58,42,42,.95)' }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-6 max-w-[90vw] w-full px-4"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'lightboxIn .2s ease forwards' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-bg/60 hover:text-bg text-2xl transition-colors"
          aria-label="Close"
        >✕</button>

        {/* Media */}
        <div className="w-full" style={{ maxHeight: '75vh' }}>
          {item.type === 'image' ? (
            <div className="relative w-full" style={{ maxHeight: '75vh', aspectRatio: item.aspectRatio }}>
              <Image
                src={getImageUrl(item.cloudinaryId, 1600, 1200)}
                alt={item.title}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          ) : (
            <video
              src={getVideoUrl(item.cloudinaryId)}
              controls
              autoPlay
              className="w-full max-h-[75vh] object-contain"
            />
          )}
        </div>

        {/* Caption */}
        <div className="text-center max-w-xl">
          <span className="inline-block bg-accent text-white text-[0.65rem] font-semibold
            tracking-widest uppercase px-2.5 py-1 mb-3">{item.category}</span>
          <h3 className="font-serif font-bold text-bg text-xl mb-2">{item.title}</h3>
          {item.description && (
            <p className="font-sans text-bg/60 text-sm leading-relaxed">{item.description}</p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-6">
          <button
            onClick={() => hasPrev && onNavigate(items[currentIndex - 1])}
            disabled={!hasPrev}
            className="text-bg/40 hover:text-bg text-2xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >←</button>
          <span className="text-bg/30 text-sm font-sans self-center">
            {currentIndex + 1} / {items.length}
          </span>
          <button
            onClick={() => hasNext && onNavigate(items[currentIndex + 1])}
            disabled={!hasNext}
            className="text-bg/40 hover:text-bg text-2xl transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
          >→</button>
        </div>
      </div>

      <style>{`
        @keyframes lightboxIn {
          from { opacity: 0; transform: scale(.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
```

---

### 12.9 Full Section Assembly — `WorkSection.tsx`

```tsx
// src/components/sections/WorkSection.tsx
'use client'
import { useState, useMemo } from 'react'
import { RevealWrapper } from '@/components/ui/RevealWrapper'
import { FilterBar }     from './work/FilterBar'
import { WorkCard }      from './work/WorkCard'
import { WorkLightbox }  from './work/WorkLightbox'
import { portfolioItems } from './work/portfolioData'
import { PortfolioItem, PortfolioCategory } from '@/types/portfolio'

type Filter = 'All' | PortfolioCategory

export function WorkSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)

  const filtered = useMemo(() =>
    activeFilter === 'All'
      ? portfolioItems
      : portfolioItems.filter(i => i.category === activeFilter),
    [activeFilter]
  )

  const featured = filtered.find(i => i.featured) ?? filtered[0]
  const rest = filtered.filter(i => i.id !== featured?.id)

  return (
    <section id="work" className="min-h-screen bg-cardBg flex flex-col justify-center px-[6vw] py-16 gap-10">

      {/* Header */}
      <div className="flex justify-between items-end w-full">
        <RevealWrapper>
          <span className="label">Portfolio</span>
          <h2 className="font-serif font-bold text-text leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3.6rem)' }}>
            Sample <em className="italic text-accent">work</em><br />& showcase.
          </h2>
        </RevealWrapper>
        <RevealWrapper delay={100}>
          <p className="font-sans text-sm text-text/60 max-w-xs text-right leading-relaxed hidden md:block">
            Screenshots, screen recordings &amp; live proof of work.
          </p>
        </RevealWrapper>
      </div>

      {/* Filter bar */}
      <RevealWrapper delay={150}>
        <FilterBar active={activeFilter} onChange={setActiveFilter} />
      </RevealWrapper>

      {/* Grid */}
      <div className="work-grid w-full">
        {featured && (
          <WorkCard
            item={featured}
            className="work-grid__item--feature min-h-[320px]"
            onClick={setLightboxItem}
          />
        )}
        {rest.slice(0, 3).map((item, i) => (
          <WorkCard
            key={item.id}
            item={item}
            className="min-h-[180px]"
            onClick={setLightboxItem}
            style={{ transitionDelay: `${(i + 1) * 60}ms` }}
          />
        ))}
        {rest.slice(3, 4).map(item => (
          <WorkCard
            key={item.id}
            item={item}
            className="work-grid__item--strip"
            onClick={setLightboxItem}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <WorkLightbox
          item={lightboxItem}
          items={filtered}
          onClose={() => setLightboxItem(null)}
          onNavigate={setLightboxItem}
        />
      )}
    </section>
  )
}
```

---

### 12.10 File Structure for This Feature

```
src/
├── types/
│   └── portfolio.ts                  ← PortfolioItem, MediaType, PortfolioCategory
├── lib/
│   └── cloudinary.ts                 ← cld instance + URL helpers
└── components/
    └── sections/
        ├── WorkSection.tsx            ← Section shell, filter state, lightbox state
        └── work/
            ├── portfolioData.ts       ← Static item definitions (swap cloudinaryId values)
            ├── FilterBar.tsx          ← Category pill filters
            ├── WorkCard.tsx           ← Individual grid tile (image or video)
            └── WorkLightbox.tsx       ← Full-screen media viewer
```

---

### 12.11 Checklist for Antigravity

- [ ] `PortfolioItem` type defined in `src/types/portfolio.ts`
- [ ] Cloudinary SDK installed and configured in `src/lib/cloudinary.ts`
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` added to `.env.local`
- [ ] `portfolioData.ts` populated — even with placeholder `cloudinaryId` strings; these get swapped in by Maygift
- [ ] `FilterBar` filters the local `portfolioItems` array — no API call, instant
- [ ] `WorkCard` handles both `image` and `video` types without branching into separate components
- [ ] Video cards: muted autoplay on hover, pause + reset on leave
- [ ] Lightbox opens on any card click, shows full media with sound enabled for video
- [ ] Lightbox keyboard nav: `Escape` closes, `←`/`→` navigates within current filtered set
- [ ] Grid CSS matches the asymmetric spec in 12.5 — do not make it a uniform 3-column grid
- [ ] No new colors, fonts, border-radius, or easing values introduced — all tokens from Section 2 of this document
- [ ] Section background remains `#EDD4D4`
- [ ] `label` + section headline follow the same pattern as every other section

---

### 12.12 What Maygift Needs to Do (Non-Technical)

1. Create a free [Cloudinary](https://cloudinary.com) account
2. Upload screenshots as JPG or PNG, screen recordings as MP4 (H.264)
3. Note the **public ID** of each upload (shown in the Cloudinary Media Library)
4. Open `portfolioData.ts` and paste each public ID into the matching `cloudinaryId` field
5. Set `featured: true` on the item she wants in the large slot
6. Add a `title` and `description` for each item — these appear in the lightbox caption