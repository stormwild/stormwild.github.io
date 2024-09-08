# Notes

## Bootstrap

[Bootstrap · The most popular HTML, CSS, and JS library in the world.](https://getbootstrap.com/)

```bash
pnpm install bootstrap@5.3.3
pnpm add @popperjs/core
pnpm i --save-dev @types/bootstrap
pnpm add -D sass
```

[Styles & CSS | Docs](https://docs.astro.build/en/guides/styling/)

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ['bootstrap'],
    }
  }
})
```

[Bootstrap and Vite · Bootstrap v5.3](https://getbootstrap.com/docs/5.3/getting-started/vite/)

```astro
              <li class={`nav-item ${link.subpages ? 'dropdown' : ''}`}>
                <a
                  class={`nav-link ${link.subpages ? 'dropdown-toggle' : ''} ${pathname.split('/')[-1] == link.href ? 'active' : ''}`}
                  href={link.href}
                  role='button'
                  data-bs-toggle={`${link.subpages ? 'dropdown' : ''}`}
                  aria-expanded='false'
                >
                  {link.text} {link.href} {pathname}{' '}
                  {pathname.split('/').at(-1)}
                  {pathname.includes(link.href) ? 'active' : ''}
                </a>
                {link.subpages ? (
                  <ul class='dropdown-menu' aria-labelledby='navbarDropdown'>
                    {link.subpages.map((subpage) => (
                      <li>
                        <a
                          class={`dropdown-item ${subpage.href == pathname ? 'active' : ''}`}
                          href={subpage.href}
                        >
                          {subpage.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
```

## Astro

### Upgrade

```bash
# Upgrade Astro and official integrations together
pnpm dlx @astrojs/upgrade
```
