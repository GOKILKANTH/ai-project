# Quick Database Management Commands

## MySQL CLI Commands

### Connect to Database
```bash
mysql -u root -p
mysql -u root -p bike_sale_db
```

### View All Data

```sql
-- View all products
SELECT * FROM products;

-- View all customers
SELECT * FROM customers;

-- View all orders
SELECT * FROM orders;

-- View order details
SELECT o.id, o.order_date, c.name, o.total_amount, o.status
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- View cart items
SELECT c.session_id, p.name, c.quantity, p.price 
FROM cart c
JOIN products p ON c.product_id = p.id;

-- View product reviews
SELECT p.name, pr.rating, pr.review_text, pr.created_at
FROM product_reviews pr
JOIN products p ON pr.product_id = p.id;
```

### Insert Sample Data

```sql
-- Add new customer
INSERT INTO customers (email, name, phone, address, city, state, postal_code, country)
VALUES ('newcustomer@example.com', 'New Customer', '555-0999', '999 Main St', 'Springfield', 'IL', '62701', 'USA');

-- Add product review
INSERT INTO product_reviews (product_id, customer_id, rating, review_text)
VALUES ('roadster-200', 1, 5, 'Amazing bike! Very fast and lightweight.');

-- Update product stock
UPDATE products SET stock_quantity = 20 WHERE id = 'roadster-200';

-- Update order status
UPDATE orders SET status = 'shipped' WHERE id = 1;
```

### Query Examples

```sql
-- Products over $700
SELECT name, price FROM products WHERE price > 700 ORDER BY price DESC;

-- Count products by category
SELECT category, COUNT(*) as count, AVG(price) as avg_price
FROM products
GROUP BY category;

-- Customer orders summary
SELECT c.name, COUNT(o.id) as order_count, SUM(o.total_amount) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;

-- Top rated products
SELECT name, reviews, reviewCount
FROM products
ORDER BY reviews DESC
LIMIT 5;

-- Most expensive items in stock
SELECT name, price, stock_quantity
FROM products
WHERE inStock = TRUE
ORDER BY price DESC
LIMIT 10;

-- Cart summary
SELECT c.session_id, COUNT(*) as items, SUM(c.quantity) as total_quantity, SUM(c.quantity * p.price) as total_value
FROM cart c
JOIN products p ON c.product_id = p.id
GROUP BY c.session_id;

-- Average rating by category
SELECT category, AVG(reviews) as avg_rating, COUNT(*) as count
FROM products
GROUP BY category;
```

### Admin Commands

```sql
-- Backup database
mysqldump -u root -p bike_sale_db > bike_sale_backup.sql

-- Restore database
mysql -u root -p bike_sale_db < bike_sale_backup.sql

-- Delete all orders (cascade deletes order_items too)
DELETE FROM orders;

-- Clear all carts
DELETE FROM cart;

-- Reset auto-increment counters
ALTER TABLE customers AUTO_INCREMENT = 1;
ALTER TABLE orders AUTO_INCREMENT = 1;

-- View database info
SHOW TABLES;
DESCRIBE products;
SHOW INDEXES FROM products;

-- Check database size
SELECT table_name, ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.TABLES
WHERE table_schema = 'bike_sale_db';
```

### User Management

```sql
-- Create database user (for production)
CREATE USER 'bike_user'@'localhost' IDENTIFIED BY 'secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON bike_sale_db.* TO 'bike_user'@'localhost';
FLUSH PRIVILEGES;

-- Remove user
DROP USER 'bike_user'@'localhost';
```

---

## API Testing with curl

### Test Database Connection
```bash
# From server
curl http://localhost:3000/api/health
```

### Get Products
```bash
# Get all
curl http://localhost:3000/api/products

# Get one
curl http://localhost:3000/api/products/roadster-200

# By category
curl http://localhost:3000/api/products/category/mountain

# Search
curl http://localhost:3000/api/products/search/carbon
```

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "items": [
      {"product_id": "roadster-200", "quantity": 1, "unit_price": 699}
    ],
    "shipping_address": "123 Main St, Springfield, IL"
  }'
```

### Add to Cart
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "sess_123",
    "product_id": "roadster-200",
    "quantity": 1
  }'
```

### Get Cart
```bash
curl http://localhost:3000/api/cart/sess_123
```

---

## Database Schema

### Tables
- **products** - Bike catalog
- **customers** - Customer information
- **orders** - Order records
- **order_items** - Line items for orders
- **cart** - Shopping cart items
- **product_reviews** - Customer reviews

### Key Relationships
```
customers (1) ──── (many) orders
                      │
                      └──── (many) order_items
                                      │
                                      └──── products

product_reviews ──── products
 └── customers (optional)

cart ──── products
    └── customers (optional)
```

---

## Performance Tips

1. **Use indexes** - Already added for: category, price, status, foreign keys
2. **Pagination** - Limit results in queries for large datasets
3. **Caching** - Cache product list in frontend (localStorage backup)
4. **Connection pooling** - Server.js uses connection pool (10 connections)
5. **Archive old data** - Move completed orders to archive table

---

## Backup & Recovery

```bash
# Daily backup
mysqldump -u root -p bike_sale_db > backups/bike_sale_$(date +%Y%m%d).sql

# Restore from backup
mysql -u root -p bike_sale_db < backups/bike_sale_20240101.sql
```
