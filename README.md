# Bike Sale App - 4 Page Website

A modern, clean, and responsive multi-page website for a bike sales business.

## Pages

1. **Home** (`index.html`) - Landing page with hero section, features, and featured products
2. **Products** (`products.html`) - Full product catalog with filtering by bike type
3. **About** (`about.html`) - Company story, mission, team members, and statistics
4. **Contact** (`contact.html`) - Contact information and contact form

## Features

✨ **Modern Clean Design**
- Responsive layout that works on all devices
- Beautiful gradient hero sections
- Clean typography with consistent spacing
- Professional color scheme

🛒 **Shopping Features**
- Add to cart functionality
- Cart counter in header
- Product filtering by category
- Product showcase with descriptions

📱 **Mobile Responsive**
- Optimized for mobile, tablet, and desktop
- Mobile-friendly navigation menu
- Touch-friendly buttons and forms

⚡ **Performance**
- Lightweight CSS and JavaScript
- Smooth animations and transitions
- Fast loading times
- Optimized images from Unsplash

## File Structure

```
ai project/
├── index.html (Home page)
├── products.html (Products page)
├── about.html (About page)
├── contact.html (Contact page)
├── styles.css (Main stylesheet)
├── script.js (JavaScript functionality)
├── README.md (This file)
└── images/ (Image assets folder)
```

## Getting Started

1. Open `index.html` in your browser
2. Navigate through pages using the top navigation menu
3. Use the mobile menu (☰) on smaller screens
4. Add products to cart on any page
5. Fill out the contact form to send a message

## Customization

### Colors
Edit the CSS variables in `styles.css` to change the color scheme:
```css
:root {
  --primary: #2563eb;
  --danger: #ef4444;
  --success: #10b981;
  /* ... more variables */
}
```

### Content
Update the HTML files to add your own:
- Product information
- Team member details
- Contact information
- Company description

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Built with ❤️ for demonstration purposes.

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
