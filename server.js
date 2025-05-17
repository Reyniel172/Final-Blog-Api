const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit'); // ✅ Import rate limiter
require('dotenv').config();

const app = express();

// Trust proxy to get real IP 
app.set('trust proxy', 1);

// Rate limiter
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 100, 
  message: '⚠️ Too many requests. Please wait 2 minutes before trying again.',
  standardHeaders: true, 
  legacyHeaders: false, 
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(limiter); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');   

app.use('/auth', authRoutes); 
app.use('/posts', postRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
