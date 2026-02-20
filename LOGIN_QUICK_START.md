# 🔐 Login System - Quick Start

Complete setup in 5 minutes!

---

## ✅ Quick Setup Checklist

- [ ] **Step 1:** Run database setup
  ```bash
  mysql -u root -p < database-setup.sql
  ```

- [ ] **Step 2:** Install dependencies
  ```bash
  npm install bcryptjs jsonwebtoken
  ```

- [ ] **Step 3:** Create `.env` file from `.env.example`
  ```bash
  # Copy .env.example to .env
  # Update if needed
  ```

- [ ] **Step 4:** Start server
  ```bash
  npm run dev
  ```

- [ ] **Step 5:** Test it!
  - Open: http://localhost:3000/login.html
  - Use demo account: john@example.com / password123

---

## 📋 Files Created/Updated

### New Files
- ✅ `login.html` - Beautiful login & register page
- ✅ `auth.js` - Frontend authentication helper
- ✅ `AUTHENTICATION_GUIDE.md` - Complete documentation

### Updated Files
- ✅ `server.js` - Added auth endpoints
- ✅ `database-setup.sql` - Added users table
- ✅ `package.json` - Added bcryptjs, jsonwebtoken
- ✅ `.env.example` - Added JWT_SECRET

---

## 🚀 Key Features

### For Users
- Create account with email & password
- Login with remember me option
- Demo account buttons for quick testing
- Forgot password link (ready to implement)
- Input validation and error messages

### For Developers
- JWT token authentication
- Password hashing with bcryptjs
- Token verification middleware
- Protected API endpoints
- User session management
- Logout functionality

---

## 🎯 Demo Accounts

Test with these pre-loaded accounts:

```
Email: john@example.com
Password: password123
Name: John Doe

Email: jane@example.com
Password: password123
Name: Jane Smith

Email: bob@example.com
Password: password123
Name: Bob Johnson
```

**⚠️ Change these passwords after setting up!**

---

## 💻 Protect Your Pages

Add this to any page that requires authentication:

```html
<script src="auth.js"></script>
<script>
  AUTH.requireLogin();
</script>
```

Or check manually:

```html
<script>
  if (!localStorage.getItem('token')) {
    window.location.href = 'login.html';
  }
</script>
```

---

## 🔌 API Endpoints

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Verify Token
```bash
GET /api/auth/verify
Authorization: Bearer YOUR_TOKEN
```

---

## 📱 Frontend Usage

### In JavaScript

```javascript
// Login
const user = await AUTH.login('john@example.com', 'password123');
console.log('Hello', user.first_name);

// Check if logged in
if (AUTH.isLoggedIn()) {
  console.log('User is logged in');
}

// Get current user
const user = AUTH.getUser();
console.log(user.email);

// Logout
await AUTH.logout();

// Make authenticated API call
const orders = await AUTH.apiCall('/orders/customer/1');
```

---

## 🧪 Quick Test

### Test Login with curl

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Test Protected Endpoint

Use the token from login response:

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl http://localhost:3000/api/auth/verify \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🎨 Customize Login Page

The login.html is fully customizable:

### Change Colors
In `login.html`, find the style section and update:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Header Text
```html
<h1>🚴 Bike Sale</h1>
<p>Welcome to your cycling community</p>
```

### Add Logo
```html
<img src="images/logo.png" alt="Logo" style="height: 50px; margin-bottom: 10px;">
```

### Customize Demo Buttons
```html
<button type="button" class="demo-btn" onclick="demoLogin('email@example.com', 'password')">
  👤 Your Demo
</button>
```

---

## 🔒 Security Notes

✅ **Already Implemented:**
- Password hashing (bcryptjs)
- Password validation (min 6 chars)
- Email uniqueness constraint
- JWT token expiration (24 hours)
- CORS protection
- Account active status check

⚠️ **For Production:**
- Change JWT_SECRET in .env
- Use HTTPS only
- Add rate limiting
- Implement email verification
- Add password reset email
- Monitor failed login attempts
- Use environment-specific secrets
- Add two-factor authentication
- Implement session timeout

---

## 🐛 Troubleshooting

### "Cannot GET /login.html"
- File not found
- Make sure login.html is in project root
- Refresh browser cache

### "Login failed" error
- Check server is running: `npm run dev`
- Verify database has users table
- Check password is correct (case sensitive)

### "Token invalid" error
- Token expired (24 hours)
- JWT_SECRET changed
- User needs to login again

### "Email already registered"
- Account exists with that email
- Use different email or password reset

---

## 📚 Next Steps

### Immediate
1. ✅ Test login with demo accounts
2. ✅ Try creating a new account
3. ✅ Test logout

### Short Term
4. ✅ Add auth.js to your existing pages
5. ✅ Protect pages that need authentication
6. ✅ Add user display in navigation
7. ✅ Test API endpoints with token

### Medium Term
8. ✅ Implement password reset
9. ✅ Add email verification
10. ✅ Enable two-factor auth
11. ✅ Add user profile page

### Long Term
12. ✅ Configure for production
13. ✅ Set up HTTPS
14. ✅ Add security audit logging
15. ✅ Implement backup & recovery

---

## 📖 Full Documentation

See **AUTHENTICATION_GUIDE.md** for:
- Complete API reference
- Advanced usage examples
- Database schema
- Security best practices
- Troubleshooting guide

---

## 🎉 You're All Set!

Your Bike Sale app now has a complete authentication system!

```
Before:   Landing page → Products → Cart → Checkout
After:    Login page → Landing page → Products → Cart → Checkout
```

**Happy coding! 🚀**
