# Bike Sale App

Static demo site for a small bike storefront.

Open `index.html` in your browser, or serve the folder with a simple HTTP server:

```bash
# from this project folder
python -m http.server 8000
# then open http://localhost:8000
```

Theme selector:

- Use the `Theme` dropdown in the header to switch between `Default`, `Sunset`, `Forest`, and `Night` themes. The selection is saved in your browser.

More themes and swatches:

- Click the `More themes` button in the header to open the theme swatches panel. Hover any swatch to preview the theme, and click to apply and save it.
- Available presets: Default, Sunset, Forest, Night, Ocean, Solar, Lavender, Ember, Mint, Coral.

Photos:

- Product images now use real photos from Unsplash via dynamic URLs (`source.unsplash.com`). If you prefer local images, replace the `img` `src` attributes in `index.html` with your local file paths (for example `images/my-road-bike.jpg`).
- Note: the Unsplash links load external images at runtime; to bundle photos locally download and save them under the `images/` folder and update `index.html` accordingly.


Files created:
- `index.html` — main page
- `styles.css` — styles
- `script.js` — small interactive helpers
