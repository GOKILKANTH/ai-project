// ===========================
// DATABASE FEATURES - QUICK TEST
// ===========================
// 
// Copy these examples to browser console (F12) to test:

console.log('=== SEARCH EXAMPLES ===');

// Search for products
DatabaseManager.searchProducts('carbon');
// Result: [Pro Racer X, Speedster Elite]

DatabaseManager.searchProducts('suspension');
// Result: [Trail Explorer]

DatabaseManager.searchProducts('aluminum');
// Result: [Roadster 200, City Hybrid, Urban Classic]


console.log('=== FILTERING EXAMPLES ===');

// Filter road bikes only
DatabaseManager.filterProducts({ category: 'road' });

// Filter bikes under $700
DatabaseManager.filterProducts({ maxPrice: 700 });

// Filter highly-rated bikes (4.5+)
DatabaseManager.filterProducts({ minRating: 4.5 });

// Filter in-stock items
DatabaseManager.filterProducts({ inStock: true });

// Combined filters: Mountain bikes, under $1000, highly reviewed
DatabaseManager.filterProducts({
  category: 'mountain',
  maxPrice: 1000,
  minReviews: 40
});


console.log('=== SORTING EXAMPLES ===');

// Get all products sorted by price (cheapest first)
const allProducts = DatabaseManager.getProducts();
DatabaseManager.sortProducts(allProducts, 'price', 'asc');

// Sort by highest rating
DatabaseManager.sortProducts(allProducts, 'reviews', 'desc');

// Sort alphabetically
DatabaseManager.sortProducts(allProducts, 'name', 'asc');


console.log('=== INVENTORY EXAMPLES ===');

// Check inventory for a product
DatabaseManager.getInventory('roadster-200');
// Result: 30

// Check if product is in stock
DatabaseManager.isInStock('speedster-elite');
// Result: true

// Get all inventory levels
DatabaseManager.getAllInventory();
// Result: { roadster-200: 30, summit-mtn: 15, ... }

// Update inventory
DatabaseManager.decreaseInventory('roadster-200', 2);
// Reduces inventory by 2

DatabaseManager.increaseInventory('city-hybrid', 5);
// Increases inventory by 5


console.log('=== ANALYTICS EXAMPLES ===');

// Get top 5 highest-rated products
DatabaseManager.getTopRatedProducts(5);

// Get 3 most reviewed products
DatabaseManager.getMostReviewedProducts(3);

// Get statistics by category
const stats = DatabaseManager.getCategoryStats();
console.log(stats);
// Result: {
//   road: { count: 3, avgPrice: 1166, avgRating: 4.7, ... },
//   mountain: { count: 3, avgPrice: 1015, avgRating: 4.67, ... },
//   hybrid: { count: 3, avgPrice: 586, avgRating: 4.3, ... }
// }

// Get price range
DatabaseManager.getPriceRange();
// Result: { min: 529, max: 1499, average: 892.1 }


console.log('=== COMBINED SEARCH & FILTER ===');

// Search for "carbon" and filter by price
DatabaseManager.searchAndFilter('carbon', {
  maxPrice: 1300
});

// Search in specific category
DatabaseManager.searchAndFilter('suspension', {
  category: 'mountain'
});


// ===========================
// REAL-WORLD USAGE EXAMPLES
// ===========================

// Example 1: Product page with user filters
function displayFilteredProducts(filters) {
  let results = DatabaseManager.getProducts();
  
  // Apply filters
  if (filters.category) {
    results = results.filter(p => p.category === filters.category);
  }
  
  if (filters.search) {
    results = DatabaseManager.searchProducts(filters.search);
  }
  
  if (filters.maxPrice) {
    results = results.filter(p => p.price <= filters.maxPrice);
  }
  
  // Sort
  results = DatabaseManager.sortProducts(results, 'price', 'asc');
  
  console.log(`Found ${results.length} products`);
  return results;
}

// Usage
const filtered = displayFilteredProducts({
  category: 'road',
  search: 'racer',
  maxPrice: 1300
});


// Example 2: Smart cart checkout with inventory check
function smartCheckout() {
  const cart = DatabaseManager.getCart();
  
  // Check inventory for all items
  for (let item of cart) {
    const stock = DatabaseManager.getInventory(item.id);
    if (stock < item.quantity) {
      console.error(`${item.name}: Need ${item.quantity}, have ${stock}`);
      return false;
    }
  }
  
  // All items available, process order
  for (let item of cart) {
    DatabaseManager.decreaseInventory(item.id, item.quantity);
  }
  
  const order = DatabaseManager.createOrder('customer@email.com', cart);
  DatabaseManager.clearCart();
  return order;
}


// Example 3: Category dashboard
function showCategoryDashboard() {
  const stats = DatabaseManager.getCategoryStats();
  
  console.log('=== CATEGORY DASHBOARD ===');
  Object.keys(stats).forEach(category => {
    const s = stats[category];
    console.log(`
${category.toUpperCase()}
├─ Products: ${s.count}
├─ Avg Price: $${s.avgPrice.toFixed(2)}
├─ Avg Rating: ${s.avgRating.toFixed(1)}/5
└─ Price Range: $${s.totalPrice/s.count}
    `);
  });
}

showCategoryDashboard();


// Example 4: Find best deals
function findBestDeals() {
  const priceRange = DatabaseManager.getPriceRange();
  const midPrice = (priceRange.min + priceRange.max) / 2;
  
  // Find highly-rated bikes below average price
  const deals = DatabaseManager.filterProducts({
    maxPrice: midPrice,
    minRating: 4.3,
    minReviews: 20
  });
  
  return DatabaseManager.sortProducts(deals, 'reviews', 'desc');
}

console.log('Best deals:', findBestDeals());


// Example 5: Trending products
function getTrendingProducts() {
  const topRated = DatabaseManager.getTopRatedProducts(5);
  const mostReviewed = DatabaseManager.getMostReviewedProducts(5);
  
  return {
    topRated,
    mostReviewed
  };
}

console.log('Trending:', getTrendingProducts());
