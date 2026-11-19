# Mounting the panel

Mount `<StyleSandbox />` once, at the root of the app, next to the router outlet, so it stays open while the user clicks between pages. It renders nothing unless the URL contains `?style-sandbox` and the host is in `config.hosts` (local dev and Lovable previews by default), so it never appears on the published site.

## React Router (v6+)

```tsx
import { StyleSandbox } from "@/style-sandbox/StyleSandbox";

<BrowserRouter>
  <Routes>{/* existing routes */}</Routes>
  <StyleSandbox />
</BrowserRouter>
```

## TanStack Router or TanStack Start (newer Lovable projects)

In `src/routes/__root.tsx`, render it next to `<Outlet />`:

```tsx
import { StyleSandbox } from "@/style-sandbox/StyleSandbox";
// inside the root component:
<>
  <Outlet />
  <StyleSandbox />
</>
```

## Next.js App Router

In `app/layout.tsx`, render it inside `<body>`. `StyleSandbox.tsx` already starts with `"use client";`, so the layout can stay a server component.

```tsx
import { StyleSandbox } from "@/style-sandbox/StyleSandbox";
<body>{children}<StyleSandbox /></body>
```

## Next.js Pages Router

In `pages/_app.tsx`: `<><Component {...pageProps} /><StyleSandbox /></>`.

## Server rendering

The panel reads `window` only inside effects, so it is safe with server rendering. It renders nothing on the server.

## Not React

The template is React. For other frameworks, tell the user Style Sandbox v1 supports React apps, and stop.

## Tailwind v4

Variables may live under `@theme` in CSS instead of `:root`. Add new variables there, or in `:root` if the project already mixes both. Tailwind v4's `--spacing` makes Density work.
