import {
    createReview,
    getReviewsByPlaceId,
    getReviewById,
    updateReview,
    deleteReview
} from '../models/ReviewModel.js';

/**
 * הוספת תגובה חדשה
 */
export const addReview = async (userId, placeId, rating, comment) => {
    // בדיקה שהדירוג בין 1-5
    if (rating < 1 || rating > 5) {
        const error = new Error('Rating must be between 1 and 5');
        error.status = 400;
        throw error;
    }

    return await createReview(userId, placeId, rating, comment);
};

/**
 * קבלת כל התגובות לפלייס
 */
export const getPlaceReviews = async (placeId) => {
    return await getReviewsByPlaceId(placeId);
};

/**
 * עדכון תגובה קיימת (עם בדיקות)
 */
export const editReview = async (reviewId, rating, comment) => {
    // קבלת התגובה הקיימת
    const review = await getReviewById(reviewId);
    if (!review) {
        const error = new Error('Review not found');
        error.status = 404;
        throw error;
    }

    // בדיקה שהדירוג בין 1-5
    if (rating < 1 || rating > 5) {
        const error = new Error('Rating must be between 1 and 5');
        error.status = 400;
        throw error;
    }

    const success = await updateReview(reviewId, rating, comment);
    if (!success) {
        const error = new Error('Failed to update review');
        error.status = 500;
        throw error;
    }

    return true;
};

/**
 * מחיקת תגובה (עם בדיקות)
 */
export const removeReview = async (reviewId) => {
    // בדיקה שהתגובה קיימת
    const review = await getReviewById(reviewId);
    if (!review) {
        const error = new Error('Review not found');
        error.status = 404;
        throw error;
    }

    const success = await deleteReview(reviewId);
    if (!success) {
        const error = new Error('Failed to delete review');
        error.status = 500;
        throw error;
    }

    return true;
};

