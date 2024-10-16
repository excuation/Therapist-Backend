const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// CORS setup
const corsOptions = {
  
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection (Direct Connection String without .env)
const dbURI = 'mongodb+srv://anuragsharma07575:Y46ikzhrqNdASJWI@cluster0.y1ghd.mongodb.net/yourdbname?retryWrites=true&w=majority';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes setup
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const searchRoutes = require('./routes/search');
app.use('/api', searchRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/api/appointments', appointmentRoutes);

const therapistRoutes = require('./routes/therapists');
app.use('/api', therapistRoutes);

const historyRoutes = require('./routes/history');
app.use('/api/history', historyRoutes);



// 404 Catch-All
app.use((req, res) => {
    res.status(404).json({ msg: '404 Not Found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
