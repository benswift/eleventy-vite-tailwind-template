# Eleventy + Vite + Tailwind Template

A modern static site template using Eleventy, Vite, and Tailwind CSS.

## Architecture

Eleventy 3.x static site using the official `@11ty/eleventy-plugin-vite`
integration. All configuration is consolidated in `eleventy.config.js`---there
is no separate `vite.config.js`.

### Tech stack

- Eleventy 3.x (static site generator)
- Vite 7.x (build tool and dev server)
- `@11ty/eleventy-plugin-vite` (official integration)
- Tailwind CSS v4.x (`@tailwindcss/vite` plugin)
- Vitest (unit/integration testing)
- ESLint + Stylelint (linting via `vite-plugin-checker`)

### Critical architectural constraints

- Vite configuration goes in `eleventy.config.js` via `viteOptions` parameter
- Do not create a separate `vite.config.js`
- Tailwind CSS v4 uses `@import "tailwindcss"` in CSS, not `@tailwind`
  directives
- The `@tailwindcss/vite` plugin handles Tailwind (no PostCSS needed)
- Non-HTML files (feed.xml, robots.txt) are lost during Vite build because
  `eleventy-plugin-vite` only processes HTML through rollup. A custom Vite
  plugin in `eleventy.config.js` copies these files from `.11ty-vite/` to
  `_site/` after the build. Add new non-HTML output files to the `filesToCopy`
  array in that plugin.

## Project structure

```
src/
  _data/           # Global data files (JSON)
  _includes/       # Nunjucks templates and partials
  assets/
    main.css       # Entry point with @import "tailwindcss"
    main.js        # JavaScript entry point
  posts/           # Blog posts (markdown with frontmatter)
  posts.md         # Posts listing page
  feed.njk         # Atom feed template (outputs feed.xml)
  robots.txt       # Robots file (passthrough copy)
  index.md         # Homepage
  about.md         # About page
  contact.md       # Contact page

_site/             # Build output (generated, not in git)

test/
  integration.test.js   # Vitest tests for build output

eleventy.config.js      # All configuration (Eleventy + Vite + Tailwind)
vitest.config.js        # Vitest configuration
package.json            # Dependencies and scripts
```

## Development

- `npm run dev` - dev server at http://localhost:8080 with HMR
- `npm run build` - production build to `_site/`
- `npm test` - lint, build, then run Vitest tests
- `npm run lint` - run ESLint and Stylelint

## Build process

Vite processes CSS and JS (with content hashing), Eleventy transforms markdown
to HTML using Nunjucks layouts and injects hashed asset references. Output goes
to `_site/`.

## Testing

Tests verify build output structure, CSS/JS bundles with content hashing,
Tailwind utilities, HTML validity, and accessibility features. Tests expect
`_site/` to exist---run `npm run build` first.

## Customisation

1. Update site metadata in `eleventy.config.js` (`site` global data)
2. Modify colour scheme in `src/assets/main.css` (CSS custom properties)
3. Edit layouts in `src/_includes/`
4. Add pages as markdown files in `src/`
