# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (also exports static to /out)
npm run start    # Serve production build
```

There is no test suite and no lint script configured.

## Architecture

**Chile 2.0 Coordinadores** is a single-page reference portal for call-center coordinators. It runs entirely client-side — all data is static TypeScript, there is no backend or API.

### Data layer (`src/data/`)

All content lives in typed `.ts` files. To add or update information, edit these files directly:

- `procedimientos.ts` — step-by-step operational procedures (`Procedure[]`)
- `cuentas.ts` — insurance/assistance plans (`Plan[]`, exported as `planes`)
- `pilotos.ts` — internal extensions (`Extension[]`) and client phone contacts (`Contact[]`)
- `links.ts` — links and credentials (`LinkEntry[]`)
- `proveedores.ts` — service providers (`Provider[]`)
- `preguntas.ts` — intake question categories (`CategoriaPreguntas[]`)

All types are defined in `src/types/index.ts`. The `SectionKey` union (`"procedimientos" | "cuentas" | "pilotos" | "links" | "proveedores" | "preguntas"`) is the single discriminant used everywhere to identify which section is active.

### Page & state (`src/app/page.tsx`)

The root page is `"use client"` and holds all modal state. A single `activeModal: SectionKey | null` drives which modal is open. The page also:

- Builds a flat `searchData: SearchResult[]` index over all data sections for the global search
- Converts `Plan` and `CategoriaPreguntas` to `Procedure` shape via local adapter functions (`planToProcedure`, `categoriaToProc`) so they can be rendered by the shared `ProcedureModal`/`StepList`
- Defines `GUIAS` — the three pinned quick-guide cards shown in the main panel

### Modal system (`src/components/modal/`)

- `Modal.tsx` — base modal: backdrop, Escape-to-close, scroll lock, `max-h-[75vh]` scrollable body
- `ProcedureModal.tsx` — generic list+detail modal for any `Procedure[]`; used for procedimientos, cuentas/planes, and quick guides
- Specialized modals (`PilotosModal`, `LinksModal`, `ProveedoresModal`, `TomarDatosModal`) handle sections whose data shape doesn't map cleanly to `Procedure`

### UI components

- `BentoCard` / `BentoGrid` — colored sidebar navigation cards with neumorphism hover/press shadows (inline `style` shadows, not Tailwind)
- `Header` — sticky header with global search (client-side filter over `searchData`) and "Tomar datos" button
- `StepList` — renders `Step[]` with optional sub-steps, notes, warnings, images, and video embeds
- `FlowChart` — renders Mermaid flowcharts embedded in `Procedure.flowchart`

### Styling

Tailwind CSS v4 (PostCSS plugin). Neumorphism effects are applied via inline `style={{ boxShadow: ... }}` with JS-computed shadow strings based on hover/press state — not via Tailwind utilities. Global custom CSS is minimal (`src/app/globals.css`), only defining CSS custom properties and the `border-travel` animation for the "Tomar datos" button.
