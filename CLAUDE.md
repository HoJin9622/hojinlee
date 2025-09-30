# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal tech blog built with Astro v5, using TypeScript, Tailwind CSS, and React components. The blog content is written in Markdown and stored in the `src/content/blog/` directory.

## Package Manager

This project uses **pnpm** (v10.17.1). Always use `pnpm` for package management, not npm or yarn.

## Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm start            # Alias for dev

# Build & Preview
pnpm build            # Type check, build, and optimize with jampack
pnpm preview          # Preview production build

# Linting & Formatting
pnpm lint             # Run ESLint
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting without modifying

# Astro
pnpm sync             # Sync Astro content collections
pnpm astro            # Run Astro CLI directly

# Git Commits
pnpm cz               # Use commitizen for conventional commits
```

## Architecture

### Content Management
- **Blog posts**: Stored as Markdown files in `src/content/blog/`
- **Content schema**: Defined in `src/content/config.ts` using Zod
- **Frontmatter fields**:
  - `pubDatetime`: Publication date (required, Date or ISO string format)
  - `title`: Post title (required)
  - `description`: Post description (required)
  - `tags`: Array of tag strings (default: `["others"]`)
  - `author`: Author name (default from `SITE.author`)
  - `featured`: Boolean for featured posts (optional)
  - `draft`: Boolean for draft posts (optional)
  - `modDatetime`: Last modified date (optional)
  - `ogImage`: Open Graph image (optional)
  - `canonicalURL`: Canonical URL (optional)

### Site Configuration
- **Main config**: `src/config.ts` - Contains `SITE`, `LOCALE`, and `SOCIALS` configuration
- **Astro config**: `astro.config.ts` - Integrations, markdown plugins, and Vite settings

### Directory Structure
```
src/
├── components/       # Astro components (Header, Footer, etc.)
├── layouts/          # Page layouts (Layout, PostDetails, etc.)
├── pages/            # Astro pages with file-based routing
│   ├── posts/        # Blog post pages
│   └── tags/         # Tag pages
├── content/
│   └── blog/         # Markdown blog posts
├── utils/            # Utility functions
├── styles/           # Global styles
└── assets/           # Static assets
```

### Markdown Processing
- **Plugins**: remark-toc (table of contents), remark-collapse (collapsible sections)
- **Syntax highlighting**: Shiki with "one-dark-pro" theme
- **TOC**: Auto-generated for headings with "Table of contents" collapse

### Integrations
- **Tailwind CSS**: Styling (base styles disabled in config)
- **React**: For interactive components
- **Sitemap**: Auto-generated
- **Jampack**: Production optimization during build

## Git Workflow

- Pre-commit hooks configured with husky and lint-staged
- All staged files are auto-formatted with Prettier before commit
- Use `pnpm cz` for conventional commit messages

## Notes

- Locale is set to Korean (`ko-KR`)
- OG image size validation is temporarily disabled (see comment in `src/content/config.ts:16-19`)
- Website URL: https://www.hojinlee.dev/
