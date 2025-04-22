import express from 'express';
import {
  readJsonFile,
  writeJsonFile,
  hashPassword,
  comparePasswords,
  generateToken,
  successResponse,
  errorResponse,
  validateEmail,
  validatePassword
} from '../utils/helpers.js';
import config from '../config/config.js';

const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json(errorResponse('All fields are required', 400));
    }

    if (!validateEmail(email)) {
      return res.status(400).json(errorResponse('Invalid email format', 400));
    }

    if (!validatePassword(password)) {
      return res.status(400).json(errorResponse('Password must be at least 6 characters', 400));
    }

    // Read existing users
    const data = await readJsonFile(config.paths.users) || { users: [] };

    // Check if user already exists
    if (data.users.some(user => user.email === email)) {
      return res.status(400).json(errorResponse('User already exists', 400));
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = {
      id: data.users.length + 1,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    // Add user to array
    data.users.push(newUser);

    // Save to file
    await writeJsonFile(config.paths.users, data);

    // Generate JWT token
    const token = generateToken(newUser.id, email);

    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(successResponse({
      token,
      user: userWithoutPassword
    }, 'User created successfully'));

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json(errorResponse('Error creating user'));
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Read users file
    const data = await readJsonFile(config.paths.users);
    if (!data) {
      return res.status(401).json(errorResponse('Invalid credentials', 401));
    }

    // Find user
    const user = data.users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json(errorResponse('Invalid credentials', 401));
    }

    // Check password
    const isValidPassword = await comparePasswords(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json(errorResponse('Invalid credentials', 401));
    }

    // Generate token
    const token = generateToken(user.id, email);

    // Return success without password
    const { password: _, ...userWithoutPassword } = user;
    res.json(successResponse({
      token,
      user: userWithoutPassword
    }, 'Login successful'));

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json(errorResponse('Error during login'));
  }
});

export default router; 