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

const app        = express();
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
app.use('/places',    reviewRoutes);
app.use('/places',    mediaRoutes);   // mediaRoute מגדיר '/:placeId/media' בפנים + mergeParams:true

app.use('/itinerary', itineraryRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

// אתחול Socket.io
initSocket(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
