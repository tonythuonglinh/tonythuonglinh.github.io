# A little Zeus quiz

A personal React quiz, built with Vite. Nine questions lead to a surprise.

## Run locally

Use Node.js 24 and npm.

```sh
npm ci
npm run dev
```

To check the production version:

```sh
npm run build
npm run preview
```

## Publish on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch. Include
   `assets/`, `package-lock.json`, and `.github/workflows/deploy.yml`; exclude
   `node_modules/` and `dist/` (already covered by `.gitignore`).
2. In the repository, open **Settings → Pages**. Under **Build and deployment**,
   set **Source** to **GitHub Actions**.
3. Open **Actions → Deploy to GitHub Pages → Run workflow**, or push a change to
   `main`. The workflow builds and publishes `dist/` automatically.
4. Find the published URL in **Settings → Pages** or the deployment run.

The default URL is `https://USERNAME.github.io/REPOSITORY/`. Relative asset paths
also support a `USERNAME.github.io` repository or a custom domain without changing
the Vite configuration. No backend or environment secrets are required.

GitHub Pages publishes the site to the web, including its personal messages. Quiz
answers are checked in the browser and do not provide access protection.

GIFs and photos are bundled from `assets/` by Vite. The Pentakill clip uses a YouTube embed
and includes a link to watch it directly if playback is blocked.
