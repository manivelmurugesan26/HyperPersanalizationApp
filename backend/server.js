import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import config from './config/config.js';
import authRoutes from './routes/authRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import { errorResponse } from './utils/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors(config.server.cors));
app.use(express.json());

// Serve static files from the public directory
app.use('/Image', express.static(join(__dirname, '../src/Image')));

// Routes
app.use(config.routes.auth, authRoutes);
app.use(config.routes.images, imageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  const error = errorResponse(
    'Internal server error',
    500
  );
  res.status(error.statusCode).json(error);
});

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
}); 