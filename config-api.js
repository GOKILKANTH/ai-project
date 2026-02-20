// ===========================
// UPDATED CONFIG.JS FOR API
// ===========================
// Replace your current config.js with this version to use the MySQL API

const CONFIG = {
  // Database Configuration
  database: {
    type: 'api',  // Changed from 'localStorage' to 'api'
    apiUrl: 'http://localhost:3000/api',
    
    // Keep these for reference but not used with API type
    firebase: {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID'
    }
  },

  // Local Storage Keys (still used for client-side caching)
  storage: {
    cartKey: 'bike_sale_cart',
    ordersKey: 'bike_sale_orders',
    customersKey: 'bike_sale_customers',
    themeKey: 'bike_sale_theme',
    cartCountKey: 'bike_cart_count',
    sessionKey: 'bike_session_id'
  },

  // App Configuration
  app: {
    name: 'Bike Sale',
    owner: 'Gokil',
    currency: '$',
    version: '2.0.0'
  },

  // API Response Configuration
  api: {
    timeout: 5000,
    retries: 3,
    retryDelay: 1000
  }
};

// ===========================
// API HELPER CLASS
// ===========================

class ApiManager {
  constructor() {
    this.baseUrl = CONFIG.database.apiUrl;
  }

  /**
   * Make fetch request with error handling
   */
  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===========================
  // PRODUCTS
  // ===========================

  /**
   * Get all products
   */
  async getProducts() {
    return this.request('/products');
  }

  /**
   * Get single product by ID
   */
  async getProduct(productId) {
    return this.request(`/products/${productId}`);
  }

  /**
   * Get products by category
   */
  async getProductsByCategory(category) {
    return this.request(`/products/category/${category}`);
  }

  /**
   * Search products
   */
  async searchProducts(query) {
    return this.request(`/products/search/${encodeURIComponent(query)}`);
  }

  // ===========================
  // CUSTOMERS
  // ===========================

  /**
   * Create new customer
   */
  async createCustomer(customerData) {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData)
    });
  }

  /**
   * Get customer by email
   */
  async getCustomer(email) {
    return this.request(`/customers/${email}`);
  }

  // ===========================
  // ORDERS
  // ===========================

  /**
   * Create new order
   */
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  /**
   * Get customer orders
   */
  async getCustomerOrders(customerId) {
    return this.request(`/orders/customer/${customerId}`);
  }

  /**
   * Get order details with items
   */
  async getOrderDetails(orderId) {
    return this.request(`/orders/${orderId}/details`);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  // ===========================
  // CART
  // ===========================

  /**
   * Add item to cart
   */
  async addToCart(sessionId, productId, quantity, customerId = null) {
    return this.request('/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        session_id: sessionId,
        customer_id: customerId,
        product_id: productId,
        quantity
      })
    });
  }

  /**
   * Get cart items
   */
  async getCart(sessionId) {
    return this.request(`/cart/${sessionId}`);
  }

  /**
   * Remove item from cart
   */
  async removeFromCart(sessionId, productId) {
    return this.request(`/cart/${sessionId}/${productId}`, {
      method: 'DELETE'
    });
  }

  /**
   * Clear entire cart
   */
  async clearCart(sessionId) {
    return this.request(`/cart/${sessionId}`, {
      method: 'DELETE'
    });
  }

  // ===========================
  // REVIEWS
  // ===========================

  /**
   * Add product review
   */
  async addReview(productId, rating, reviewText = '', customerId = null) {
    return this.request('/reviews', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        customer_id: customerId,
        rating,
        review_text: reviewText
      })
    });
  }

  /**
   * Get product reviews
   */
  async getProductReviews(productId) {
    return this.request(`/reviews/product/${productId}`);
  }
}

// Create global instance
const API = new ApiManager();

// ===========================
// EXAMPLE USAGE IN HTML
// ===========================

/*

// Get all products
async function loadProducts() {
  try {
    const products = await API.getProducts();
    console.log('Products:', products);
    // Display products in UI
  } catch (error) {
    console.error('Failed to load products:', error);
  }
}

// Add product to cart
async function handleAddToCart(productId) {
  try {
    const sessionId = localStorage.getItem(CONFIG.storage.sessionKey) || 'session_' + Date.now();
    await API.addToCart(sessionId, productId, 1);
    console.log('Item added to cart');
  } catch (error) {
    console.error('Failed to add to cart:', error);
  }
}

// Create order
async function handleCheckout(customerData, cartItems) {
  try {
    // First, create or get customer
    const customer = await API.createCustomer(customerData);
    
    // Then create order
    const order = await API.createOrder({
      customer_id: customer.id,
      items: cartItems,
      shipping_address: customerData.address
    });
    
    console.log('Order created:', order);
    // Clear cart and redirect to confirmation
  } catch (error) {
    console.error('Failed to checkout:', error);
  }
}

// Search products
async function handleSearch(query) {
  try {
    const results = await API.searchProducts(query);
    console.log('Search results:', results);
  } catch (error) {
    console.error('Search failed:', error);
  }
}

*/
