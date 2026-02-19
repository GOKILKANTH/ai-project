# Bike Sale App - 4 Page Website

A modern, clean, and responsive multi-page website for a bike sales business with integrated database management.

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

🎨 **7 Color Themes**
- Blue (Default), Dark, Ocean, Sunset, Forest, Purple, Rose
- Theme preferences saved automatically
- Smooth color transitions

🛒 **Smart Shopping System**
- Add to cart functionality
- Cart counter in header
- Product filtering by category
- Product showcase with descriptions and specs
- Cart persists across browser sessions

💾 **Database Management**
- Local database with 9 bike products
- Customer data storage
- Order tracking system
- All data persists in browser localStorage
- Ready to integrate with backend API or Firebase

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
├── script.js (Application logic)
├── database.js (Products database - 9 bikes)
├── config.js (Database configuration & manager)
├── DATABASE_GUIDE.md (Database documentation)
├── README.md (This file)
└── images/ (Image assets folder)
```

## Getting Started

1. Open `index.html` in your browser
2. Navigate through pages using the top navigation menu
3. Use the Theme selector to change colors (7 options)
4. Add products to cart on any page
5. Fill out the contact form to save your information

## Database Features

### Built-in Data
- **9 Products**: Road bikes, Mountain bikes, Hybrid bikes
- **Product Info**: Name, price, category, specifications, reviews
- **Customer Storage**: Auto-save contact form submissions
- **Cart System**: Persistent shopping cart with quantities

### Database Manager API
```javascript
// Get all products
const products = DatabaseManager.getProducts();

// Add to cart
DatabaseManager.addToCart(product, quantity);

// Get cart statistics
const stats = DatabaseManager.getCartStats();
// Returns: { itemCount, totalItems, totalPrice }

// Save customer
DatabaseManager.addCustomer({
  name: 'John',
  email: 'john@example.com',
  phone: '555-1234'
});

// Create order
const order = DatabaseManager.createOrder(email, cartItems);
```

### Configuration
Edit `config.js` to:
- Change database type (localStorage/API/Firebase)
- Set API endpoint for backend
- Configure Firebase credentials
- Customize app settings

See **DATABASE_GUIDE.md** for detailed documentation.

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

### Add New Products
Edit `database.js` and add to `PRODUCTS_DATABASE` array:
```javascript
{
  id: 'new-bike',
  name: 'New Bike Name',
  category: 'road',
  price: 799,
  image: 'image-url',
  description: 'Bike description',
  specs: { /* specs */ },
  inStock: true
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

## Deploying to Backend

To connect to a real backend database:

1. Update `config.js`:
```javascript
database: {
  type: 'api',
  apiUrl: 'http://your-api.com/api'
}
```

2. Update `DatabaseManager` methods to make HTTP requests
3. Set up backend endpoints for products, orders, customers
4. See DATABASE_GUIDE.md for integration steps

## License

Built with ❤️ by Gokil for demonstration purposes.

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
