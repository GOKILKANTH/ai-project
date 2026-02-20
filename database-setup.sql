-- Active: 1771568553793@@localhost@3306@bike_sale_db
-- Active: 1771568553793@@localhost@3306@bike_sale_dblhost@3306@bike_sale_db
-- ===========================
-- BIKE SALE DATABASE SETUP
-- ===========================

-- Create Database
CREATE DATABASE IF NOT EXISTS bike_sale_db;
USE bike_sale_db;

-- ===========================
-- PRODUCTS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image LONGTEXT,
  description TEXT,
  frame VARCHAR(100),
  weight VARCHAR(50),
  gears VARCHAR(50),
  brakes VARCHAR(100),
  inStock BOOLEAN DEFAULT TRUE,
  stock_quantity INT DEFAULT 10,
  reviews DECIMAL(3, 1),
  reviewCount INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ===========================
-- USERS TABLE (Authentication)
-- ===========================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- ===========================
-- CUSTOMERS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ===========================
-- ORDERS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  shipping_address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- ===========================
-- ORDER ITEMS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- ===========================
-- CART TABLE (Session-based)
-- ===========================
CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  customer_id INT,
  product_id VARCHAR(50) NOT NULL,
  quantity INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- ===========================
-- PRODUCT REVIEWS TABLE
-- ===========================
CREATE TABLE IF NOT EXISTS product_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(50) NOT NULL,
  customer_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- ===========================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- ===========================
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_product_price ON products(price);
CREATE INDEX idx_product_inStock ON products(inStock);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_cart_session_id ON cart(session_id);
CREATE INDEX idx_cart_customer_id ON cart(customer_id);
CREATE INDEX idx_reviews_product_id ON product_reviews(product_id);

-- ===========================
-- INSERT SAMPLE PRODUCTS
-- ===========================

INSERT INTO products (id, name, category, price, image, description, frame, weight, gears, brakes, inStock, stock_quantity, reviews, reviewCount) VALUES
('roadster-200', 'Roadster 200', 'road', 699.00, 'https://source.unsplash.com/800x600/?road+bike,1', 'Lightweight and fast for long-distance rides', 'Aluminum', '8.5 kg', '21-speed', 'Dual Pivot Caliper', TRUE, 15, 4.5, 23),
('summit-mtn', 'Summit Mountain', 'mountain', 849.00, 'https://source.unsplash.com/800x600/?mountain+bike,1', 'Perfect for off-road adventures and trails', 'Steel', '12 kg', '18-speed', 'V-Brakes', TRUE, 12, 4.7, 45),
('city-hybrid', 'City Hybrid', 'hybrid', 529.00, 'https://source.unsplash.com/800x600/?city+bike', 'Versatile bike for city commuting', 'Aluminum', '10.5 kg', '21-speed', 'V-Brakes', TRUE, 20, 4.3, 18),
('carbon-pro', 'Carbon Pro', 'road', 1299.00, 'https://source.unsplash.com/800x600/?carbon+bike', 'Premium carbon fiber racing machine', 'Carbon', '7.2 kg', '22-speed', 'Disc Brakes', TRUE, 8, 4.9, 67),
('trail-beast', 'Trail Beast', 'mountain', 999.00, 'https://source.unsplash.com/800x600/?mountain+bike,2', 'Rugged mountain bike for extreme terrain', 'Alloy Steel', '13.5 kg', '21-speed', 'Hydraulic Disc', TRUE, 10, 4.6, 34),
('urban-commuter', 'Urban Commuter', 'hybrid', 449.00, 'https://source.unsplash.com/800x600/?commuter+bike', 'Efficient and comfortable for daily commute', 'Steel', '11.8 kg', '18-speed', 'V-Brakes', TRUE, 25, 4.2, 12),
('speed-demon', 'Speed Demon', 'road', 1199.00, 'https://source.unsplash.com/800x600/?racing+bike', 'Ultra-lightweight speed focused machine', 'Carbon Aluminum', '7.8 kg', '22-speed', 'Disc Brakes', TRUE, 6, 4.8, 56),
('explorer-plus', 'Explorer Plus', 'hybrid', 649.00, 'https://source.unsplash.com/800x600/?adventure+bike', 'All-terrain explorer for adventure seekers', 'Aluminum', '11.2 kg', '21-speed', 'Hydraulic Disc', TRUE, 14, 4.4, 28),
('trail-tracker', 'Trail Tracker', 'mountain', 749.00, 'https://source.unsplash.com/800x600/?mountain+bike,3', 'Smooth handling mountain bike for trails', 'Alloy', '11.9 kg', '18-speed', 'V-Brakes', TRUE, 18, 4.5, 31);

-- ===========================
-- INSERT SAMPLE USERS
-- ===========================

INSERT INTO users (email, password_hash, first_name, last_name, phone, is_active) VALUES
('john@example.com', '$2b$10$YourHashedPasswordHere1', 'John', 'Doe', '555-0100', TRUE),
('jane@example.com', '$2b$10$YourHashedPasswordHere2', 'Jane', 'Smith', '555-0101', TRUE),
('bob@example.com', '$2b$10$YourHashedPasswordHere3', 'Bob', 'Johnson', '555-0102', TRUE);

-- ===========================
-- INSERT SAMPLE CUSTOMERS
-- ===========================

INSERT INTO customers (user_id, email, name, phone, address, city, state, postal_code, country) VALUES
(1, 'john@example.com', 'John Doe', '555-0100', '123 Main St', 'Springfield', 'IL', '62701', 'USA'),
(2, 'jane@example.com', 'Jane Smith', '555-0101', '456 Oak Ave', 'Shelbyville', 'IL', '62702', 'USA'),
(3, 'bob@example.com', 'Bob Johnson', '555-0102', '789 Pine Rd', 'Capital City', 'IL', '62703', 'USA');

-- ===========================
-- INSERT SAMPLE ORDER
-- ===========================

INSERT INTO orders (customer_id, total_amount, status, shipping_address) VALUES
(1, 1399.00, 'completed', '123 Main St, Springfield, IL 62701');

-- ===========================
-- INSERT ORDER ITEMS
-- ===========================

INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 'roadster-200', 1, 699.00, 699.00),
(1, 'city-hybrid', 1, 529.00, 529.00);

-- ===========================
-- VERIFY SETUP
-- ===========================

-- Display summary
SELECT 'Total Products Inserted' as Info, COUNT(*) as Count FROM products;
SELECT 'Total Customers Inserted' as Info, COUNT(*) as Count FROM customers;
SELECT 'Total Orders Inserted' as Info, COUNT(*) as Count FROM orders;

-- Show products
SELECT 'Products:' as Info;
SELECT id, name, category, price, inStock, stock_quantity FROM products ORDER BY category, name;
