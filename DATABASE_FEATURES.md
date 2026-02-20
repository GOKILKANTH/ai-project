# Enhanced Database Features Guide

## Overview
Your Bike Sale App database now includes powerful search, filtering, sorting, and inventory management features.

---

## 1. SEARCH FUNCTIONALITY

### Basic Search
Search across product names, descriptions, categories, and specifications:

```javascript
// Search for "carbon"
const results = DatabaseManager.searchProducts('carbon');
// Returns: [Pro Racer X, Speedster Elite]

// Search for "suspension"
const results = DatabaseManager.searchProducts('suspension');
// Returns: [Trail Explorer]

// Search for "hybrid"
const results = DatabaseManager.searchProducts('hybrid');
// Returns: [City Hybrid, Urban Classic, Comfort Cruiser]
```

### Features
- Case-insensitive search
- Searches: name, description, category, and all specs
- Returns empty array if query is empty
- Trims whitespace automatically

---

## 2. ADVANCED FILTERING

### Filter by Single Criteria

```javascript
// Filter by category
const roadBikes = DatabaseManager.filterProducts({ 
  category: 'road' 
});

// Filter by price range
const affordableBikes = DatabaseManager.filterProducts({ 
  minPrice: 500, 
  maxPrice: 700 
});

// Filter in-stock items only
const inStock = DatabaseManager.filterProducts({ 
  inStock: true 
});

// Filter by minimum rating
const highly_rated = DatabaseManager.filterProducts({ 
  minRating: 4.5 
});

// Filter by minimum review count
const well_reviewed = DatabaseManager.filterProducts({ 
  minReviews: 30 
});
```

### Filter by Multiple Criteria (Combined)

```javascript
// Road bikes between $600-$1500 with rating 4.5+
const results = DatabaseManager.filterProducts({
  category: 'road',
  minPrice: 600,
  maxPrice: 1500,
  minRating: 4.5,
  inStock: true
});

// Mountain bikes under $1000, highly reviewed
const results = DatabaseManager.filterProducts({
  category: 'mountain',
  maxPrice: 1000,
  minReviews: 40
});

// Hybrid bikes, all prices, rated 4.2+
const results = DatabaseManager.filterProducts({
  category: 'hybrid',
  minRating: 4.2
});
```

---

## 3. SORTING

### Sort by Different Fields

```javascript
// Sort by price (ascending - cheapest first)
const byPrice = DatabaseManager.sortProducts(products, 'price', 'asc');

// Sort by price (descending - most expensive first)
const byPriceDesc = DatabaseManager.sortProducts(products, 'price', 'desc');

// Sort by rating (highest rated first)
const byRating = DatabaseManager.sortProducts(products, 'reviews', 'desc');

// Sort by name (alphabetically)
const byName = DatabaseManager.sortProducts(products, 'name', 'asc');

// Sort by review count
const byPopularity = DatabaseManager.sortProducts(products, 'reviewCount', 'desc');
```

### Practical Examples

```javascript
// Get all products sorted by price (cheapest first)
const allProducts = DatabaseManager.getProducts();
const cheapest = DatabaseManager.sortProducts(allProducts, 'price', 'asc');

// Most reviewed products
const mostReviewed = DatabaseManager.sortProducts(allProducts, 'reviewCount', 'desc');
```

---

## 4. INVENTORY MANAGEMENT

### Check Inventory Levels

```javascript
// Get inventory count for a specific product
const quantity = DatabaseManager.getInventory('roadster-200');
// Returns: 30

// Check if product is in stock
const inStock = DatabaseManager.isInStock('pro-racer-x');
// Returns: true or false

// Get all inventory
const allInventory = DatabaseManager.getAllInventory();
// Returns: { 'roadster-200': 30, 'summit-mtn': 15, ... }
```

### Update Inventory

