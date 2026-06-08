import { addReview, getPlaceReviews, editReview, removeReview } from '../services/ReviewService.js';
import { RATING_REQUIRED, RATING_MUST_BE_NUMBER } from '../const/errorConst.js';

/**
 * POST /places/:placeId/reviews
 * הוספת תגובה חדשה לפלייס
 */
export const postReview = async (req, res) => {
    try {
        const placeId = req.params.placeId || req.params.id;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        if (rating === undefined || rating === null) {
            return res.status(RATING_REQUIRED.status).json({ error: RATING_REQUIRED.message });
        }

        const numericRating = Number(rating);
        if (isNaN(numericRating)) {
            return res.status(RATING_MUST_BE_NUMBER.status).json({ error: RATING_MUST_BE_NUMBER.message });
        }

        const newReview = await addReview(userId, placeId, numericRating, comment);
        res.status(201).json(newReview);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * GET /places/:placeId/reviews  OR  GET /places/:id/reviews
 * קבלת כל התגובות לפלייס — ציבורי, ללא צורך באימות
 */
export const getReviews = async (req, res) => {
    try {
        const placeId = req.params.placeId || req.params.id;
        const reviews = await getPlaceReviews(placeId);
        res.status(200).json(reviews);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * PUT /places/:placeId/reviews/:reviewId
 * עדכון תגובה קיימת — user_id נלקח מהטוקן, לא מה-body
 */
export const putReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;

        if (rating === undefined || rating === null) {
            return res.status(RATING_REQUIRED.status).json({ error: RATING_REQUIRED.message });
        }

        const numericRating = Number(rating);
        if (isNaN(numericRating)) {
            return res.status(RATING_MUST_BE_NUMBER.status).json({ error: RATING_MUST_BE_NUMBER.message });
        }

        await editReview(reviewId, numericRating, comment);
        res.status(200).json({ success: true, message: 'Review updated successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * DELETE /places/:placeId/reviews/:reviewId
 * מחיקת תגובה — user_id נלקח מהטוקן, לא מה-body
 */
export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        await removeReview(reviewId);
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
