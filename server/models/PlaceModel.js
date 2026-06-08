import pool from '../config/db.js';

// יצירת place רגיל
export const createPlace = async (userId, name, description, category, latitude, longitude, openingHours) => {
    const [result] = await pool.query(
        `INSERT INTO places (created_by, name, description, category, latitude, longitude, opening_hours, is_approved)
         VALUES (?, ?, ?, ?, ?, ?, ?, FALSE)`,
        [userId, name, description, category, latitude, longitude, openingHours ? JSON.stringify(openingHours) : null]
    );
    return {
        place_id: result.insertId,
        created_by: userId,
        name,
        description,
        category,
        latitude,
        longitude,
        opening_hours: openingHours || null,
        is_approved: false
    };
};

// שליפת place יחיד לפי ID — כולל created_by
export const getPlaceById = async (placeId) => {
    const [rows] = await pool.query(
        `SELECT place_id, created_by, name, description, category, latitude, longitude, opening_hours, is_approved
         FROM places
         WHERE place_id = ?`,
        [placeId]
    );
    return rows[0] || null;
};

// עדכון place
export const updatePlace = async (placeId, name, description, category, latitude, longitude, openingHours) => {
    const [result] = await pool.query(
        `UPDATE places
         SET name = ?, description = ?, category = ?, latitude = ?, longitude = ?, opening_hours = ?
         WHERE place_id = ?`,
        [name, description, category, latitude, longitude, openingHours ? JSON.stringify(openingHours) : null, placeId]
    );
    return result.affectedRows > 0;
};

// מחיקת place
export const deletePlace = async (placeId) => {
    const [result] = await pool.query(
        `DELETE FROM places
         WHERE place_id = ?`,
        [placeId]
    );
    return result.affectedRows > 0;
};

export const fetchPlaces = async (conditions = [], params = [], limit, offset) => {
    const WHERE = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [[{ total }]] = await pool.query(
        `SELECT COUNT(*) AS total FROM places p ${WHERE}`,
        params
    );

    const [places] = await pool.query(
        `SELECT
            p.place_id,
            p.name,
            p.description,
            p.category,
            p.latitude,
            p.longitude,
            p.opening_hours,
            p.is_approved,
            u.username AS created_by_username,
            u.user_id  AS created_by_id
         FROM places p
         LEFT JOIN users u ON p.created_by = u.user_id
         ${WHERE}
         ORDER BY p.place_id DESC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    return { places, total };
};
