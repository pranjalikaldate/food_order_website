# Vijay Thapa Restaurant — Complete Food Order Website

Full-stack food ordering site: HTML5/CSS3 static frontend + PHP/MySQL backend, with customer accounts, demo payment, order tracking, and an admin panel with image upload.

## New in this version
- **Customer login/signup** — required before placing an order
- **Demo payment page** — mock card form (clearly labeled as a demo; no real gateway, no card details stored)
- **Order tracking** — customers look up any Order ID to see delivery status
- **Admin panel** (`/admin/`) — login-protected
  - View all orders, update delivery status (Pending → Preparing → Out for Delivery → Delivered)
  - Add new food items with image upload (saves straight into `/images/`)

## Setup

### 1. Copy the folder
Copy `foodorder3` into `C:\xampp\htdocs\` (or your `htdocs`/`www` folder).

### 2. Run the database migration
Your existing `fdo` database already has `categories`, `foods`, `orders`, `contacts`. This version adds `users`, `admins`, and a few new columns on `orders`.

In phpMyAdmin:
1. Select the `fdo` database
2. Go to **SQL** tab
3. Paste the contents of `sql/upgrade.sql` and click **Go**

(If you get "Duplicate column" errors on re-running, it just means it's already applied — safe to ignore.)

### 3. Visit the site
`http://localhost/foodorder3/index.html`

### 4. Admin login
`http://localhost/foodorder3/admin/login.html`
- Default admin account is auto-created on first login attempt: **username: admin / password: admin123**
- Change this password directly in the `admins` table via phpMyAdmin if you want (note the app hashes passwords with PHP's `password_hash`, so don't paste plain text there — easiest is to delete the row and let it re-seed, or ask me to add a "change password" screen).

## How the customer flow works now
1. Browse menu -> click **Order Now**
2. If not logged in, redirected to **Login** (or **Register** if new)
3. Fill delivery details -> **Proceed to Payment**
4. Demo payment screen -> **Pay Now** (simulated, always "succeeds")
5. Order is saved to the database -> confirmation page shows the **Order ID**
6. Customer can revisit **Track Order** anytime with that ID to see status

## Folder structure
```
foodorder3/
├── index.html, categories.html, food-search.html
├── order.html, payment.html, order-confirmation.html, track-order.html
├── login.html, register.html
├── contact.html
├── css/style.css
├── js/                      (all frontend fetch logic)
├── images/                  (menu images + admin-uploaded images land here)
├── api/                     (all PHP + MySQL code)
│   ├── config.php
│   ├── categories.php, foods.php, food.php
│   ├── register.php, login.php, logout.php, session-check.php
│   ├── order.php, track-order.php, contact.php
│   ├── admin-login.php, admin-logout.php, admin-session-check.php
│   ├── admin-orders.php, update-order-status.php, add-food.php
├── admin/
│   ├── login.html, dashboard.html, orders.html, add-food.html
│   └── js/
└── sql/database.sql, sql/upgrade.sql
```

## Things worth knowing (still simplified for a student/portfolio project)
- Payment is a **demo only** — no real gateway is connected, since that requires your own merchant account and API keys (Razorpay, Stripe, etc.). If you get one, I can wire it in.
- No password reset / "forgot password" flow yet.
- Admin panel protection is session-based (fine for local/dev use); for a real deployment you'd want HTTPS and stronger session handling.
- Uploaded images need the `images/` folder to be writable by the web server — this is the default on XAMPP, no extra setup needed.
"# food_order_website" 
