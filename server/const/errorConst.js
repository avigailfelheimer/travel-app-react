// ===== Auth Service Errors =====

export const USER_NOT_FOUND = {
    message: 'User not found',
    status: 404
};

export const INCORRECT_PASSWORD = {
    message: 'Incorrect password',
    status: 401
};

export const EMAIL_ALREADY_IN_USE = {
    message: 'Email already in use',
    status: 409
};

export const DB_NO_PASSWORD_RECORD = {
    message: 'Internal server error',
    status: 500
};

// ===== Auth Middleware Errors =====

export const NO_TOKEN = {
    message: 'No token provided',
    status: 401
};

export const TOKEN_EXPIRED = {
    message: 'Token expired',
    status: 401
};

export const INVALID_TOKEN = {
    message: 'Invalid token',
    status: 401
};

export const ACCESS_DENIED = {
    message: 'Access denied',
    status: 403
};

export const INSUFFICIENT_PERMISSIONS = {
    message: 'Insufficient permissions',
    status: 403
};

// ===== Place Service Errors =====

export const PLACE_NOT_FOUND = {
    message: 'Place not found',
    status: 404
};

export const UNAUTHORIZED_PLACE_MODIFICATION = {
    message: 'Only the place creator or an admin can modify this place',
    status: 403
};

// ===== Review Service Errors =====

export const REVIEW_NOT_FOUND = {
    message: 'Review not found',
    status: 404
};

export const INVALID_RATING = {
    message: 'Rating must be between 1 and 5',
    status: 400
};

export const UNAUTHORIZED_REVIEW_MODIFICATION = {
    message: 'Only the review creator or an admin can modify this review',
    status: 403
};

export const RATING_REQUIRED = {
    message: 'Rating is required',
    status: 400
};

// ===== Itinerary Service Errors =====

export const ITINERARY_ENTRY_NOT_FOUND = {
    message: 'Itinerary entry not found',
    status: 404
};

export const ITINERARY_PLACE_ALREADY_EXISTS = {
    message: 'Place is already in your itinerary',
    status: 409
};

export const UNAUTHORIZED_ITINERARY_MODIFICATION = {
    message: 'Only the itinerary owner can modify it',
    status: 403
};

// ===== Media Service Errors =====

export const MEDIA_NOT_FOUND = {
    message: 'Media not found',
    status: 404
};

export const INVALID_MEDIA_TYPE = {
    message: 'Invalid media type. Allowed: image, video, audio',
    status: 400
};

export const MEDIA_UPLOAD_FAILED = {
    message: 'File upload failed',
    status: 500
};

export const UNAUTHORIZED_MEDIA_DELETION = {
    message: 'Only the media uploader or an admin can delete this media',
    status: 403
};

// ===== General Errors =====

export const INTERNAL_SERVER_ERROR = {
    message: 'Internal server error',
    status: 500
};
