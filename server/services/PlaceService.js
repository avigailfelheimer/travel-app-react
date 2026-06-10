import { createPlace, fetchPlaces, getPlaceById, updatePlace, deletePlace } from '../models/PlaceModel.js';

const MAX_LIMIT     = 50;
const DEFAULT_LIMIT = 50;

// ימים תקינים ל-opening_hours
const VALID_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const addPlace = async (userId, name, description, categories, latitude, longitude, openingHours) => {
    return await createPlace(userId, name, description, categories, latitude, longitude, openingHours);
};

export const getPlace = async (placeId) => {
    return await getPlaceById(placeId);
};

export const editPlace = async (placeId, name, description, categories, latitude, longitude, openingHours) => {
    return await updatePlace(placeId, name, description, categories, latitude, longitude, openingHours);
};

export const removePlace = async (placeId) => {
    return await deletePlace(placeId);
};

/**
 * שליפת מקומות עם סינון מתקדם
 *
 * query params נתמכים:
 *   page, limit     — pagination
 *   search          — חיפוש חופשי בשם/תיאור
 *   category        — סינון לפי קטגוריה אחת (JSON_CONTAINS על מערך categories)
 *   open_on         — יום (sun/mon/...) — מחזיר רק מקומות שפתוחים באותו יום
 */
export const getPlaces = async ({ page = 1, limit = DEFAULT_LIMIT, search = '', category = '', open_on = '' } = {}) => {

    // --- pagination ---
    const safePage  = Math.max(1, parseInt(page)  || 1);
    const safeLimit = Math.min(MAX_LIMIT, Math.max(1, parseInt(limit) || DEFAULT_LIMIT));
    const offset    = (safePage - 1) * safeLimit;

    // --- בניית תנאי סינון ---
    const conditions = [];
    const params     = [];

    if (search?.trim()) {
        conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
        params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    // סינון לפי קטגוריה — JSON_CONTAINS בודק אם המערך מכיל את הערך
    if (category?.trim()) {
        conditions.push('JSON_CONTAINS(p.categories, ?, \'$\')');
        params.push(JSON.stringify(category.trim()));  // חייב להיות "\"bar\"" ולא "bar"
    }

    // סינון לפי יום פתיחה
    if (open_on?.trim() && VALID_DAYS.includes(open_on.trim().toLowerCase())) {
        const day = open_on.trim().toLowerCase();
        conditions.push(`JSON_UNQUOTE(JSON_EXTRACT(p.opening_hours, '$.${day}')) IS NOT NULL`);
        conditions.push(`JSON_UNQUOTE(JSON_EXTRACT(p.opening_hours, '$.${day}')) != 'closed'`);
    }

    // --- שליפה מהמודל ---
    const { places, total } = await fetchPlaces(conditions, params, safeLimit, offset);

    return {
        places,
        total,
        page:       safePage,
        limit:      safeLimit,
        totalPages: Math.ceil(total / safeLimit),
    };
};
