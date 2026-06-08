import pool from '../config/db.js';

/**
 * הוספת תגובה חדשה לפלייס
 */
export const createReview = async (userId, placeId, rating, comment) => {
    const [result] = await pool.query(
        `INSERT INTO reviews (user_id, place_id, rating, comment)
         VALUES (?, ?, ?, ?)`,
        [userId, placeId, rating, comment || null]
    );
    return {
        review_id: result.insertId,
        user_id: userId,
        place_id: placeId,
        rating,
        comment: comment || null,
        created_at: new Date()
    };
};

/**
 * קבלת כל התגובות לפלייס
 */
export const getReviewsByPlaceId = async (placeId) => {
    const [rows] = await pool.query(
        `SELECT r.review_id, r.user_id, r.place_id, r.rating, r.comment, 
                r.created_at, u.username
         FROM reviews r
         LEFT JOIN users u ON r.user_id = u.user_id
         WHERE r.place_id = ?
         ORDER BY r.created_at DESC`,
        [placeId]
    );
    return rows;
};

/**
 * קבלת תגובה ספציפית לפי ID
 */
export const getReviewById = async (reviewId) => {
    const [rows] = await pool.query(
        `SELECT r.review_id, r.user_id, r.place_id, r.rating, r.comment, 
                r.created_at, u.username
         FROM reviews r
         LEFT JOIN users u ON r.user_id = u.user_id
         WHERE r.review_id = ?`,
        [reviewId]
    );
    return rows[0] || null;
};

/**
 * עדכון תגובה קיימת
 */
export const updateReview = async (reviewId, rating, comment) => {
    const [result] = await pool.query(
        `UPDATE reviews
         SET rating = ?, comment = ?
         WHERE review_id = ?`,
        [rating, comment || null, reviewId]
    );
    return result.affectedRows > 0;
};

/**
 * מחיקת תגובה
 */
export const deleteReview = async (reviewId) => {
    const [result] = await pool.query(
        `DELETE FROM reviews
         WHERE review_id = ?`,
        [reviewId]
    );
    return result.affectedRows > 0;
};
