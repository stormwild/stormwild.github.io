# Dark Theme & Theme Switcher — V1 Editorial Light
## PRD / BDD Specification

**Worktree:** `swg-v1-light` (branch: `v1-editorial-light`)
**Date:** 2026-03-27
**Status:** Draft — for review

---

## Overview

The V1 Editorial Light design currently hardcodes a white/light theme across all components. This spec covers adding a complementary dark theme and a persistent theme switcher toggle, so users can choose between light and dark modes. The dark theme should preserve the editorial aesthetic: monospace accents, teal highlights, clean typography — just on a dark canvas.

---

## Goals

- Add a dark variant of the V1 Editorial theme (dark backgrounds, light text, teal accents preserved)
- Provide a toggle in the site header to switch between light and dark
- Persist the user's preference via `localStorage`
- Respect the OS-level `prefers-color-scheme` as the default before any explicit choice
- Achieve this with minimal refactor — use Tailwind's `class` dark mode strategy to avoid rewriting all components from scratch

---

## Non-Goals

- Auto-switching based purely on time of day
- Per-page overrides
- Additional themes beyond light and dark

---

## Design Tokens

### Light Theme (current)

| Token | Value |
|-------|-------|
| Background | `bg-white` |
| Surface (cards) | `bg-white`, `border-gray-100` |
| Body text | `text-gray-900` |
| Secondary text | `text-gray-500` |
| Muted text | `text-gray-400` |
| Borders | `border-gray-100`, `border-gray-200` |
| Accent | `teal-600` / `teal-700` |
| Header bg | `bg-white/95` |
| Code bg | `bg-gray-100` |

### Dark Theme (proposed)

| Token | Light value | Dark value |
|-------|-------------|------------|
| Background | `bg-white` | `dark:bg-gray-950` |
| Surface (cards) | `bg-white` | `dark:bg-gray-900` |
| Card border | `border-gray-100` | `dark:border-gray-800` |
| Body text | `text-gray-900` | `dark:text-gray-100` |
| Secondary text | `text-gray-500` | `dark:text-gray-400` |
| Muted text | `text-gray-400` | `dark:text-gray-500` |
| Border | `border-gray-200` | `dark:border-gray-700` |
| Accent | `teal-600` | `dark:teal-400` (slightly lighter for contrast) |
| Header bg | `bg-white/95` | `dark:bg-gray-950/95` |
| Code bg | `bg-gray-100` | `dark:bg-gray-800` |
| Shadow | `shadow-sm` | `dark:shadow-none` (shadows disappear on dark) |

---

## Implementation Plan

### Step 1 — Enable Tailwind dark mode class strategy

**File:** `tailwind.config.mjs`

```js
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',   // <-- add this
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Why `class` over `media`:** The `class` strategy toggles the `dark` class on `<html>`, giving us runtime control. The `media` strategy is CSS-only and cannot be overridden by user preference stored in `localStorage`.

---

### Step 2 — Add `dark:` variants to all components

Components that need dark variants added:

| Component | Key changes |
|-----------|-------------|
| `v1-light-layout.astro` | `dark:bg-gray-950 dark:text-gray-100` on `<body>` |
| `header.astro` | `dark:bg-gray-950/95 dark:border-gray-800`, nav link colors |
| `footer.astro` | `dark:bg-gray-950 dark:border-gray-800 dark:text-gray-400` |
| `hero.astro` | `dark:text-gray-100`, stat numbers, photo border |
| `card.astro` | `dark:bg-gray-900 dark:border-gray-800 dark:text-gray-100` |
| `featured.astro` | Overlay gradient, sub-card dark surfaces |
| `skills.astro` | `dark:bg-gray-900`, progress bars, skill card borders |
| `tags.astro` | `dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300` |
| `navigate.astro` | `dark:border-gray-800 dark:text-gray-400` |
| `paginate.astro` | `dark:border-gray-700`, active state |
| `alert.astro` | Dark variants for all 5 alert types |
| `not-found.astro` | `dark:bg-gray-950 dark:text-gray-100` |
| `v1-light-post-layout.astro` | Prose dark styles (`.prose-v1light` global CSS) |
| `project-link.astro` | `dark:hover:bg-gray-800 dark:text-gray-300` |
| `search.astro` | `dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100` |

---

### Step 3 — Create `ThemeSwitcher` component

**File:** `src/components/astro/v1light/theme-switcher.astro`

The switcher is a small button in the header — sun/moon icon toggle. Behaviour:

1. On page load: read `localStorage.getItem('theme')`. If set, apply it. If not, fall back to `prefers-color-scheme`.
2. On button click: toggle `dark` class on `<html>`, write new value to `localStorage`.
3. Icon shows sun (currently dark → click to go light) or moon (currently light → click to go dark).

The init script must run **before** first paint (inline `<script>` in `<head>`) to prevent flash of wrong theme (FOWT).

```html
<!-- In <head>, before any styles -->
<script is:inline>
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (stored === 'dark' || (!stored && prefersDark)) {
    document.documentElement.classList.add('dark')
  }
