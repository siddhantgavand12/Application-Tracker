const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
    {
        origin: ["https://application-tracker-seven.vercel.app"],
        methods:["POST","GET","PATCH"],
credentials: true
    }
));
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Application Tracker API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const applicationRoutes = require('./routes/applications');

// Use the application routes
app.use('/applications', applicationRoutes);
