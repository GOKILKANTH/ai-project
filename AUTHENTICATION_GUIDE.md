# Authentication System Guide

## 🔐 Login & Register System

Your Bike Sale app now has a full authentication system with login, registration, and JWT-based session management.

---

## 🚀 Getting Started

### Step 1: Update Dependencies

Add the new authentication packages:

```bash
npm install bcryptjs jsonwebtoken
```

### Step 2: Update `.env` File

Add JWT secret (change in production!):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=bike_sale_db
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### Step 3: Run Database Setup

Make sure users table is created:

```bash
mysql -u root -p < database-setup.sql
```

### Step 4: Start the Server

```bash
npm run dev
```

---

## 📄 Login Page Features

### Location
- **File:** `login.html`
- **Access:** Visit `/login.html` or as entry point before home page

### Features

✅ **Login Form**
- Email + Password authentication
- Demo account buttons
- Remember me checkbox
- Forgot password link

✅ **Registration Form**
- First name, last name
- Email validation
- Password confirmation
- Terms agreement

✅ **Error Handling**
- Display validation errors
- Show success messages
- Auto-hide notifications

✅ **Session Management**
- Store JWT token
- Save user info
- Auto-redirect to dashboard

---

## 🔌 Authentication API Endpoints

### Register User

**POST** `/api/auth/register`

Request:
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

Response:
```json
{
  "id": 4,
  "email": "newuser@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "message": "User registered successfully"
}
```

### Login User

**POST** `/api/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "passwordhere"
}
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Verify Token

**GET** `/api/auth/verify`

Headers:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

Response:
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Logout

**POST** `/api/auth/logout`

Response:
```json
{
  "message": "Logged out successfully"
}
```

---

## 🎯 Demo Accounts

Pre-loaded demo accounts for testing:

| Email | Password | Name |
|-------|----------|------|
| john@example.com | password123 | John Doe |
| jane@example.com | password123 | Jane Smith |
| bob@example.com | password123 | Bob Johnson |

**Note:** Update these password hashes in the database after setup!

---

## 💻 Frontend Integration

### Check if User is Logged In

```javascript
// Check for token
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

if (!token) {
  // Redirect to login
  window.location.href = 'login.html';
} else {
  console.log('Welcome back, ' + user.first_name);
}
```

### Make Authenticated API Calls

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/orders', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Create User Class Helper

```javascript
class Auth {
  static getToken() {
    return localStorage.getItem('token');
  }

  static getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  static isLoggedIn() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }

  static async verifyToken() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await fetch('http://localhost:3000/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Usage
if (!Auth.isLoggedIn()) {
  window.location.href = 'login.html';
}

// Get current user
const user = Auth.getUser();
console.log(`Hello ${user.first_name}`);

// Logout
Auth.logout();
```

---

## 🔒 Protecting Routes

### Create Protected Page

Create a middleware to check authentication on each page:

```html
<!-- In HTML head -->
<script>
  // Check authentication before loading page
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
</script>
```

### Protected Products Page Example

```javascript
// products.html - Protected page
document.addEventListener('DOMContentLoaded', async () => {
  // Verify token is valid
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Verify token with server
  try {
    const response = await fetch('http://localhost:3000/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = 'login.html';
      return;
    }

    // Token is valid, load page content
    loadProducts();
  } catch (error) {
    console.error('Auth error:', error);
    window.location.href = 'login.html';
  }
});
```

---

## 🛡️ Security Features

### Already Implemented

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Token expiration (24 hours)
- ✅ CORS protection
- ✅ Input validation
- ✅ Account active status check
- ✅ Email uniqueness enforcement
- ✅ Password minimum length (6 characters)

### Recommended for Production

- [ ] Use HTTPS only
- [ ] Implement refresh tokens
- [ ] Add rate limiting on auth endpoints
- [ ] Add email verification
- [ ] Implement password reset flow
- [ ] Add two-factor authentication
- [ ] Store JWT secret in secure vault
- [ ] Add request logging
- [ ] Implement session timeout
- [ ] Add CSRF protection

---

## 🧪 Testing Authentication

### Test Registration

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "testpass123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Protected Endpoint

```bash
# Get the token from login response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔄 User Flow

### Registration Flow

```
User visits login.html
    ↓
Clicks "Create one" link
    ↓
Fills registration form
    ↓
API creates user with hashed password
    ↓
Success message shown
    ↓
User clicks "Sign in"
    ↓
Logs in with new credentials
```

### Login Flow

```
User navigates to login.html
    ↓
Fills email and password
    ↓
Server verifies credentials
    ↓
Server generates JWT token
    ↓
Token stored in localStorage
    ↓
User data stored in localStorage
    ↓
Redirect to index.html
    ↓
Page checks token is valid
    ↓
Content loads
```

### Logout Flow

```
User clicks logout button
    ↓
removeItem('token')
    ↓
removeItem('user')
    ↓
Redirect to login.html
```

---

## 📝 Update Existing Pages

Add authentication check to your existing pages:

### In `index.html`, `products.html`, `about.html`, `contact.html`

Add this in the `<head>` or at top of body:

```html
<script>
  // Redirect to login if not authenticated
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
</script>
```

### Update Navigation

Add logout button to header:

```html
<nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="products.html">Products</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
    <li>
      <span id="userEmail"></span>
      <button onclick="logout()">Logout</button>
    </li>
  </ul>
</nav>

<script>
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  document.getElementById('userEmail').textContent = user.email || 'Guest';

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
</script>
```

---

## 🐛 Troubleshooting

### "Token invalid or expired"
- Token may be expired (24 hours)
- User needs to login again
- Check JWT_SECRET matches in .env

### "Email already registered"
- Email already exists in database
- Use different email or reset database

### "Password must be at least 6 characters"
- Password too short
- Use password with 6+ characters

### "CORS error"
- Ensure CORS is enabled in server.js (already configured)
- Check origin is in allowed list

### Passwords not hashing
- Ensure bcryptjs is installed: `npm install bcryptjs`
- Restart server after installation

---

## 📚 Database Schema

### Users Table

```sql
CREATE TABLE users (
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
```

---

## 🎉 Next Steps

1. ✅ Run database setup with users table
2. ✅ Install new packages: `npm install`
3. ✅ Update .env with JWT_SECRET
4. ✅ Start server: `npm run dev`
5. ✅ Visit login.html to test
6. ✅ Use demo accounts to login
7. ✅ Add authentication checks to existing pages
8. ✅ Implement logout functionality
9. ✅ Test API endpoints with tokens
10. ✅ Configure for production

---

## 📞 Support

For issues:
1. Check server logs: `npm run dev`
2. Verify .env file has JWT_SECRET
3. Check users table exists: `SELECT * FROM users;`
4. Verify password hashing works
5. Check CORS is enabled
6. Review browser console for errors

Happy authenticating! 🔐