```javascript
// Decrease inventory when item is added to cart
DatabaseManager.decreaseInventory('roadster-200', 1);
// Reduces by 1

// Increase inventory when item is removed from cart
DatabaseManager.increaseInventory('roadster-200', 1);
// Increases by 1

// Custom inventory update
DatabaseManager.updateInventory('summit-mtn', -5); // Decrease by 5
DatabaseManager.updateInventory('city-hybrid', 10); // Increase by 10
```

### Auto-Inventory on Cart Operations

```javascript
// When adding to cart, inventory decreases
const product = DatabaseManager.getProductById('roadster-200');
DatabaseManager.addToCart(product, 2);
// Don't forget to also update inventory:
DatabaseManager.decreaseInventory('roadster-200', 2);

// When removing from cart, inventory increases
DatabaseManager.removeFromCart('roadster-200');
DatabaseManager.increaseInventory('roadster-200', 2);
```

---

## 5. PRODUCT ANALYTICS

### Get Top Rated Products

```javascript
// Top 5 highest rated products
const topRated = DatabaseManager.getTopRatedProducts(5);
// Returns: [Speedster Elite (4.8), Summit Mountain (4.7), ...]

// Top 3 highest rated
const top3 = DatabaseManager.getTopRatedProducts(3);

// All products ranked by rating
const allByRating = DatabaseManager.getTopRatedProducts(100);
```

### Get Most Reviewed Products

```javascript
// 5 most reviewed products
const mostReviewed = DatabaseManager.getMostReviewedProducts(5);
// Returns: [Speedster Elite (89 reviews), Pro Racer X (67 reviews), ...]

// 3 most reviewed
const trending = DatabaseManager.getMostReviewedProducts(3);
```

### Category Statistics

```javascript
// Get stats for all categories
const categoryStats = DatabaseManager.getCategoryStats();
// Returns:
// {
//   road: { count: 3, avgPrice: 1166, avgRating: 4.7 },
//   mountain: { count: 3, avgPrice: 1015, avgRating: 4.67 },
//   hybrid: { count: 3, avgPrice: 586, avgRating: 4.3 }
// }

// Access specific category
const roadStats = categoryStats.road;
console.log(`Road bikes: ${roadStats.count} items, avg price: $${roadStats.avgPrice}`);
```

### Price Range Analysis

```javascript
// Get price statistics
const priceRange = DatabaseManager.getPriceRange();
// Returns:
// {
//   min: 529,      // Comfort Cruiser
//   max: 1499,     // Speedster Elite
//   average: 892.1 // Average price
// }

console.log(`Prices range from $${priceRange.min} to $${priceRange.max}`);
```

---

## 6. COMBINED SEARCH & FILTER

### Search + Filter Together

```javascript
// Search for "suspension" and filter by price and stock
const results = DatabaseManager.searchAndFilter('suspension', {
  maxPrice: 1200,
  inStock: true
});

// Search for "fiber" with minimum rating
const results = DatabaseManager.searchAndFilter('fiber', {
  minRating: 4.5
});

// Search for "road" bikes only
const results = DatabaseManager.searchAndFilter('carbon', {
  category: 'road'
});
```

---

## 7. PRACTICAL EXAMPLES

### Example 1: Product Listing Page with Filters
```javascript
// User selects: Category=Mountain, MaxPrice=1000, Rating=4.5+
const filtered = DatabaseManager.filterProducts({
  category: 'mountain',
  maxPrice: 1000,
  minRating: 4.5
});

// Sort by price (cheapest first)
const sorted = DatabaseManager.sortProducts(filtered, 'price', 'asc');
console.log(sorted); // Display on page
```

### Example 2: Search Bar
```javascript
// User searches for "carbon"
const searchResults = DatabaseManager.searchProducts('carbon');
console.log(searchResults); // [Pro Racer X, Speedster Elite]
```

### Example 3: Smart Shopping Help
```javascript
// Show top-rated bikes under $800
const affordable = DatabaseManager.filterProducts({
  maxPrice: 800
});
const topPicks = DatabaseManager.sortProducts(affordable, 'reviews', 'desc');
```

