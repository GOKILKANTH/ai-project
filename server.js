// ===========================
// BIKE SALE APP - EXPRESS SERVER
// ===========================
// Install dependencies: npm install express cors mysql2 dotenv body-parser

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ===========================
// DATABASE CONNECTION POOL
// ===========================

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'bike_sale_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ===========================
// HEALTH CHECK ENDPOINT
// ===========================

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ===========================
// PRODUCTS ENDPOINTS
// ===========================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query('SELECT * FROM products ORDER BY name');
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    connection.release();
    
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE category = ? ORDER BY name',
      [req.params.category]
    );
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search products
app.get('/api/products/search/:query', async (req, res) => {
  try {
    const searchTerm = `%${req.params.query}%`;
    const connection = await pool.getConnection();
    const [products] = await connection.query(
      'SELECT * FROM products WHERE name LIKE ? OR description LIKE ? OR category LIKE ? ORDER BY name',
      [searchTerm, searchTerm, searchTerm]
    );
    connection.release();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================
// CUSTOMERS ENDPOINTS
// ===========================

// Create customer
app.post('/api/customers', async (req, res) => {
  try {
    const { email, name, phone, address, city, state, postal_code, country } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO customers (email, name, phone, address, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [email, name, phone || null, address || null, city || null, state || null, postal_code || null, country || null]
    );
    connection.release();
    res.json({ id: result.insertId, message: 'Customer created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get customer by email
app.get('/api/customers/:email', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [customer] = await connection.query('SELECT * FROM customers WHERE email = ?', [req.params.email]);
    connection.release();
    
    if (customer.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================
// ORDERS ENDPOINTS
// ===========================

// Create order
app.post('/api/orders', async (req, res) => {
  try {
    const { customer_id, items, shipping_address, notes } = req.body;
    const connection = await pool.getConnection();
    
    // Calculate total
    const totalAmount = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    
    // Insert order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (customer_id, total_amount, shipping_address, notes) VALUES (?, ?, ?, ?)',
      [customer_id, totalAmount, shipping_address || null, notes || null]
    );
    
    const orderId = orderResult.insertId;
    
    // Insert order items
    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.product_id, item.quantity, item.unit_price, item.unit_price * item.quantity]
      );
      
      // Update product stock
      await connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?',
        [item.quantity, item.product_id]
      );
    }
    
    connection.release();
    res.json({ order_id: orderId, total_amount: totalAmount, message: 'Order created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders by customer
app.get('/api/orders/customer/:customer_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [orders] = await connection.query(
      'SELECT * FROM orders WHERE customer_id = ? ORDER BY order_date DESC',
      [req.params.customer_id]
    );
    connection.release();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order details with items
app.get('/api/orders/:id/details', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [order] = await connection.query('SELECT * FROM orders WHERE id = ?', [req.params.id]);
    const [items] = await connection.query(
      `SELECT oi.*, p.name, p.image 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = ?`,
      [req.params.id]
    );
    connection.release();
    
    if (order.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ order: order[0], items: items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const connection = await pool.getConnection();
    await connection.query('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id]);
    connection.release();
    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================
// CART ENDPOINTS
// ===========================

// Add to cart
app.post('/api/cart/add', async (req, res) => {
  try {
    const { session_id, customer_id, product_id, quantity } = req.body;
    const connection = await pool.getConnection();
    
    const [existing] = await connection.query(
      'SELECT * FROM cart WHERE session_id = ? AND product_id = ?',
      [session_id, product_id]
    );
    
    if (existing.length > 0) {
      await connection.query(
        'UPDATE cart SET quantity = quantity + ? WHERE session_id = ? AND product_id = ?',
        [quantity, session_id, product_id]
      );
    } else {
      await connection.query(
        'INSERT INTO cart (session_id, customer_id, product_id, quantity) VALUES (?, ?, ?, ?)',
        [session_id, customer_id || null, product_id, quantity]
      );
    }
    
    connection.release();
    res.json({ message: 'Item added to cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cart by session
app.get('/api/cart/:session_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [cartItems] = await connection.query(
      `SELECT c.*, p.name, p.price, p.image, p.category
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.session_id = ?`,
      [req.params.session_id]
    );
    connection.release();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
app.delete('/api/cart/:session_id/:product_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'DELETE FROM cart WHERE session_id = ? AND product_id = ?',
      [req.params.session_id, req.params.product_id]
    );
    connection.release();
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
app.delete('/api/cart/:session_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM cart WHERE session_id = ?', [req.params.session_id]);
    connection.release();
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================
// REVIEWS ENDPOINTS
// ===========================

// Add review
app.post('/api/reviews', async (req, res) => {
  try {
    const { product_id, customer_id, rating, review_text } = req.body;
    const connection = await pool.getConnection();
    
    const [result] = await connection.query(
      'INSERT INTO product_reviews (product_id, customer_id, rating, review_text) VALUES (?, ?, ?, ?)',
      [product_id, customer_id || null, rating, review_text || null]
    );
    
    connection.release();
    res.json({ id: result.insertId, message: 'Review added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reviews for product
app.get('/api/reviews/product/:product_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [reviews] = await connection.query(
      'SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC',
      [req.params.product_id]
    );
    connection.release();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================
// ERROR HANDLING
// ===========================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// ===========================
// START SERVER
// ===========================

app.listen(PORT, () => {
  console.log(`🚀 Bike Sale API Server running on http://localhost:${PORT}`);
  console.log(`📚 Database: bike_sale_db`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
