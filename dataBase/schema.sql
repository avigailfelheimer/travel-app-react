CREATE DATABASE IF NOT EXISTS travel_app;
USE travel_app;

----------------------------------------------------
-- DROP TABLES (איפוס מסד נתונים)
----------------------------------------------------
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS places;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

----------------------------------------------------
-- CREATE TABLES
----------------------------------------------------
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('regular', 'business', 'admin'))
);

CREATE TABLE credentials (
    user_id INT PRIMARY KEY REFERENCES users(user_id) ON DELETE CASCADE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE payment_methods (
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    card_holder_name VARCHAR(100) NOT NULL,
    card_last4 CHAR(4) NOT NULL,
    expiry_month INT NOT NULL,
    expiry_year INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    created_by INT REFERENCES users(user_id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    categories JSON NOT NULL,    -- ["bar", "restaurant", "outdoor"] — מערך קטגוריות
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    opening_hours JSON,          -- { "sun": "09:00-22:00", "mon": "closed", ... }
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    business_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    place_id INT NOT NULL REFERENCES places(place_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    payment_method_id INT REFERENCES payment_methods(payment_method_id),
    amount DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(20) NOT NULL CHECK (payment_status IN ('pending', 'completed', 'failed')),
    paid_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    place_id INT NOT NULL REFERENCES places(place_id) ON DELETE CASCADE,
    order_index INT NOT NULL DEFAULT 0,   -- סדר המקומות במסלול האישי של המשתמש
    UNIQUE(user_id, place_id)
);

CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    place_id INT NOT NULL REFERENCES places(place_id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media (
    media_id INT AUTO_INCREMENT PRIMARY KEY,
    place_id INT REFERENCES places(place_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video', 'audio')),
    media_url VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
