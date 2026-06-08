import jwt from 'jsonwebtoken';
import { getPlaceById } from '../models/PlaceModel.js';
import { getReviewById } from '../models/ReviewModel.js';
import {
    NO_TOKEN,
    TOKEN_EXPIRED,
    INVALID_TOKEN,
    ACCESS_DENIED,
    INSUFFICIENT_PERMISSIONS,
    INTERNAL_SERVER_ERROR
} from '../const/errorConst.js';

const SECRET = process.env.JWT_SECRET;

const ROLE_HIERARCHY = {
    'regular': 1,
    'business': 2,
    'admin': 3
};

export const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) return res.status(NO_TOKEN.status).json({ error: NO_TOKEN.message });

        req.user = jwt.verify(token, SECRET);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError')
            return res.status(TOKEN_EXPIRED.status).json({ error: TOKEN_EXPIRED.message });
        if (err.name === 'JsonWebTokenError')
            return res.status(INVALID_TOKEN.status).json({ error: INVALID_TOKEN.message });

        res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
    }
};

export const requireRole = (role) => (req, res, next) => {
    try {
        if (!req.user)
            return res.status(ACCESS_DENIED.status).json({ error: ACCESS_DENIED.message });

        const requiredLevel = ROLE_HIERARCHY[role];
        const userLevel = ROLE_HIERARCHY[req.user.role];

        if (!userLevel || userLevel < requiredLevel)
            return res.status(INSUFFICIENT_PERMISSIONS.status).json({ error: INSUFFICIENT_PERMISSIONS.message });

        next();
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
    }
};

/**
 * בדיקת הרשאות לערוך/למחוק place
 * שולפים את created_by מה-DB — לא סומכים על ה-body
 */
export const authorizePlaceModification = async (req, res, next) => {
    try {
        const placeId = req.params.id;
        if (!placeId) {
            return res.status(400).json({ error: 'Place ID is required' });
        }

        const place = await getPlaceById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        const isOwner = req.user.id === place.created_by;
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Only the place creator or an admin can modify this place' });
        }

        next();
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
    }
};

/**
 * בדיקת הרשאות לערוך/למחוק review
 * שולפים את user_id מה-DB — לא סומכים על ה-body
 */
export const authorizeReviewModification = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        if (!reviewId) {
            return res.status(400).json({ error: 'Review ID is required' });
        }

        const review = await getReviewById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        const isOwner = req.user.id === review.user_id;
        const isAdmin = req.user.role === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: 'Only the review creator or an admin can modify this review' });
        }

        next();
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
    }
};
