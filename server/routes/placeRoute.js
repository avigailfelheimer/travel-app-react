import express from 'express';
import { postPlace, fetchPlaces, fetchPlaceById, putPlace, deletePlace } from '../controller/PlaceController.js';
import { authenticateToken, requireRole, authorizePlaceModification } from '../middleWare/authMiddleware.js';

const router = express.Router();

// שליפת כל הפלייסים — ציבורי (חייב להיות לפני /:id)
router.get('/', fetchPlaces);

// שליפת פלייס בודד — ציבורי
router.get('/:id', fetchPlaceById);

// הוספת place — מאומת, role: regular ומעלה
router.post('/', authenticateToken, requireRole('regular'), postPlace);

// עדכון place — מאומת + בדיקת הרשאות
router.put('/:id', authenticateToken, authorizePlaceModification, putPlace);

// מחיקת place — מאומת + בדיקת הרשאות
router.delete('/:id', authenticateToken, authorizePlaceModification, deletePlace);

export default router;
