# pnpm Commands Reference

This project uses **pnpm** as the package manager. Here are the correct commands for common tasks.

## 📦 Package Management

### Install Dependencies

```bash
pnpm install
```

### Add New Dependencies

```bash
# Production dependency
pnpm add <package-name>

# Development dependency
pnpm add -D <package-name>
```

### Update Dependencies

```bash
# Update all dependencies
pnpm update

# Update specific package to latest
pnpm upgrade <package-name> --latest

# Update Astro specifically
pnpm upgrade astro --latest
```

### Remove Dependencies

```bash
pnpm remove <package-name>
```

## 🔧 Development Commands

### Start Development Server

```bash
pnpm dev
# or
pnpm start
```

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Run Tests

```bash
pnpm test
```

## 🌐 Browser Compatibility

### Update Browser list Database

```bash
pnpm dlx update-browserslist-db
```

**Note**: Use `pnpm dlx` instead of `npx` when using pnpm. This downloads and executes packages without permanently installing them.

### Why Update Browser list?

- Keeps CSS autoprefixing current
- Ensures JavaScript transpilation targets correct browsers
- Prevents "browsers data is X months old" warnings

## 📋 pnpm vs npm Command Equivalents

| Task | npm | pnpm |
|------|-----|------|
| Install | `npm install` | `pnpm install` |
| Add package | `npm install <pkg>` | `pnpm add <pkg>` |
| Remove package | `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| Update packages | `npm update` | `pnpm update` |
| Run script | `npm run <script>` | `pnpm <script>` |
| Execute package | `npx <command>` | `pnpm dlx <command>` |

## 🚀 Astro-Specific Commands

### Check for Issues

```bash
pnpm astro check
```

### Add Astro Integration

```bash
pnpm astro add <integration>
```

### Generate Types

```bash
pnpm astro sync
```

## 🔍 Troubleshooting

### Clear pnpm Cache

```bash
pnpm store prune
```

### Reinstall Dependencies

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Check pnpm Version

```bash
pnpm --version
```

## 📝 Notes

- This project is configured to use `pnpm@9.11.0+` (see `package.json` → `packageManager`)
- pnpm uses a different approach to dependency management that saves disk space and improves install speed
- Always use `pnpm dlx` instead of `npx` for one-time package executions
