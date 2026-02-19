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

  // CLEAR ALL DATA
  clearAllData() {
    localStorage.removeItem(CONFIG.storage.cartKey);
    localStorage.removeItem(CONFIG.storage.ordersKey);
    localStorage.removeItem(CONFIG.storage.customersKey);
  }
};

// Initialize products on first load
if (!localStorage.getItem('bike_sale_products')) {
  DatabaseManager.saveProducts(PRODUCTS_DATABASE);
}
