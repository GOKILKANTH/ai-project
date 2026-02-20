// ===========================
// AUTHENTICATION UTILITY
// ===========================
// Include this file in your HTML pages: <script src="auth.js"></script>

const AUTH = {
  API_URL: 'http://localhost:3306/api',
  
  // ===========================
  // TOKEN MANAGEMENT
  // ===========================

  /**
   * Get stored JWT token
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Get stored user info
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return !!this.getToken();
  },

  /**
   * Get authorization header for API calls
   */
  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  },

  /**
   * Store token and user info
   */
  setSession(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  /**
   * Clear all auth data
   */
  clearSession() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // ===========================
  // AUTHENTICATION FUNCTIONS
  // ===========================

  /**
   * Register new user
   */
  async register(email, password, firstName, lastName) {
    try {
      const response = await fetch(`${this.API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await fetch(`${this.API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store session
      this.setSession(data.token, data.user);

      return data.user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify token with server
   */
  async verify() {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch(`${this.API_URL}/auth/verify`, {
        headers: this.getAuthHeader()
      });

      return response.ok;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  },

  /**
   * Logout user
   */
  async logout() {
    try {
      // Notify server (optional)
      await fetch(`${this.API_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeader()
      }).catch(e => console.log('Logout notification failed:', e));

      // Clear local session
      this.clearSession();
    } catch (error) {
      console.error('Logout error:', error);
      this.clearSession();
    }
  },

  // ===========================
  // PROTECTED PAGE HELPERS
  // ===========================

  /**
   * Require authentication on page
   * Call this at the top of any protected page
   */
  requireLogin() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  /**
   * Verify authentication and redirect if invalid
   */
  async verifyAndProtect() {
    const isValid = await this.verify();
    if (!isValid) {
      this.clearSession();
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  /**
   * Display user info in header
   */
  displayUserInfo(elementId) {
    const user = this.getUser();
    if (user) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = user.first_name || user.email;
      }
    }
  },

  // ===========================
  // API CALL HELPERS
  // ===========================

  /**
   * Make authenticated API call
   */
  async apiCall(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...options.headers
    };

    const response = await fetch(`${this.API_URL}${endpoint}`, {
      ...options,
      headers
    });

    if (response.status === 401) {
      // Token expired or invalid
      this.clearSession();
      window.location.href = 'login.html';
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API call failed');
    }

    return data;
  },

  /**
   * Get user's orders
   */
  async getUserOrders(userId) {
    return this.apiCall(`/orders/customer/${userId}`);
  },

  /**
   * Get user's cart
   */
  async getCart(sessionId) {
    return this.apiCall(`/cart/${sessionId}`);
  },

  /**
   * Add to cart (authenticated)
   */
  async addToCart(productId, quantity) {
    const user = this.getUser();
    return this.apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify({
        session_id: 'user_' + user.id,
        customer_id: user.id,
        product_id: productId,
        quantity
      })
    });
  }
};

// ===========================
// AUTO-PROTECT PAGES (Optional)
// ===========================

/**
 * Call this in any HTML page that requires authentication
 * Add to your page with: <script src="auth.js"></script>
 * Then: <script> AUTH.requireLogin(); </script>
 */

// Example usage in HTML:
/*
<!DOCTYPE html>
<html>
<head>
  <script src="auth.js"></script>
</head>
<body>
  <!-- This will redirect to login if not authenticated -->
  <script>
    AUTH.requireLogin();
  </script>

  <nav>
    <h1>Welcome, <span id="userName"></span>!</h1>
    <button onclick="AUTH.logout(); location.href='login.html';">Logout</button>
  </nav>

  <script>
    // Display user name
    AUTH.displayUserInfo('userName');
  </script>
</body>
</html>
*/
