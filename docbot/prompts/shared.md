# Docbot Shared Design System

> All docbot output uses this exact design system.

## CSS Variables (always include in `:root`)

```css
:root {
  --ivory:    #FAF9F5;
  --slate:    #141413;
  --clay:     #D97757;
  --clay-d:   #B85C3E;
  --oat:      #E3DACC;
  --olive:    #788C5D;
  --rust:     #B04A3F;
  --gray-150: #F0EEE6;
  --gray-300: #D1CFC5;
  --gray-500: #87867F;
  --gray-700: #3D3D3A;
  --white:    #FFFFFF;

  --serif: ui-serif, Georgia, 'Times New Roman', serif;
  --sans:  system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --mono:  ui-monospace, 'SF Mono', Menlo, Monaco, monospace;
}
```

## Typography Rules

- `body`: `font-family: var(--sans)`, `background: var(--ivory)`, `color: var(--gray-700)`, `line-height: 1.55`, padding `48-56px 24-32px 80-96px`
- `h1`: `font-family: var(--serif)`, `font-weight: 500`, `font-size: 32-38px`, `color: var(--slate)`, `letter-spacing: -0.01em`
- `h2`: `font-family: var(--serif)`, `font-weight: 500`, `font-size: 22px`, `color: var(--slate)`
- Eyebrow labels: `font-size: 12px`, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--gray-500)`
- Panel headings (h3): `font-size: 11px`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: var(--gray-500)`

## Component Patterns

- **Cards/panels**: `background: #fff`, `border: 1.5px solid var(--gray-300)`, `border-radius: 12px`, `padding: 18-24px`
- **Code blocks**: `background: var(--slate)`, `color: #E8E6DE`, `font-family: var(--mono)`, `font-size: 12.5px`, `line-height: 1.65`, `border-radius: 8-12px`, `padding: 14-18px 16-20px`
- **Syntax highlighting classes**: `.kw` (keywords) `color: var(--clay)` or `#C9B98A`, `.str` (strings) `color: var(--olive)` or `#A8BC8C`, `.cm` (comments) `color: var(--gray-500)`, `.fn` (identifiers) `color: #C9B98A`
- **Chips/tags**: `font-family: var(--mono)`, `font-size: 11.5px`, `background: var(--gray-150)`, `border: 1.5px solid var(--gray-300)`, `padding: 5px 10px`, `border-radius: 8px`
- **Prompt box**: `background: var(--gray-150)`, `border: 1.5px solid var(--gray-300)`, `border-radius: 12px`, `padding: 16px 20px`
- **Callout/recommendation**: `border-left: 4px solid var(--clay)`, `background: var(--white)`, `border-radius: 0 12px 12px 0`, `padding: 24px 28px`
- **Warning/gotcha panels**: `border: 1.5px solid var(--clay)`, `background: rgba(217,119,87,0.06)`, heading in `color: var(--clay)`
- **Pro/con indicators**: Green dot `var(--olive)` for pros, clay dot `var(--clay)` for cons, both `6px` circles
- **Numbered badges**: `34px` circles, `border-radius: 50%`, `background: var(--oat)`, `border: 1.5px solid var(--gray-300)`, `font-family: var(--mono)`

## Layout

- `.page` container: `max-width: 1080-1360px`, `margin: 0 auto`
- Use CSS Grid for multi-column layouts with `gap: 28-40px`
- Responsive: collapse to single column below `960-1100px`
- Collapsible code: use `<details class="snippet">` with `<summary>` for expandable source
- Sticky sidebars: `position: sticky`, `top: 24px`, `align-self: start`

## Output Rules

1. **Self-contained**: Every HTML file must work when opened directly in a browser. No external dependencies — all CSS inline in `<style>`.
2. **File location**: Save to `docs/html/` in the current project, using kebab-case filenames derived from the topic.
3. **Quality bar**: The output must look polished and professional.
4. **Responsive**: Must look good on both desktop (1440px) and tablet (768px) widths.
5. **No frameworks**: No React, no Tailwind, no build step. Pure HTML + CSS + vanilla JS only.
6. **Semantic HTML**: Use `<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<details>`, `<nav>` appropriately.
7. **Accessibility**: Include `lang="en"`, `<meta charset="utf-8">`, `<meta name="viewport">`, meaningful `<title>`, `aria-label` on SVGs and interactive elements.
8. **File size**: Keep under 50KB. Use collapsible sections for large documents.
