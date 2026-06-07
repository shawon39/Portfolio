# Shakhawat Hossain — Portfolio

Personal portfolio site for **Shakhawat Hossain**, Senior Salesforce Engineer.
Static site, no build step. Plain HTML, CSS, and vanilla JavaScript.

**Live:** https://shakhawat-dev.netlify.app

## Structure

```
portfolio/
├── index.html         # markup + content
├── css/styles.css     # all styles (design tokens at the top)
├── js/main.js         # nav, scroll progress, reveal animation, count-up
├── assets/favicon.svg # site icon
├── netlify.toml        # Netlify config (publish root, cache headers)
└── .gitignore
```

## Run locally

It is plain static files, so just open `index.html` — or serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Edit content

- **Text, projects, links:** edit `index.html`.
- **Colours, type, spacing:** edit the `:root` tokens at the top of `css/styles.css`. The accent is `--accent`.
- **Add your headshot:** in `index.html`, find the `class="avatar"` block and replace
  `<div class="avatar-ring">SH</div>` with
  `<img src="assets/your-photo.jpg" alt="Shakhawat Hossain" style="width:100%;height:100%;object-fit:cover">`
  (drop the photo into `assets/`).

## Deploy — GitHub → Netlify (recommended)

One-time setup, then every `git push` auto-deploys.

1. Create an empty repo on GitHub (e.g. `portfolio`).
2. From this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/shawon39/portfolio.git
   git push -u origin main
   ```

3. In Netlify, open the **shakhawat-dev** project → **Project configuration → Build & deploy → Link repository**, choose the GitHub repo. Build command: _none_. Publish directory: `.`
4. Done. Push to `main` and Netlify rebuilds automatically.

## License

Personal project. © Shakhawat Hossain.
