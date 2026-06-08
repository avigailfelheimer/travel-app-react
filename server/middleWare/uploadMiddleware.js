import multer from 'multer';
import path from 'path';
import { INVALID_MEDIA_TYPE, MEDIA_UPLOAD_FAILED } from '../const/errorConst.js';

// ===== הגדרת אחסון =====
// כרגע: שמירה לדיסק מקומי תחת /uploads
// להחלפה ל-S3 / Cloudinary — מחליפים רק את storage הזה, שאר הקוד נשאר זהה

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    }
});

// ===== מיפוי סוג MIME לסוג מדיה שלנו =====
const MIME_TO_MEDIA_TYPE = {
    'image/jpeg':  'image',
    'image/png':   'image',
    'image/gif':   'image',
    'image/webp':  'image',
    'video/mp4':   'video',
    'video/mpeg':  'video',
    'video/webm':  'video',
    'audio/mpeg':  'audio',
    'audio/mp3':   'audio',
    'audio/wav':   'audio',
    'audio/ogg':   'audio',
};

const fileFilter = (req, file, cb) => {
    if (!MIME_TO_MEDIA_TYPE[file.mimetype]) {
        const error = new Error(INVALID_MEDIA_TYPE.message);
        error.status = INVALID_MEDIA_TYPE.status;
        return cb(error, false);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024  // 50MB מקסימום
    }
});

// ===== בניית ה-URL לאחר העלאה =====
// generic — מחזיר URL יחסי. לחיבור ל-S3/Cloudinary: מחליפים רק את הפונקציה הזו
export const buildMediaUrl = (req, filename) => {
    return `${req.protocol}://${req.get('host')}/uploads/${filename}`;
};

// ===== resolve media_type לפי MIME =====
export const resolveMediaType = (mimetype) => {
    return MIME_TO_MEDIA_TYPE[mimetype] || null;
};

// ===== Middleware לטיפול בשגיאות multer =====
export const handleUploadError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size exceeds the 50MB limit' });
        }
        return res.status(400).json({ error: err.message });
    }
    if (err?.status) {
        return res.status(err.status).json({ error: err.message });
    }
    res.status(MEDIA_UPLOAD_FAILED.status).json({ error: MEDIA_UPLOAD_FAILED.message });
};

export default upload;
