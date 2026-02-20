// ===========================
// DATABASE CONFIGURATION
// ===========================

const CONFIG = {
  // Database Type: 'localStorage', 'firebase', 'api'
  database: {
    type: 'localStorage',
    // API Configuration (if using backend API)
    apiUrl: 'http://localhost:3000/api',
    // Firebase Configuration (if using Firebase)
    firebase: {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID'
    }
  },

  // Local Storage Keys
  storage: {
    cartKey: 'bike_sale_cart',
    ordersKey: 'bike_sale_orders',
    customersKey: 'bike_sale_customers',
    themeKey: 'bike_sale_theme',
    cartCountKey: 'bike_cart_count'
  },

  // App Settings
  app: {
    name: 'Bike Sale',
    owner: 'Gokil',
    version: '1.0.0',
    currency: '$',
    freeShippingThreshold: 500
  },

  // Shop Information
  shop: {
    name: 'Bike Sale Store',
    owner: 'Gokil',
    email: 'gokil@bikesale.com',
    phone: '+919500996635',
    supportEmail: 'support@bikesale.com',
    address: {
      street: '432/Mattigaikurichi',
      landmark: 'Modern Rice Mill Opposite',
      city: 'Kallakurichi',
      state: 'Tamil Nadu',
      zipCode: '606217',
      country: 'India'
    },
    hours: {
      weekday: '9:00 AM - 6:00 PM IST',
      saturday: '10:00 AM - 4:00 PM IST',
      sunday: 'Closed',
      timezone: 'IST'
    },
    social: {
      facebook: 'https://facebook.com/bikesale',
      instagram: 'https://instagram.com/bikesale',
      twitter: 'https://twitter.com/bikesale'
    }
  }
};

// ===========================
// DATABASE MANAGER
// ===========================

