// C:\Users\Rupesh Yadav\Desktop\server\routes\auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For secure password hashing
const mongoose = require('mongoose'); // For Mongoose schema and model

// --- User Mongoose Model Definition ---
// This schema defines the structure of documents in your 'users' collection
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'], // Added custom error message
    unique: true, // Ensures no two users can have the same email
    lowercase: true, // Stores email in lowercase
    trim: true // Removes leading/trailing whitespace
  },
  password: {
    type: String,
    required: [true, 'Password is required.'] // Added custom error message
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the creation timestamp
  }
});

// Create the 'User' model from the schema.
// Mongoose will automatically create a collection named 'users' (lowercase, plural)
// if it doesn't already exist when the first document is saved.
const User = mongoose.model('User', UserSchema);
// --------------------------------------


// --- Signup Route (POST /api/signup) ---
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    console.warn('Signup attempt: Missing email or password.');
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Signup attempt: Email ${email} already registered.`);
      return res.status(409).json({ message: 'User with this email already exists.' }); // 409 Conflict
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10); // Generate a salt (random string)
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    // Create a new user instance based on the User model
    const newUser = new User({
      email,
      password: hashedPassword
    });

    // Save the new user document to the MongoDB database
    await newUser.save();
    console.log(`User ${newUser.email} registered successfully and saved to DB.`);
    res.status(201).json({ message: 'User registered successfully!' }); // 201 Created

  } catch (err) {
    // Log detailed error on the server side
    console.error('Server Signup Error:', err);
    // Send a generic error message to the client for security
    res.status(500).json({ message: 'Server error during signup. Please try again later.' });
  }
});
// -------------------------------------


// --- Login Route (POST /api/login) ---
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    console.warn('Login attempt: Missing email or password.');
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`Login attempt for ${email}: User not found.`);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn(`Login attempt for ${email}: Password mismatch.`);
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // If credentials are valid, send a success response
    // In a real application, you would typically generate and send a JSON Web Token (JWT) here
    // for secure, stateless session management.
    console.log(`User ${email} logged in successfully.`);
    res.json({ message: 'Logged in successfully!', user: { id: user._id, email: user.email } });

  } catch (err) {
    console.error('Server Login Error:', err);
    res.status(500).json({ message: 'Server error during login. Please try again later.' });
  }
});
// -----------------------------------


// --- Test Route (GET /api/test) ---
router.get('/test', (req, res) => {
  res.send('Auth route is working!');
});
// ----------------------------------

module.exports = router; // Export the router for use in app.js