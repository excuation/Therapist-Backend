// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();  // Use dotenv for environment variables
const cookieParser = require('cookie-parser');
const app = express();

const cors = require('cors');

// Add your new frontend deploy URL to allowed origins
const allowedOrigins = [
  'http://localhost:5173', 
  'https://therapist-frontendcopy2.onrender.com'  // Add this new frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,  // Include this if you send cookies or authorization headers
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
// MongoDB Connection (use environment variables for security)
const dbURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes



const authRoutes = require('./routes/auth'); // Ensure this path is correct

app.use('/api', authRoutes); // All routes prefixed with '/api'
const searchRoutes = require('./routes/search'); // Ensure this path is correct
app.use('/api', searchRoutes); // Add this line to use the search routes
// server.js (continued)
const appointmentRoutes = require('./routes/appointments');

app.use('/api/appointments', appointmentRoutes); // Add this line to use the appointments routes
// Catch-all for undefined routes (404 handler)
const therapistRoutes = require('./routes/therapists');
app.use('/api', therapistRoutes);  // Ensure the route is registered
const historyRoutes = require('./routes/history'); // Adjust the path as necessary
app.use('/api/history', historyRoutes); // Set the prefix for the history routes
app.use('/api/users', authRoutes); 
app.use('/api', require('./routes/ticket'));
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
  });
app.use((req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