const DatabaseManager = {
  // Get all data
  getAllData() {
    return {
      products: this.getProducts(),
      cart: this.getCart(),
      orders: this.getOrders(),
      customers: this.getCustomers()
    };
  },

  // PRODUCTS
  getProducts() {
    const stored = localStorage.getItem('bike_sale_products');
    return stored ? JSON.parse(stored) : PRODUCTS_DATABASE;
  },

  saveProducts(products) {
    localStorage.setItem('bike_sale_products', JSON.stringify(products));
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id);
  },

  // CART
  getCart() {
    const stored = localStorage.getItem(CONFIG.storage.cartKey);
    return stored ? JSON.parse(stored) : [];
  },

  saveCart(cartItems) {
    localStorage.setItem(CONFIG.storage.cartKey, JSON.stringify(cartItems));
  },

  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    this.saveCart(cart);
    return cart;
  },

  removeFromCart(productId) {
    const cart = this.getCart();
    const updated = cart.filter(item => item.id !== productId);
    this.saveCart(updated);
    return updated;
  },

  updateCartQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    this.saveCart(cart);
    return cart;
  },

  clearCart() {
    localStorage.removeItem(CONFIG.storage.cartKey);
    return [];
  },

  // ORDERS
  getOrders() {
    const stored = localStorage.getItem(CONFIG.storage.ordersKey);
    return stored ? JSON.parse(stored) : [];
  },

  saveOrders(orders) {
    localStorage.setItem(CONFIG.storage.ordersKey, JSON.stringify(orders));
  },

  createOrder(customerEmail, cartItems) {
    const orders = this.getOrders();
    const newOrder = {
      id: 'ORD-' + Date.now(),
      customerEmail: customerEmail,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    this.saveOrders(orders);
    return newOrder;
  },

  getOrdersByEmail(email) {
    const orders = this.getOrders();
    return orders.filter(order => order.customerEmail === email);
  },

  // CUSTOMERS
  getCustomers() {
    const stored = localStorage.getItem(CONFIG.storage.customersKey);
    return stored ? JSON.parse(stored) : [];
  },

  saveCustomers(customers) {
    localStorage.setItem(CONFIG.storage.customersKey, JSON.stringify(customers));
  },

  addCustomer(customerData) {
    const customers = this.getCustomers();
    const newCustomer = {
      id: 'CUST-' + Date.now(),
      email: customerData.email,
      name: customerData.name,
      phone: customerData.phone || '',
      createdAt: new Date().toISOString()
    };
    
    customers.push(newCustomer);
    this.saveCustomers(customers);
    return newCustomer;
  },

  // STATISTICS
  getCartStats() {
    const cart = this.getCart();
    return {
      itemCount: cart.length,
      totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
  },

  // ===== SEARCH FUNCTIONALITY =====
  searchProducts(query) {
    const products = this.getProducts();
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      Object.values(product.specs).some(spec => 
        spec.toString().toLowerCase().includes(searchTerm)
      )
    );
  },

  // ===== ADVANCED FILTERING =====
  filterProducts(criteria) {
    let products = this.getProducts();
    
    // Filter by category
    if (criteria.category && criteria.category !== 'all') {
      products = products.filter(p => p.category === criteria.category);
    }
    
    // Filter by price range
    if (criteria.minPrice !== undefined) {
      products = products.filter(p => p.price >= criteria.minPrice);
    }
    if (criteria.maxPrice !== undefined) {
      products = products.filter(p => p.price <= criteria.maxPrice);
    }
    
    // Filter by stock status
    if (criteria.inStock === true) {
      products = products.filter(p => p.inStock);
    }
    
    // Filter by minimum rating
    if (criteria.minRating !== undefined) {
      products = products.filter(p => p.reviews >= criteria.minRating);
    }
    
    // Filter by minimum review count
    if (criteria.minReviews !== undefined) {
      products = products.filter(p => p.reviewCount >= criteria.minReviews);
    }
    
    return products;
  },

  // ===== SORTING =====
  sortProducts(products, sortBy = 'name', order = 'asc') {
    const sorted = [...products];
    
    sorted.sort((a, b) => {
      let valueA = a[sortBy];
      let valueB = b[sortBy];
      
      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    
    return sorted;
  },

  // ===== INVENTORY MANAGEMENT =====
  getInventory(productId) {
    const stored = localStorage.getItem('bike_sale_inventory');
    const inventory = stored ? JSON.parse(stored) : INVENTORY_DATABASE;
    return inventory[productId] || 0;
  },

  saveInventory(inventory) {
    localStorage.setItem('bike_sale_inventory', JSON.stringify(inventory));
  },

  updateInventory(productId, quantity) {
    const inventory = this.getInventory(productId) || 0;
    const newQuantity = Math.max(0, inventory + quantity);
    const allInventory = this.getAllInventory();
    allInventory[productId] = newQuantity;
    this.saveInventory(allInventory);
    return newQuantity;
  },

  getAllInventory() {
    const stored = localStorage.getItem('bike_sale_inventory');
    return stored ? JSON.parse(stored) : INVENTORY_DATABASE;
  },

  decreaseInventory(productId, quantity = 1) {
    return this.updateInventory(productId, -quantity);
  },

  increaseInventory(productId, quantity = 1) {
    return this.updateInventory(productId, quantity);
  },

  isInStock(productId) {
    return this.getInventory(productId) > 0;
  },

  // ===== PRODUCT ANALYTICS =====
  getTopRatedProducts(limit = 5) {
    const products = this.getProducts();
    return this.sortProducts(products, 'reviews', 'desc').slice(0, limit);
  },

  getMostReviewedProducts(limit = 5) {
    const products = this.getProducts();
    return this.sortProducts(products, 'reviewCount', 'desc').slice(0, limit);
  },

  getCategoryStats() {
    const products = this.getProducts();
    const stats = {};
    
    products.forEach(product => {
      if (!stats[product.category]) {
        stats[product.category] = {
          count: 0,
          avgPrice: 0,
          totalPrice: 0,
          avgRating: 0,
          totalRating: 0
        };
      }
      stats[product.category].count++;
      stats[product.category].totalPrice += product.price;
      stats[product.category].totalRating += product.reviews;
    });
    
    // Calculate averages
    Object.keys(stats).forEach(category => {
      stats[category].avgPrice = stats[category].totalPrice / stats[category].count;
      stats[category].avgRating = stats[category].totalRating / stats[category].count;
    });
    
    return stats;
  },

  getPriceRange() {
    const products = this.getProducts();
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      average: prices.reduce((a, b) => a + b) / prices.length
    };
  },

  // ===== COMBINED SEARCH & FILTER =====
  searchAndFilter(query, criteria = {}) {
    let results = this.searchProducts(query);
    results = this.filterProducts({ ...criteria, products: results });
    return results;
  },

  // Convert filtering function to use search results
  filterProducts(criteria) {
    let products = criteria.products || this.getProducts();
    
    // Filter by category
    if (criteria.category && criteria.category !== 'all') {
      products = products.filter(p => p.category === criteria.category);
    }
    
    // Filter by price range
    if (criteria.minPrice !== undefined) {
      products = products.filter(p => p.price >= criteria.minPrice);
    }
    if (criteria.maxPrice !== undefined) {
      products = products.filter(p => p.price <= criteria.maxPrice);
    }
    
    // Filter by stock status
    if (criteria.inStock === true) {
      products = products.filter(p => p.inStock);
    }
    
    // Filter by minimum rating
    if (criteria.minRating !== undefined) {
      products = products.filter(p => p.reviews >= criteria.minRating);
    }
    
    // Filter by minimum review count
    if (criteria.minReviews !== undefined) {
      products = products.filter(p => p.reviewCount >= criteria.minReviews);
    }
    
    return products;
  },

  // ===== CLEAR ALL DATA
  clearAllData() {
    localStorage.removeItem(CONFIG.storage.cartKey);
    localStorage.removeItem(CONFIG.storage.ordersKey);
    localStorage.removeItem(CONFIG.storage.customersKey);
  }
};

// Initialize data on first load
if (!localStorage.getItem('bike_sale_products')) {
  DatabaseManager.saveProducts(PRODUCTS_DATABASE);
}

// Initialize inventory on first load
if (!localStorage.getItem('bike_sale_inventory')) {
  DatabaseManager.saveInventory(INVENTORY_DATABASE);
}
