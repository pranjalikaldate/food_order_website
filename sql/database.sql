-- =========================================================
-- Vijay Thapa Restaurant - Database Schema
-- Import this file in phpMyAdmin (or `mysql -u root -p < database.sql`)
-- =========================================================

CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

-- ---------------------------------------------------------
-- Categories (Pizza, Burger Combo, Steamed Momo, etc.)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- ---------------------------------------------------------
-- Foods (the menu items already on food-search.html / index.html)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS foods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(150) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ---------------------------------------------------------
-- Orders (submitted from order.html form)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    food_id INT,
    quantity INT NOT NULL DEFAULT 1,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- ---------------------------------------------------------
-- Contact messages (from contact.html form)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- Seed data -- EXACTLY the categories/foods already present
-- in your uploaded categories.html / food-search.html / index.html
-- (image filenames kept as-is; drop your actual image files
-- into /images/ with these same names)
-- =========================================================

INSERT INTO categories (name, image) VALUES
('Pizza', 'pizza_1.jpg'),
('Burger Combo', 'b_2.jpg'),
('Steamed_Momo', 'momo_1.jpg'),
('Cheesy Pizza', 'pizza_2.jpg'),
('cheese Burger', 'burger.jpg'),
('Cheese momos', 'menu_momos.jpg'),
('Chicken Pizza', 'menu_pizza.jpg'),
('Burger Bliss', 'b_3.jpg'),
('Fried Momo', 'momo_1.jpg'),
('Cheesy Drip', 'pizza_4.jpg'),
('Royal Burger', 'b_4.jpg'),
('Momo Platter', 'momo1.jpg');

INSERT INTO foods (category_id, name, price, description, image) VALUES
(1, 'chicken Pizza', 400.00, 'Made with Italian Sauce, Chicken, and organic vegetables!!', 'pizza.jpg'),
(3, 'Paneer Fried Momos', 300.00, 'Crispy outside, soft paneer filling inside – a perfect snack delight!!', 'momo_1.jpg'),
(2, 'Burger', 200.00, 'Soft bun, crispy patty, and rich sauces in every bite!!', 'burger.jpg'),
(4, 'Cheesy Pizza', 350.00, 'Extra cheesy, perfectly baked, and irresistibly delicious in every bite!!', 'pizza_2.jpg'),
(3, 'Steamed Momos', 200.00, 'Perfectly steamed dumplings with a juicy and flavorful filling!!', 'momos.jpg'),
(2, 'Smoky Burger', 250.00, 'Smoky, juicy, and perfectly grilled for a bold burger taste!!', 'burger_1.jpg');
