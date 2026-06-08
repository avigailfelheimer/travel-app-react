---------------------------------------------------
-- INSERT DATA
----------------------------------------------------
INSERT INTO users (user_id, username, email, user_type) VALUES
(1, 'admin', 'admin@test.com', 'admin'),
(2, 'business_user', 'biz@test.com', 'business'),
(3, 'regular_user', 'user@test.com', 'regular');

INSERT INTO credentials (user_id, password_hash) VALUES
(1, 'hashed_password_admin'),
(2, 'hashed_password_business'),
(3, 'hashed_password_user');

INSERT INTO payment_methods (payment_method_id, user_id, card_holder_name, card_last4, expiry_month, expiry_year) VALUES
(1, 2, 'Business Owner', '1234', 12, 2028);

INSERT INTO places (place_id, name, description, category, latitude, longitude, is_approved) VALUES
(1, 'Beach Bar', 'A fun beach bar with music and drinks', 'bar', 32.0853, 34.7818, TRUE),
(2, 'City Museum', 'Modern art and history museum', 'museum', 32.0809, 34.7806, TRUE);

INSERT INTO events (event_id, business_id, place_id, title, description, event_date, start_date, end_date, is_active) VALUES
(1, 2, 1, 'Summer Party', 'DJ night at the beach bar', '2026-07-15 20:00:00', '2026-07-01 00:00:00', '2026-07-15 23:59:00', TRUE),
(2, 2, 2, 'Art Night', 'Evening of modern art exhibitions', '2026-07-20 19:00:00', '2026-07-05 00:00:00', '2026-07-20 23:59:00', TRUE);

INSERT INTO payments (payment_id, event_id, payment_method_id, amount, payment_status, paid_at) VALUES
(1, 1, 1, 50.00, 'completed', CURRENT_TIMESTAMP),
(2, 2, 1, 70.00, 'completed', CURRENT_TIMESTAMP);

INSERT INTO favorites (favorite_id, user_id, place_id) VALUES
(1, 3, 1);

INSERT INTO reviews (review_id, user_id, place_id, rating, comment) VALUES
(1, 3, 1, 5, 'Amazing place, great vibe!');

INSERT INTO media (media_id, place_id, user_id, media_type, media_url) VALUES
(1, 1, 3, 'image', 'https://example.com/image1.jpg');