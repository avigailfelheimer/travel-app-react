import express from 'express';
import {
    fetchItinerary,
    postItineraryPlace,
    deleteItineraryPlace,
    putItineraryOrder
} from '../controller/ItineraryController.js';
import { authenticateToken } from '../middleWare/authMiddleware.js';

const router = express.Router();

// כל נתיבי המסלול דורשים אימות — המסלול הוא אזור אישי
router.get('/', authenticateToken, fetchItinerary);
router.post('/', authenticateToken, postItineraryPlace);
// IMPORTANT: /reorder חייב להיות לפני /:favoriteId — אחרת Express יתפוס "reorder" כ-favoriteId
router.put('/reorder', authenticateToken, putItineraryOrder);
router.delete('/:favoriteId', authenticateToken, deleteItineraryPlace);

export default router;
