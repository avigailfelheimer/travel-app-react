import { addPlace, getPlaces, getPlace, editPlace, removePlace } from '../services/PlaceService.js';
import { NAME_CATEGORY_REQUIRED, PLACE_UPDATE_FAILED, PLACE_NOT_FOUND } from '../const/errorConst.js';

// POST /places — הוספת place חדש
export const postPlace = async (req, res) => {
    try {
        const { name, description, category, latitude, longitude, opening_hours } = req.body;

        if (!name || !category) {
            return res.status(NAME_CATEGORY_REQUIRED.status).json({ error: NAME_CATEGORY_REQUIRED.message });
        }

        const newPlace = await addPlace(req.user.id, name, description, category, latitude, longitude, opening_hours);
        res.status(201).json(newPlace);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// GET /places — שליפת כל הפוסטים (ציבורי)
export const fetchPlaces = async (req, res) => {
    try {
        const { page, limit, search, category, open_on } = req.query;
        const result = await getPlaces({ page, limit, search, category, open_on });
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /places/:id — שליפת place בודד (ציבורי)
export const fetchPlaceById = async (req, res) => {
    try {
        const { id } = req.params;
        const place = await getPlace(id);
        if (!place) {
            return res.status(PLACE_NOT_FOUND.status).json({ error: PLACE_NOT_FOUND.message });
        }
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT /places/:id — עדכון place
export const putPlace = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, latitude, longitude, opening_hours } = req.body;

        if (!name || !category) {
            return res.status(NAME_CATEGORY_REQUIRED.status).json({ error: NAME_CATEGORY_REQUIRED.message });
        }

        const updated = await editPlace(id, name, description, category, latitude, longitude, opening_hours);
        if (!updated) {
            return res.status(PLACE_UPDATE_FAILED.status).json({ error: PLACE_UPDATE_FAILED.message });
        }

        res.status(200).json({ success: true, message: 'Place updated successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

// DELETE /places/:id — מחיקת place
export const deletePlace = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await removePlace(id);
        if (!deleted) {
            return res.status(PLACE_NOT_FOUND.status).json({ error: PLACE_NOT_FOUND.message });
        }

        res.status(200).json({ success: true, message: 'Place deleted successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
