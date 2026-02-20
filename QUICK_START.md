# 🚀 Quick Start Checklist

Complete these steps in order to set up your Bike Sale database and API.

---

## Phase 1: Database Setup ✅

- [ ] **Step 1:** Open MySQL client (MySQL Workbench, command line, or phpMyAdmin)
  - Command: `mysql -u root -p`

- [ ] **Step 2:** Run the database setup script
  - Option A (Command line):
    ```bash
    mysql -u root -p < database-setup.sql
    ```
  - Option B (Workbench): Open and execute `database-setup.sql`

- [ ] **Step 3:** Verify database created
  ```sql
  SHOW DATABASES;
  USE bike_sale_db;
  SHOW TABLES;
  SELECT COUNT(*) FROM products;  -- Should show 9
  ```

---

## Phase 2: Backend Setup 🔧

- [ ] **Step 4:** Ensure you have Node.js installed
  ```bash
  node --version  # Should be v14+
  npm --version   # Should be v6+
  ```

- [ ] **Step 5:** Install dependencies
  ```bash
  npm install
  ```

- [ ] **Step 6:** Create environment file
  - Copy `.env.example` to `.env`
  - Update credentials if needed:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=bike_sale_db
    PORT=3000
    ```

- [ ] **Step 7:** Start the server
  ```bash
  npm run dev
  ```
  - Expected: `🚀 Bike Sale API Server running on http://localhost:3000`

---

## Phase 3: Testing 🧪

### Test 1: API Health Check

- [ ] Open browser or terminal:
  ```bash
  curl http://localhost:3000/api/health
  ```
  Expected: `{"status":"Server is running","timestamp":"..."}`

### Test 2: Get Products

- [ ] Test products endpoint:
  ```bash
  curl http://localhost:3000/api/products | jq '.'
  ```
  Expected: Array of 9 bike products

### Test 3: Get Single Product

- [ ] Test single product:
  ```bash
  curl http://localhost:3000/api/products/roadster-200 | jq '.'
  ```
  Expected: Single product with all details

### Test 4: Add to Cart

- [ ] Test cart endpoint:
  ```bash
  curl -X POST http://localhost:3000/api/cart/add \
    -H "Content-Type: application/json" \
    -d '{
      "session_id": "test_session",
      "product_id": "roadster-200",
      "quantity": 1
    }'
  ```
  Expected: `{"message":"Item added to cart"}`

### Test 5: Get Cart

- [ ] Retrieve cart:
  ```bash
  curl http://localhost:3000/api/cart/test_session | jq '.'
  ```
  Expected: Array with the added item

---

## Phase 4: Frontend Integration 🎨

- [ ] **Step 8:** Update frontend config
  - Replace `config.js` with `config-api.js`
  - Or manually change: `database: { type: 'api' }`

- [ ] **Step 9:** Include API manager in HTML
  Add to your HTML files (before script.js):
  ```html
  <script src="config.js"></script>
  ```

- [ ] **Step 10:** Update product loading
  Replace localStorage calls with API calls:
  ```javascript
  // Old (localStorage)
  const products = DatabaseManager.getProducts();
  
  // New (API)
  const products = await API.getProducts();
  ```

---

## Phase 5: Optional Enhancements ⭐

- [ ] Add popular category endpoints
- [ ] Implement pagination for products
- [ ] Add authentication/login
- [ ] Create admin dashboard
- [ ] Set up data validation
- [ ] Add error logging
- [ ] Configure CORS for production
- [ ] Add rate limiting
- [ ] Create data backup schedule

---

## Troubleshooting 🐛

### "Cannot connect to database"
```bash
# Check MySQL is running
mysql -u root -p -e "SELECT 1;"

# Check .env credentials
cat .env
```

### "Port 3000 already in use"
```bash
# Change port in .env to 3001, 3002, etc.
# Or kill existing process (Mac/Linux):
lsof -ti:3000 | xargs kill -9
```

### "404 on API endpoints"
- [ ] Check server is running: `npm run dev`
- [ ] Check correct URL: `http://localhost:3000/api/...`
- [ ] Check request method (GET, POST, DELETE, etc.)

### "CORS errors"
- Server already has CORS enabled
- If still issues, check frontend URL matches allowed origins

---

## Useful Links

📖 **Documentation Files:**
- `DATABASE_API_SETUP.md` - Complete setup guide
- `DATABASE_COMMANDS.md` - SQL commands reference
- `DATABASE_GUIDE.md` - Feature documentation
- `DATABASE_FEATURES.md` - Search, filter, analytics features

🔗 **API Documentation:**
- `http://localhost:3000/api/health` - API status
- `http://localhost:3000/api/products` - All products
- `http://localhost:3000/api/products/:id` - Single product

💻 **Code Files:**
- `server.js` - Express backend
- `database-setup.sql` - Database schema
- `config-api.js` - API configuration & helper class
- `package.json` - Dependencies

---

## Testing Endpoints Quickly

### Using curl (Command Line)

```bash
# List all products
curl http://localhost:3000/api/products

# Get one product
curl http://localhost:3000/api/products/roadster-200

# Filter by category
curl http://localhost:3000/api/products/category/mountain

# Search for products
curl "http://localhost:3000/api/products/search/carbon"

# Add customer
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_id":1,
    "items":[{"product_id":"roadster-200","quantity":1,"unit_price":699}],
    "shipping_address":"123 Main St"
  }'
```

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new collection "Bike Sale API"
3. Add requests:
   - GET: `http://localhost:3000/api/products`
   - POST: `http://localhost:3000/api/orders`
   - GET: `http://localhost:3000/api/cart/{session_id}`
   - etc.

---

## Success Indicators ✨

When everything is working correctly, you should see:

✅ MySQL database created with all tables
✅ Server running without errors
✅ API returning JSON responses
✅ Products displaying correctly
✅ Cart functionality working
✅ Orders being created
✅ Data persisting in database

---

## Next Steps After Setup

1. **Customize Products** - Update product data for your business
2. **Add Authentication** - Implement user login
3. **Setup Payments** - Integrate payment gateway
4. **Email Notifications** - Send order confirmations
5. **Admin Dashboard** - Create management interface
6. **Analytics** - Track sales and customer data
7. **Deployment** - Move to production server

---

## Support Resources

- **Error Messages** - Check `DATABASE_COMMANDS.md` troubleshooting section
- **API Reference** - See `DATABASE_API_SETUP.md` endpoints section
- **Database Queries** - Review `DATABASE_COMMANDS.md` SQL examples
- **Code Examples** - Check `config-api.js` usage section

---

**Time to Complete:** ~15-20 minutes ⏱️
**Difficulty Level:** Beginner-friendly 🟢

Happy coding! 🎉
