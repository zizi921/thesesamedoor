# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

"The Sesame Door" (胡子师傅 Master Mustache) — a brochure/portfolio website for a custom cake bakery in Suzhou, China. Built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 3.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint via next lint

No test framework is configured.

## Architecture

Single-page app using client-side tab navigation (useState), not Next.js routing. The entire UI lives in `src/app/page.tsx` as one `"use client"` component with tabs: Home, Menu, Shop, Work.

Layout: responsive two-panel — 3/4 content + 1/4 sidebar (stacks vertically on mobile).

The Shop tab has an order inquiry form that POSTs to `/api/contact` (`src/app/api/contact/route.ts`), which sends email via the Resend SDK. Requires `RESEND_API_KEY` in `.env.local`.

## Brand Design System (Tailwind)

Colors: `brand-yellow` (#F9E27C), `brand-orange` (#F26F54), `brand-pink` (#F4A5AE), `brand-blue` (#8BB3D2), `brand-green` (#A3C691), `brand-dark` (#3A3837), `brand-light` (#FDF9F1).

Font: Comic Sans MS / Chalkboard SE / Comic Neue (set as default sans).

Custom utility classes in `globals.css`: `.wavy-border`, `.playful-shadow`, `.hover-playful-shadow`, `.fade-in`.

## Notes

- `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, and `dist/` are leftover from a Vite template migration and are unused.
- `tailwind.config.js` content array includes `./index.html` (Vite artifact); only `./src/**/*.{js,ts,jsx,tsx}` is relevant.
- Menu and Work tabs are placeholder content.
