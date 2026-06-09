import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
dotenv.config();

import authRoutes      from './routes/authRoutes.js';
import placeRoutes     from './routes/placeRoute.js';
import reviewRoutes    from './routes/reviewRoute.js';
import itineraryRoutes from './routes/itineraryRoute.js';
import mediaRoutes     from './routes/mediaRoute.js';
import { initSocket }  from './services/socketManager.js';
import { ROUTE_NOT_FOUND, INTERNAL_SERVER_ERROR } from './const/errorConst.js';

const app = express();
const httpServer = createServer(app);

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000'
}));
 app.get('/', (req, res) => res.redirect('/places'));
 
app.use(express.json());

// הגשת קבצי המדיה שהועלו
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/auth',      authRoutes);
app.use('/places',    placeRoutes);
app.use('/places/:placeId/reviews', reviewRoutes);
app.use('/places/:placeId/media', mediaRoutes);   // mediaRoute מגדיר '/:placeId/media' בפנים + mergeParams:true

app.use('/itinerary', itineraryRoutes);

// 404 handler
app.use((req, res) => {
    res.status(ROUTE_NOT_FOUND.status).json({ error: ROUTE_NOT_FOUND.message });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(INTERNAL_SERVER_ERROR.status).json({ error: INTERNAL_SERVER_ERROR.message });
});

// אתחול Socket.io
initSocket(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
