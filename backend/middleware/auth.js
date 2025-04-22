import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { errorResponse } from '../utils/helpers.js';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json(errorResponse('No token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json(errorResponse('Invalid token', 403));
  }
}; 