### Example 4: Inventory Management
```javascript
// Process order checkout
function checkoutCart() {
  const cart = DatabaseManager.getCart();
  
  // Check if all items are in stock
  let allInStock = true;
  cart.forEach(item => {
    if (DatabaseManager.getInventory(item.id) < item.quantity) {
      allInStock = false;
      alert(`Sorry, ${item.name} has insufficient inventory`);
    }
  });
  
  if (allInStock) {
    // Update inventory for all items
    cart.forEach(item => {
      DatabaseManager.decreaseInventory(item.id, item.quantity);
    });
    
    // Create order
    const order = DatabaseManager.createOrder(
      'customer@email.com',
      cart
    );
    DatabaseManager.clearCart();
    return order;
  }
}
```

### Example 5: Category Dashboard
```javascript
// Show category overview
const stats = DatabaseManager.getCategoryStats();
const priceRange = DatabaseManager.getPriceRange();

Object.keys(stats).forEach(category => {
  const s = stats[category];
  console.log(`
    ${category.toUpperCase()}
    Count: ${s.count}
    Avg Price: $${s.avgPrice.toFixed(2)}
    Avg Rating: ${s.avgRating.toFixed(2)}/5
  `);
});

console.log(`Overall: $${priceRange.min} - $${priceRange.max}`);
```

---

## 8. ENHANCED SCRIPT.JS INTEGRATION

You can enhance [script.js](script.js) to use these features:

```javascript
// Add search functionality
const searchInput = document.getElementById('searchInput'); // Add to HTML
if(searchInput) {
  searchInput.addEventListener('input', function(e) {
    const results = DatabaseManager.searchProducts(e.target.value);
    displayProducts(results);
  });
}

// Add filter controls
const priceFilter = document.getElementById('priceMax');
if(priceFilter) {
  priceFilter.addEventListener('change', function(e) {
    const filtered = DatabaseManager.filterProducts({
      maxPrice: parseFloat(e.target.value)
    });
    displayProducts(filtered);
  });
}

// Update inventory after adding to cart
const buyButtons = document.querySelectorAll('.buy');
buyButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const productId = this.getAttribute('data-id');
    const product = DatabaseManager.getProductById(productId);
    
    // Check inventory
    if (!DatabaseManager.isInStock(productId)) {
      alert('Out of stock!');
      return;
    }
    
    DatabaseManager.addToCart(product);
    DatabaseManager.decreaseInventory(productId, 1);
    
    // Feedback
    btn.textContent = 'Added! ✓';
    setTimeout(() => { btn.textContent = 'Add to Cart'; }, 1500);
  });
});
```

---

## 9. API REFERENCE

| Method | Parameters | Returns | Purpose |
|--------|-----------|---------|---------|
| `searchProducts(query)` | string | array | Search by text |
| `filterProducts(criteria)` | object | array | Filter by conditions |
| `sortProducts(products, field, order)` | array, string, string | array | Sort results |
| `getInventory(productId)` | string | number | Get stock level |
| `updateInventory(productId, qty)` | string, number | number | Adjust inventory |
| `decreaseInventory(productId, qty)` | string, number | number | Reduce inventory |
| `increaseInventory(productId, qty)` | string, number | number | Increase inventory |
| `isInStock(productId)` | string | boolean | Check availability |
| `getTopRatedProducts(limit)` | number | array | Top rated products |
| `getMostReviewedProducts(limit)` | number | array | Most reviewed products |
| `getCategoryStats()` | - | object | Category analytics |
| `getPriceRange()` | - | object | Min/max/avg prices |
| `searchAndFilter(query, criteria)` | string, object | array | Combined search+filter |

---

## 10. STORAGE INFORMATION

New storage key added:
- `bike_sale_inventory` - Product inventory quantities

All data persists in browser localStorage and initializes on first load.

