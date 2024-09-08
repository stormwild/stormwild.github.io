# Adding Analog Angular Integration

[@analogjs/astro-angular](https://analogjs.org/docs/packages/astro-angular/overview)

```bash
$ pnpm astro add @analogjs/astro-angular

> stormwild.github.io@0.0.1 astro C:\Users\Alexander\source\repos\Github\Repos\stormwild.github.io
> astro "add" "@analogjs/astro-angular"

✔ Resolving packages...

  Astro will run the following command:
  If you skip this step, you can always run it yourself later

 ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮     
 │ pnpm add @analogjs/astro-angular@^1.7.3 rxjs@^7.8.1 tslib@^2.7.0 zone.js@^0.15.0 @angular/core@^18.2.3 @angular/common@^18.2.3 @angular/compiler@^18.2.3         │     
 │ @angular/animations@^18.2.3 @angular/compiler-cli@^18.2.3 @angular/platform-server@^18.2.3 @angular/language-service@^18.2.3 @angular/platform-browser@^18.2.3   │     
 │ @angular-devkit/build-angular@^18.2.3 @angular/platform-browser-dynamic@^18.2.3                                                                                  │     
 ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯     

√ Continue? ... yes
✔ Installing dependencies...

  Astro will make the following changes to your config file:

 ╭ astro.config.mjs ───────────────────────────────────────╮
 │ import { defineConfig } from 'astro/config'             │
 │                                                         │
 │ import sitemap from '@astrojs/sitemap'                  │
 │                                                         │
 │ import analogjsangular from '@analogjs/astro-angular';  │
 │                                                         │
 │ // https://astro.build/config                           │
 │ export default defineConfig({                           │
 │   site: 'https://stormwild.github.io',                  │
 │   image: {                                              │
 │     domains: [],                                        │
 │   },                                                    │
 │   vite: {                                               │
 │     ssr: {                                              │
 │       noExternal: ['bootstrap'],                        │
 │     },                                                  │
 │   },                                                    │
 │   integrations: [sitemap(), analogjsangular()],         │
 │ })                                                      │
 ╰─────────────────────────────────────────────────────────╯

√ Continue? ... yes

   success  Added the following integration to your project:
  - @analogjs/astro-angular

C:\Users\Alexander\source\repos\Github\Repos\stormwild.github.io>github.io\node_modules\.pnpm\node_modules;C:\Users\Alexander\source\repos\Github\Repos\stormwild.github.io\node_modules\.pnpm\astro@4.15.2_rollup@4.21.2_typescript@5.5.4\node_modules\astro\node_modules;C:\Users\Alexander\source\repos\Github\Repos\stormwild.github.io\node_modules\.pnpm\astro@4.15.2_rollup@4.21.2_typescript@5.5.4\node_modules;C:\Users\Alexander\source\repos\Github\Repos\stormwild.github.io\node_modules\.pnpm\node_modules"     
The system cannot find the path specified.
✔ Resolving packages...

  Astro will run the following command:
  If you skip this step, you can always run it yourself later

 ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ pnpm add @analogjs/astro-angular@^1.7.3 rxjs@^7.8.1 tslib@^2.7.0 zone.js@^0.15.0 @angular/core@^18.2.3 @angular/common@^18.2.3 @angular/compiler@^18.2.3         │
 │ @angular/animations@^18.2.3 @angular/compiler-cli@^18.2.3 @angular/platform-server@^18.2.3 @angular/language-service@^18.2.3 @angular/platform-browser@^18.2.3   │
 │ @angular-devkit/build-angular@^18.2.3 @angular/platform-browser-dynamic@^18.2.3                                                                                  │
 ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯

√ Continue? ... yes
✔ Installing dependencies...
  
   success  Configuration up-to-date.
warning: in the working copy of 'astro.config.mjs', LF will be replaced by CRLF the next time Git touches it
```

```json
{
  
}
``` 
