import pool from '../config/db.js';

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        `SELECT user_id AS id, username, email, user_type AS role
         FROM users
         WHERE email = ?`,
        [email]
    );
    return rows[0] || null;
};

export const create = async (username, email) => {
    const [result] = await pool.query(
        `INSERT INTO users (username, email, user_type)
         VALUES (?, ?, 'regular')`,
        [username, email]
    );
    return {
        id: result.insertId,
        username,
        email,
        role: 'regular'
    };
};