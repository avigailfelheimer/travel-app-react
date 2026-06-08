import express from 'express';
import { postMedia, fetchMedia, deleteMediaItem } from '../controller/MediaController.js';
import { authenticateToken } from '../middleWare/authMiddleware.js';
import upload, { handleUploadError } from '../middleWare/uploadMiddleware.js';

const router = express.Router({ mergeParams: true });

// העלאת מדיה למקום
router.post(
    '/:placeId/media',
    authenticateToken,
    upload.single('file'),
    handleUploadError,
    postMedia
);

// שליפת מדיה של מקום — ציבורי
router.get('/:placeId/media', fetchMedia);

// מחיקת מדיה
router.delete('/:placeId/media/:mediaId', authenticateToken, deleteMediaItem);

export default router;
