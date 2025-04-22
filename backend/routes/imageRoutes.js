import express from 'express';
import { readJsonFile } from '../utils/helpers.js';
import config from '../config/config.js';
import { authenticateToken } from '../middleware/auth.js';
import { successResponse, errorResponse } from '../utils/helpers.js';

const router = express.Router();

// Get all images
router.get('/images', async (req, res) => {
  try {
    const data = await readJsonFile(config.paths.images);
    if (!data) {
      return res.status(404).json(errorResponse('No images found', 404));
    }
    res.json(successResponse(data));
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).json(errorResponse('Error retrieving images'));
  }
});

// Get images by category
router.get('/images/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const data = await readJsonFile(config.paths.images);
    
    if (!data || !data.categories[category]) {
      return res.status(404).json(errorResponse('Category not found', 404));
    }
    
    res.json(successResponse(data.categories[category]));
  } catch (error) {
    console.error('Error getting category images:', error);
    res.status(500).json(errorResponse('Error retrieving category images'));
  }
});

// Get image by ID
router.get('/images/:category/:id', async (req, res) => {
  try {
    const { category, id } = req.params;
    const data = await readJsonFile(config.paths.images);
    
    if (!data || !data.categories[category]) {
      return res.status(404).json(errorResponse('Category not found', 404));
    }
    
    const image = data.categories[category].find(img => img.id === id);
    if (!image) {
      return res.status(404).json(errorResponse('Image not found', 404));
    }
    
    res.json(successResponse(image));
  } catch (error) {
    console.error('Error getting image:', error);
    res.status(500).json(errorResponse('Error retrieving image'));
  }
});

// Search images
router.get('/images/search', async (req, res) => {
  try {
    const { query } = req.query;
    const data = await readJsonFile(config.paths.images);
    
    if (!data) {
      return res.status(404).json(errorResponse('No images found', 404));
    }
    
    const results = [];
    Object.entries(data.categories).forEach(([category, images]) => {
      images.forEach(image => {
        if (
          image.name.toLowerCase().includes(query.toLowerCase()) ||
          image.id.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            category,
            ...image
          });
        }
      });
    });
    
    res.json(successResponse(results));
  } catch (error) {
    console.error('Error searching images:', error);
    res.status(500).json(errorResponse('Error searching images'));
  }
});

export default router; 