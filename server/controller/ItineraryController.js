import {
    getItinerary,
    addPlace,
    removePlace,
    reorderPlaces
} from '../services/ItineraryService.js';

/**
 * GET /itinerary
 * שליפת המסלול האישי של המשתמש המחובר
 */
export const fetchItinerary = async (req, res) => {
    try {
        const itinerary = await getItinerary(req.user.id);
        res.status(200).json(itinerary);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * POST /itinerary
 * הוספת מקום למסלול — { place_id } בגוף הבקשה
 */
export const postItineraryPlace = async (req, res) => {
    try {
        const { place_id } = req.body;

        if (!place_id) {
            return res.status(400).json({ error: 'place_id is required' });
        }

        const entry = await addPlace(req.user.id, place_id);
        res.status(201).json(entry);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * DELETE /itinerary/:favoriteId
 * הסרת מקום מהמסלול לפי favorite_id
 */
export const deleteItineraryPlace = async (req, res) => {
    try {
        const { favoriteId } = req.params;

        await removePlace(req.user.id, Number(favoriteId));
        res.status(200).json({ success: true, message: 'Place removed from itinerary' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * PUT /itinerary/reorder
 * עדכון סדר המסלול — { entries: [{ favorite_id, order_index }, ...] } בגוף הבקשה
 */
export const putItineraryOrder = async (req, res) => {
    try {
        const { entries } = req.body;

        if (!Array.isArray(entries) || entries.length === 0) {
            return res.status(400).json({ error: 'entries must be a non-empty array' });
        }

        for (const entry of entries) {
            if (entry.favorite_id === undefined || entry.order_index === undefined) {
                return res.status(400).json({ error: 'Each entry must have favorite_id and order_index' });
            }
        }

        await reorderPlaces(req.user.id, entries);
        res.status(200).json({ success: true, message: 'Itinerary reordered successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
