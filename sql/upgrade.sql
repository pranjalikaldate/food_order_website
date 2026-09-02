USE fdo;

-- Customer accounts
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Admin accounts (a default admin/admin123 is auto-created on first admin login attempt)
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Add order tracking columns (run these once; if you re-run and get
-- "Duplicate column" errors, it just means they're already added)
ALTER TABLE orders ADD COLUMN user_id INT NULL AFTER food_id;
ALTER TABLE orders ADD COLUMN status VARCHAR(30) NOT NULL DEFAULT 'Pending' AFTER address;
ALTER TABLE orders ADD COLUMN payment_status VARCHAR(20) NOT NULL DEFAULT 'Paid' AFTER status;