</script>
```

---

### Step 4 — Add switcher to header

**File:** `header.astro` — add `<ThemeSwitcher />` next to the search component in the nav bar, between Search and the mobile menu button.

---

## BDD Feature Specification

```gherkin
Feature: Dark Theme & Theme Switcher
  As a visitor to the V1 Editorial Light site
  I want to switch between light and dark themes
  So that I can read comfortably in my preferred environment

  Background:
    Given the user visits the site

  # ─── DEFAULT BEHAVIOUR ───────────────────────────────────────────

  Scenario: Site respects OS dark mode preference by default
    Given the user has not previously set a theme preference
    And the user's OS is set to dark mode
    When any page loads
    Then the dark theme is applied
    And the theme toggle shows a "switch to light" indicator (sun icon)

  Scenario: Site respects OS light mode preference by default
    Given the user has not previously set a theme preference
    And the user's OS is set to light mode
    When any page loads
    Then the light theme is applied
    And the theme toggle shows a "switch to dark" indicator (moon icon)

  # ─── THEME SWITCHING ─────────────────────────────────────────────

  Scenario: User switches from light to dark
    Given the light theme is currently active
    When the user clicks the theme toggle button
    Then the dark theme is applied immediately
    And the page background becomes dark (bg-gray-950)
    And the text becomes light (text-gray-100)
    And teal accents remain visible
    And the toggle icon changes to the sun icon

  Scenario: User switches from dark to light
    Given the dark theme is currently active
    When the user clicks the theme toggle button
    Then the light theme is applied immediately
    And the page background becomes white
    And the text becomes dark (text-gray-900)
    And the toggle icon changes to the moon icon

  # ─── PERSISTENCE ─────────────────────────────────────────────────

  Scenario: Theme preference is persisted across page navigation
    Given the user has switched to dark theme
    When the user navigates to another page
    Then the dark theme is still active

  Scenario: Theme preference is persisted after browser close/reopen
    Given the user has switched to dark theme
    When the user closes and reopens the browser
    Then the dark theme is still active

  Scenario: Explicit preference overrides OS preference
    Given the user's OS is set to light mode
    And the user has explicitly chosen dark theme
    When the page loads
    Then the dark theme is applied (explicit preference wins)

  # ─── NO FLASH ────────────────────────────────────────────────────

  Scenario: No flash of wrong theme on page load
    Given the user has previously set a theme preference
    When any page loads
    Then the correct theme is applied before first paint
    And there is no visible flash of the opposite theme

  # ─── COMPONENT COVERAGE ──────────────────────────────────────────

  Scenario: All page components render correctly in dark mode
    Given the dark theme is active
    When the user visits each of the following pages:
      | Page                  |
      | Home (/)              |
      | Blog (/blog)          |
      | Blog post page        |
      | Blog pagination page  |
      | Tags index (/blog/tags) |
      | Tag posts page        |
      | Profile (/profile)    |
      | 404 page              |
    Then all text is legible (sufficient contrast)
    And all borders and card outlines are visible
    And all teal accents remain distinguishable
    And no component shows white text on white background
    And no component shows dark text on dark background

  Scenario: Code blocks are readable in dark mode
    Given the dark theme is active
    When the user views a blog post with code blocks
    Then code blocks have a dark surface (bg-gray-800)
    And syntax highlighting colours remain visible
    And inline code is distinguishable from body text

  Scenario: Alert components render in dark mode
    Given the dark theme is active
    When the user views a page containing alert components
    Then info, success, warning, danger, and default alerts
    All have appropriate dark-mode colour variants
    And remain distinguishable from one another

  # ─── ACCESSIBILITY ───────────────────────────────────────────────

  Scenario: Theme toggle is keyboard accessible
    When the user focuses the theme toggle with the keyboard
    Then it receives a visible focus ring
    And pressing Enter or Space activates the toggle

  Scenario: Theme toggle has accessible label
    When a screen reader user encounters the theme toggle
    Then it announces "Switch to dark mode" or "Switch to light mode"
    Based on the current theme state
```

---

## Acceptance Criteria Summary

| # | Criterion |
|---|-----------|
| AC-1 | `tailwind.config.mjs` has `darkMode: 'class'` |
| AC-2 | `<html>` element receives `class="dark"` when dark mode is active |
| AC-3 | All 16 components have `dark:` Tailwind variants for bg, text, and border |
| AC-4 | Theme toggle button exists in the header on all pages |
| AC-5 | Clicking the toggle switches theme instantly (no page reload) |
| AC-6 | Preference is written to `localStorage` key `'theme'` |
| AC-7 | Init script in `<head>` applies theme before first paint (no FOWT) |
| AC-8 | OS `prefers-color-scheme` is used as default when no `localStorage` value exists |
| AC-9 | Toggle button has ARIA label that reflects current state |
| AC-10 | All pages pass WCAG AA contrast ratio (4.5:1 for body text) in both themes |

---

## Files to Create / Modify

| Action | File |
|--------|------|
| Modify | `tailwind.config.mjs` — add `darkMode: 'class'` |
| Modify | `src/layouts/v1-light-layout.astro` — add FOWT script to `<head>`, import `ThemeSwitcher` |
| **Create** | `src/components/astro/v1light/theme-switcher.astro` |
| Modify | `src/components/astro/v1light/header.astro` — add `<ThemeSwitcher />` |
| Modify | All 14 remaining v1light components — add `dark:` variants |
| Modify | `src/layouts/v1-light-post-layout.astro` — add dark prose styles |

---

## Open Questions

1. **Toggle icon set** — use inline SVG sun/moon icons, or pull from a small icon library? (Recommendation: inline SVG to keep zero dependencies)
2. **System preference live-update** — should the theme auto-switch if the user changes their OS setting mid-session while no explicit choice is stored? (Recommendation: yes, via `matchMedia` listener)
3. **Animation** — should the theme transition be instant or use a short CSS transition (`transition-colors duration-200`)? (Recommendation: `duration-200` on `body` for polish)
