import express from 'express';
import {
    postReview,
    getReviews,
    putReview,
    deleteReview
} from '../controller/ReviewController.js';

import { authenticateToken, authorizeOwnership } from '../middleWare/authMiddleware.js';
import { getReviewById } from '../models/ReviewModel.js';

const router = express.Router({ mergeParams: true }); 

router.get('/', getReviews);

router.post('/', authenticateToken, postReview);

router.put('/:reviewId',
    authenticateToken,
    authorizeOwnership({
        getById: getReviewById,
        paramName: 'reviewId',
        ownerField: 'user_id'
    }),
    putReview
);

router.delete('/:reviewId',
    authenticateToken,
    authorizeOwnership({
        getById: getReviewById,
        paramName: 'reviewId',
        ownerField: 'user_id'
    }),
    deleteReview
);

export default router;