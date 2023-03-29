const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// load environment variables in process.env object
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// express app
const app = express();

const whitelist = ['http://127.0.0.1:5173', 'http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// middleware for parsing json data from request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// global middleware that writes every request to log file
app.use((req, _, next) => {
  // write to file in current working directory
  const fileName = path.join(__dirname, 'log.csv');
  const date = new Date();
  const log = `${crypto.randomUUID()}, ${req.method}, ${req.url}, ${
    req.origin
  }, ${date.toLocaleDateString()}, ${date.toLocaleTimeString()}\n`;
  fs.appendFile(fileName, log, (err) => {
    if (err) console.error(err);
  });
  next();
});

// middleware for cross origin requests
app.use(cors(corsOptions));

// routes
app.use('/api/workouts', require('./routes/WorkoutRoutes'));
app.use('/api/users', require('./routes/UserRoutes'));

// catch all route
app.get('*', (req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected!');

    // listen for requests
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error(err));
