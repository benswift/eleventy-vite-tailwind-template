# Eleventy + Vite + Tailwind Template

> **This is a GitHub template repository.** Click "Use this template" to create
> your own repository based on this starter---you'll get a clean copy without
> the commit history. See
> [Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template)
> for more details.

A modern static site template using Eleventy v3, Vite, and Tailwind CSS v4.

## Features

- **Eleventy v3** for static site generation
- **Vite** for fast development and optimised production builds
- **Tailwind CSS v4** for utility-first styling (no PostCSS required)
- **Vitest** for testing
- **ESLint and Stylelint** for code quality
- **Accessible navigation** with mobile menu and skip links
- **RSS feed** support
- **Markdown** with footnotes, heading anchors, and smart typography

## Quick start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:8080` to see your site.

## Available scripts

| Command               | Description                               |
| --------------------- | ----------------------------------------- |
| `npm run dev`         | Start development server with live reload |
| `npm run build`       | Build for production to `_site/`          |
| `npm test`            | Run linting and tests                     |
| `npm run lint`        | Run ESLint and Stylelint                  |
| `npm run lint:fix`    | Fix linting issues automatically          |
| `npm run check:links` | Check for broken links                    |
| `npm run lighthouse`  | Run Lighthouse audits                     |

## Project structure

```
src/
  _data/           # Global data files (JSON)
  _includes/       # Nunjucks layout templates
  assets/          # CSS and JS source files
  images/          # Static images
  posts/           # Blog posts (create this directory)
  index.md         # Homepage
  about.md         # About page
  contact.md       # Contact page
```

## Customisation

### Site metadata

Edit the `site` object in `eleventy.config.js`:

```js
eleventyConfig.addGlobalData("site", {
  name: "My Site",
  url: "https://example.com",
  repository: "https://github.com/your-username/your-repo",
  description: "Your site description",
});
```

### Colour scheme

Edit the CSS custom properties in `src/assets/main.css`:

```css
@theme {
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  /* ... */
}
```

### Adding pages

Create markdown files in `src/`. Add navigation with frontmatter:

```yaml
---
layout: base.njk
title: My Page
eleventyNavigation:
  key: My Page
  order: 4
---
```

### Adding blog posts

Create a `src/posts/` directory and add markdown files. Posts are automatically
collected and sorted by date.

## Using as a GitHub template

1. Click "Use this template" on GitHub
2. Clone your new repository
3. Run `npm install`
4. Update site metadata in `eleventy.config.js`
5. Replace placeholder content in `src/`
6. Customise the colour scheme in `src/assets/main.css`

## Author

Ben Swift

## Licence

MIT
