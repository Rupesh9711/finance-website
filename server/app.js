
// C:\Users\Rupesh Yadav\Desktop\server\app.js



// --- MongoDB Connection Configuration ---
// IMPORTANT: Replace this with your actual MongoDB URI.
// Example for local: 'mongodb://localhost:27017/finsightdb'
// Example for Atlas: 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@your_cluster_name.mongodb.net/yourDatabaseName?retryWrites=true&w=majority'
// Make sure 'yourDatabaseName' matches the name you want to see in Atlas (e.g., 'finsightdb')
// const MONGODB_URI = 'mongodb+srv://ry5393430:Rajni%40123@cluster0.gewjiji.mongodb.net/financialLogin?retryWrites=true&w=majority&appName=Cluster0';// <--- UPDATE THIS LINE

// C:\Users\Rupesh Yadav\Desktop\server\app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

// --- MongoDB Connection Configuration ---
const MONGODB_URI = 'mongodb+srv://ry5393430:Rajni%40123@cluster0.gewjiji.mongodb.net/financialLogin?retryWrites=true&w=majority&appName=Cluster0'; // Ensure this is your correct URI

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // <--- CHANGE THIS LINE TO MATCH YOUR FRONTEND'S PORT
    credentials: true
}));

// Route Middlewares
app.use('/api', authRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Finsight Backend Server is operational!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});