import { saveMedia, getPlaceMedia, removeMedia } from '../services/MediaService.js';
import { buildMediaUrl, resolveMediaType } from '../middleWare/uploadMiddleware.js';

/**
 * POST /places/:placeId/media
 * העלאת קובץ מדיה למקום — multer כבר שמר את הקובץ לפני הכניסה לכאן
 */
export const postMedia = async (req, res) => {
    try {
        const { placeId } = req.params;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const mediaType = resolveMediaType(req.file.mimetype);
        const mediaUrl  = buildMediaUrl(req, req.file.filename);

        const media = await saveMedia(Number(placeId), req.user.id, mediaType, mediaUrl);
        res.status(201).json(media);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * GET /places/:placeId/media
 * שליפת כל המדיה של מקום — ציבורי
 */
export const fetchMedia = async (req, res) => {
    try {
        const { placeId } = req.params;
        const media = await getPlaceMedia(Number(placeId));
        res.status(200).json(media);
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

/**
 * DELETE /places/:placeId/media/:mediaId
 * מחיקת קובץ מדיה — דורש אימות + בדיקת בעלות (נעשית בסרוויס)
 */
export const deleteMediaItem = async (req, res) => {
    try {
        const { mediaId } = req.params;

        await removeMedia(Number(mediaId), req.user);
        res.status(200).json({ success: true, message: 'Media deleted successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};
