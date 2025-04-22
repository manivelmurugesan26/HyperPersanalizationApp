import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  // Server Configuration
  server: {
    port: process.env.PORT || 5000,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }
  },

  // File Paths
  paths: {
    users: join(__dirname, '../data/users.json'),
    images: join(__dirname, '../data/images.json')
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },

  // API Routes
  routes: {
    auth: '/api/auth',
    images: '/api/images'
  }
}; 