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

Pages serves the committed `docs/` folder directly from `main`.
There is no custom GitHub Actions workflow.

In Settings > Pages, select **Deploy from a branch**, then **main** and **/docs**.
The site is published at https://tonythuonglinh.github.io/.

After editing the source, rebuild before committing and pushing:

```sh
npm run build
git add src.jsx style.css assets docs
git commit -m "Update quiz"
git push origin main
```

Commit `docs/` including its generated assets. Do not commit `node_modules/`.
`npm run preview` serves the built `docs/` version locally.

GitHub Pages publishes the site to the web, including its personal messages.
Quiz answers are checked in the browser and do not provide access protection.

GIFs and photos are bundled from `assets/` by Vite. The Pentakill clip uses a
YouTube embed and includes a direct link if playback is blocked.
