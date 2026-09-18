# Portfolio site

React/Vite portfolio site for Gord Turner.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

The Vite `base` is configured for `/Portfolio.GT/` and `.github/workflows/deploy.yml` builds the site and publishes `dist` through GitHub Pages.

In GitHub:
1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main`.

GitHub documents that Pages can publish an existing repository using a custom Actions workflow, and project sites use the repository path in their default URL. 
