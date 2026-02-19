# Database Management System - Bike Sale App

## Overview

The Bike Sale App now includes a comprehensive database management system with three main components:

1. **database.js** - Product database with 9 different bike models
2. **config.js** - Database configuration and manager
3. **script.js** - Application logic using the database manager

## File Structure

```
ai project/
├── database.js       (Products database)
├── config.js         (Configuration & DatabaseManager)
├── script.js         (Application logic)
├── index.html
├── products.html
├── about.html
├── contact.html
├── styles.css
└── README.md
```

## Configuration

### Database Types

The system supports three database types via `CONFIG.database.type`:

1. **localStorage** (Current - Default)
   - Client-side storage in browser
   - Perfect for demos and offline functionality
   - Data persists across browser sessions

2. **API** - Backend REST API
   - Configure `apiUrl` in CONFIG
   - Example: `http://localhost:3000/api`

3. **Firebase** - Google Cloud Firebase
   - Configure Firebase credentials in CONFIG
   - Real-time database capabilities

### Current Configuration

```javascript
// config.js
const CONFIG = {
  database: {
    type: 'localStorage',  // Change to 'firebase' or 'api'
    apiUrl: 'http://localhost:3000/api'
  },
  
  storage: {
    cartKey: 'bike_sale_cart',
    ordersKey: 'bike_sale_orders',
    customersKey: 'bike_sale_customers',
    themeKey: 'bike_sale_theme'
  },
  
  app: {
    name: 'Bike Sale',
    owner: 'Gokil',
    currency: '$'
  }
};
```

## Database Manager API

### Products

```javascript
// Get all products
const products = DatabaseManager.getProducts();

// Get product by ID
const product = DatabaseManager.getProductById('roadster-200');

// Save/Update products
DatabaseManager.saveProducts(productsArray);
```

### Cart Management

```javascript
// Get current cart
const cart = DatabaseManager.getCart();

// Add product to cart
DatabaseManager.addToCart(product, quantity);

// Remove from cart
DatabaseManager.removeFromCart(productId);

// Update quantity
DatabaseManager.updateCartQuantity(productId, newQuantity);

// Clear entire cart
DatabaseManager.clearCart();

// Get cart statistics
const stats = DatabaseManager.getCartStats();
// Returns: { itemCount, totalItems, totalPrice }
```

### Orders

```javascript
// Create new order
const order = DatabaseManager.createOrder(customerEmail, cartItems);

// Get all orders
const allOrders = DatabaseManager.getOrders();

// Get orders by customer email
const customerOrders = DatabaseManager.getOrdersByEmail('customer@email.com');
```

### Customers

```javascript
// Add new customer
const customer = DatabaseManager.addCustomer({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '555-1234'
});

// Get all customers
const customers = DatabaseManager.getCustomers();
```

## Products Database

9 products are available in `database.js`:

| ID | Name | Category | Price | Stock |
|---|---|---|---|---|
| roadster-200 | Roadster 200 | road | $699 | ✓ |
| summit-mtn | Summit Mountain | mountain | $849 | ✓ |
| city-hybrid | City Hybrid | hybrid | $529 | ✓ |
| pro-racer-x | Pro Racer X | road | $1299 | ✓ |
| trail-explorer | Trail Explorer | mountain | $999 | ✓ |
| urban-classic | Urban Classic | hybrid | $649 | ✓ |
| speedster-elite | Speedster Elite | road | $1499 | ✓ |
| beast-terrain | Beast Terrain | mountain | $1199 | ✓ |
| comfort-cruiser | Comfort Cruiser | hybrid | $579 | ✓ |

## Data Flow

### Adding to Cart
```
User clicks "Add to Cart" 
    ↓
script.js calls DatabaseManager.addToCart(product)
    ↓
DatabaseManager saves to localStorage
    ↓
Cart count updates in header
```

### Contact Form Submission
```
User submits contact form
    ↓
script.js calls DatabaseManager.addCustomer(contactData)
    ↓
Customer data stored in database
    ↓
Success message displayed
```

### Order Creation (when ready)
```
User checks out
    ↓
script.js calls DatabaseManager.createOrder(email, cartItems)
    ↓
Order created with ID, timestamp, and items
    ↓
Cart cleared
```

## Storage Keys (localStorage)

- `bike_sale_cart` - Shopping cart items
- `bike_sale_orders` - Order history
- `bike_sale_customers` - Customer contacts
- `bike_sale_products` - Product database
- `bike_sale_theme` - Selected theme
- `bike_sale_theme` - Selected theme

## Integrating with Backend

### To switch to API (Node.js/Express):

1. Update `config.js`:
```javascript
const CONFIG = {
  database: {
    type: 'api',
    apiUrl: 'http://localhost:3000/api'
  }
};
```

2. Update DatabaseManager to make HTTP requests:
```javascript
// Example: Get cart from API
async getCart() {
  const response = await fetch(`${CONFIG.database.apiUrl}/cart`);
  return await response.json();
}
```

3. Backend API endpoints needed:
   - `GET /api/products` - Get all products
   - `GET /api/products/:id` - Get specific product
   - `POST /api/cart` - Add to cart
   - `GET /api/cart` - Get cart
   - `POST /api/orders` - Create order
   - `POST /api/customers` - Save customer

### To switch to Firebase:

1. Install Firebase SDK
2. Configure Firebase credentials in `config.js`
3. Update DatabaseManager to use Firebase methods:
```javascript
// Example: Firestore usage
async getProducts() {
  const snapshot = await firebase.firestore()
    .collection('products')
    .get();
  return snapshot.docs.map(doc => doc.data());
}
```

## Browser Developer Tools

View stored data in browser:
1. Open DevTools (F12)
2. Go to Application/Storage tab
3. Expand "Local Storage"
4. Click on your website domain
5. View all keys and their data

## Best Practices

1. **Always use DatabaseManager** - Don't access localStorage directly
2. **Validate data** - Check inputs before saving
3. **Handle errors** - Wrap database calls in try-catch
4. **Backup data** - Periodically export customer and order data
5. **Secure sensitive info** - Never store passwords or payment info in localStorage

## Example Usage

```javascript
// Add product to cart
const product = DatabaseManager.getProductById('roadster-200');
DatabaseManager.addToCart(product, 2);

// Get order summary
const cart = DatabaseManager.getCart();
const stats = DatabaseManager.getCartStats();
console.log(`Total: $${stats.totalPrice}`);

// Create order
const order = DatabaseManager.createOrder(
  'customer@email.com',
  cart
);

// Clear cart after order
DatabaseManager.clearCart();
```

## Troubleshooting

**Cart not persisting?**
- Check browser localStorage is enabled
- Check DevTools for errors
- Ensure script load order: database.js → config.js → script.js

**Products not loading?**
- Verify database.js is loaded before config.js
- Check PRODUCTS_DATABASE array in database.js
- Check browser console for JavaScript errors

**Data lost after refresh?**
- Make sure you're using DatabaseManager methods
- Check localStorage isn't cleared by browser settings
- Verify storage keys match in config.js

## Support

For more information or to add features:
- Contact: info@bikesale.com
- Owner: Gokil
