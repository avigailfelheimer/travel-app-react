import express from 'express';
import {
    postReview,
    getReviews,
    putReview,
    deleteReview
} from '../controller/ReviewController.js';
import { authenticateToken, authorizeReviewModification } from '../middleWare/authMiddleware.js';

const router = express.Router();

/**
 * POST /places/:placeId/reviews
 * הוספת תגובה חדשה - דורש אימות
 */
router.post('/:placeId/reviews', authenticateToken, postReview);

/**
 * GET /places/:placeId/reviews
 * קבלת כל התגובות לפלייס - לא דורש אימות
 */
router.get('/:placeId/reviews', getReviews);

/**
 * PUT /places/:placeId/reviews/:reviewId
 * עדכון תגובה - דורש אימות + הרשאות
 */
router.put('/:placeId/reviews/:reviewId', authenticateToken, authorizeReviewModification, putReview);

/**
 * DELETE /places/:placeId/reviews/:reviewId
 * מחיקת תגובה - דורש אימות + הרשאות
 */
router.delete('/:placeId/reviews/:reviewId', authenticateToken, authorizeReviewModification, deleteReview);

export default router;
