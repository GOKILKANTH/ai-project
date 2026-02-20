# Database & API Setup Guide

## 📋 Overview

Your Bike Sale app now has a complete MySQL database with a Node.js/Express REST API backend. This guide walks you through setup and testing.

---

## 🚀 Quick Start

### Step 1: Create MySQL Database

**Using MySQL Command Line:**

```bash
mysql -u root -p < database-setup.sql
```

Or copy-paste the contents of `database-setup.sql` into MySQL Workbench or your MySQL client.

**What gets created:**
- ✅ `bike_sale_db` database
- ✅ 9 product tables with 9 sample bikes
- ✅ Customer management tables
- ✅ Order and order items tables
- ✅ Shopping cart tables
- ✅ Product reviews tables
- ✅ Performance indexes

---

### Step 2: Install Node.js Dependencies

```bash
npm install
```

Or if you need to install manually:

```bash
npm install express cors mysql2 dotenv body-parser
npm install --save-dev nodemon
```

---

### Step 3: Configure Database Connection

Create a `.env` file in your project root (copy from `.env.example`):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=bike_sale_db
PORT=3000
```

---

### Step 4: Start the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

**Expected output:**
```
🚀 Bike Sale API Server running on http://localhost:3000
📚 Database: bike_sale_db
🔗 API Base URL: http://localhost:3000/api
```

---

## 📚 API Endpoints Reference

### Products

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/:id` | GET | Get single product by ID |
| `/api/products/category/:category` | GET | Filter products by category |
| `/api/products/search/:query` | GET | Search products |

**Example:**
```bash
curl http://localhost:3000/api/products
curl http://localhost:3000/api/products/roadster-200
curl http://localhost:3000/api/products/category/mountain
curl http://localhost:3000/api/products/search/carbon
```

---

### Customers

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/customers` | POST | Create new customer |
| `/api/customers/:email` | GET | Get customer by email |

**Create Customer:**
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newcustomer@example.com",
    "name": "New Customer",
    "phone": "555-1234",
    "address": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "postal_code": "62701",
    "country": "USA"
  }'
```

---

### Orders

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | POST | Create new order |
| `/api/orders/customer/:customer_id` | GET | Get all orders for customer |
| `/api/orders/:id/details` | GET | Get order with line items |
| `/api/orders/:id/status` | PUT | Update order status |

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id": 1,
    "items": [
      {
        "product_id": "roadster-200",
        "quantity": 2,
        "unit_price": 699.00
      },
      {
        "product_id": "city-hybrid",
        "quantity": 1,
        "unit_price": 529.00
      }
    ],
    "shipping_address": "123 Main St, Springfield, IL 62701",
    "notes": "Please handle with care"
  }'
```

---

### Shopping Cart

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cart/add` | POST | Add item to cart |
| `/api/cart/:session_id` | GET | Get cart contents |
| `/api/cart/:session_id/:product_id` | DELETE | Remove item from cart |
| `/api/cart/:session_id` | DELETE | Clear entire cart |

**Add to Cart:**
```bash
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "user_session_123",
    "customer_id": 1,
    "product_id": "roadster-200",
    "quantity": 1
  }'
```

---

### Reviews

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/reviews` | POST | Add product review |
| `/api/reviews/product/:product_id` | GET | Get all reviews for product |

**Add Review:**
```bash
curl -X POST http://localhost:3000/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "roadster-200",
    "customer_id": 1,
    "rating": 5,
    "review_text": "Excellent bike! Fast and lightweight."
  }'
```

---

## 🔗 Connect Frontend to API

Update your `config.js` to use the API instead of localStorage:

```javascript
const CONFIG = {
  database: {
    type: 'api',  // Changed from 'localStorage'
    apiUrl: 'http://localhost:3000/api'
  },
  // ... rest of config
};
```

---

## 🧪 Testing the Setup

### 1. Test Database Connection

```bash
mysql -u root -p bike_sale_db -e "SELECT * FROM products LIMIT 1;"
```

### 2. Test Server Health

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"Server is running","timestamp":"2024-01-15T10:30:45.123Z"}
```

### 3. Test Get All Products

```bash
curl http://localhost:3000/api/products | jq '.'
```

### 4. Test Get Single Product

```bash
curl http://localhost:3000/api/products/roadster-200 | jq '.'
```

---

## 📊 Sample Data

The database comes preloaded with:

**Products (9 bikes):**
- Roadster 200 - $699 (Road)
- Summit Mountain - $849 (Mountain)
- City Hybrid - $529 (Hybrid)
- Carbon Pro - $1299 (Road)
- Trail Beast - $999 (Mountain)
- Urban Commuter - $449 (Hybrid)
- Speed Demon - $1199 (Road)
- Explorer Plus - $649 (Hybrid)
- Trail Tracker - $749 (Mountain)

**Customers (3 sample):**
- John Doe
- Jane Smith
- Bob Johnson

**Sample Order:**
- Order #1: John Doe ordered 1x Roadster + 1x City Hybrid

---

## 🐛 Troubleshooting

### "Cannot GET /api/products"
- Server not running. Start with: `npm run dev`
- Wrong API URL. Check that server is on http://localhost:3000

### "Database connection error"
- MySQL service not running. Start MySQL before running server
- Wrong credentials in `.env` file
- Database `bike_sale_db` not created. Run `database-setup.sql`

### "CORS error"
- CORS middleware is enabled in server.js
- Make sure you're calling from http://localhost:3000 or add domain to CORS whitelist

### "Port 3000 already in use"
- Change PORT in `.env` file
- Kill existing process: `lsof -ti:3000 | xargs kill -9`

---

## 📁 File Structure

```
ai project/
├── database-setup.sql          ← MySQL database creation script
├── server.js                   ← Express API server
├── package.json                ← Node.js dependencies
├── .env.example                ← Environment variables template
├── config.js                   ← Frontend configuration
├── database.js                 ← Frontend product data (backup)
├── script.js                   ← Frontend logic
├── index.html                  ← Home page
├── products.html               ← Products page
├── about.html                  ← About page
├── contact.html                ← Contact page
├── styles.css                  ← Styles
├── images/                     ← Image assets
└── README.md                   ← Project overview
```

---

## 🔐 Security Notes

For production, remember to:
1. Use strong database passwords
2. Store `.env` file securely (never commit to git)
3. Add authentication/authorization
4. Use HTTPS instead of HTTP
5. Add rate limiting
6. Validate and sanitize all inputs
7. Use environment-specific configurations

---

## 🚀 Next Steps

1. ✅ Run database-setup.sql
2. ✅ Install dependencies: `npm install`
3. ✅ Create .env file with your database credentials
4. ✅ Start server: `npm run dev`
5. ✅ Update config.js to use API
6. ✅ Test endpoints with curl or Postman
7. ✅ Update frontend to call API endpoints

---

## 📞 Support

If you encounter issues:
1. Check MySQL is running: `mysql -u root -p -e "SELECT 1;"`
2. Check server logs for error messages
3. Verify `.env` file has correct credentials
4. Make sure port 3000 isn't blocked
5. Review the API endpoints documentation above

Happy coding! 🎉
