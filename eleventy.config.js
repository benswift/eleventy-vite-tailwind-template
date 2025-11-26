import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItFootnote from "markdown-it-footnote";

export default function (eleventyConfig) {
  // Global site data available in all templates as `site`
  eleventyConfig.addGlobalData("site", {
    name: "My Site",
    url: "https://example.com",
    repository: "https://github.com/your-username/your-repo",
    description:
      "A modern static site built with Eleventy, Vite, and Tailwind CSS.",
  });

  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  // Date filters for blog posts
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Filter collection by tag
  eleventyConfig.addFilter("filterByTag", (collection, tag) => {
    return collection.filter(
      (item) => item.data.tags && item.data.tags.includes(tag),
    );
  });

  // String starts with check for navigation highlighting
  eleventyConfig.addFilter("startswith", (str, prefix) => {
    return str && str.startsWith(prefix);
  });

  // Head filter for limiting array items
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, n);
  });

  // Posts collection - all markdown files in src/posts/
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Configure markdown-it with typographer for em dashes and smart quotes
  const md = markdownIt({
    html: true,
    typographer: true,
  })
    .use(markdownItFootnote)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.linkAfterHeader({
        class: "header-anchor",
        symbol: "",
        style: "visually-hidden",
        assistiveText: (title) => `Link to "${title}"`,
        visuallyHiddenClass: "sr-only",
        wrapper: ['<div class="heading-wrapper">', "</div>"],
      }),
      slugify: eleventyConfig.getFilter("slugify"),
    });

  // Customize footnote rendering to use Tailwind classes
  md.renderer.rules.footnote_block_open = () =>
    '<hr class="border-primary-500 my-12">\n' +
    '<section class="footnotes text-sm mt-12">\n' +
    '<ol class="list-decimal pl-6">\n';

  md.renderer.rules.footnote_block_close = () => "</ol>\n" + "</section>\n";

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    viteOptions: {
      base: "/",
      publicDir: false,
      plugins: [
        tailwindcss(),
        checker({
          root: import.meta.dirname,
          eslint: {
            lintCommand: 'eslint "src/**/*.js"',
            useFlatConfig: true,
          },
          stylelint: {
            lintCommand: 'stylelint "src/**/*.css"',
          },
        }),
        {
          name: "copy-feed",
          closeBundle: {
            sequential: true,
            async handler() {
              const fs = await import("node:fs/promises");
              const path = await import("node:path");
              const baseDir = import.meta.dirname;
              const filesToCopy = ["feed.xml", "robots.txt"];
              for (const file of filesToCopy) {
                const src = path.join(baseDir, ".11ty-vite", file);
                const dest = path.join(baseDir, "_site", file);
                try {
                  await fs.copyFile(src, dest);
                } catch {
                  // file may not exist yet
                }
              }
            },
          },
        },
      ],
      build: {
        rollupOptions: {
          input: {
            main: "src/assets/main.js",
          },
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === "favicon.svg") {
                return "favicon.svg";
              }
              return "assets/[name]-[hash][extname]";
            },
          },
        },
      },
    },
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    pathPrefix: "/",
  };
}
