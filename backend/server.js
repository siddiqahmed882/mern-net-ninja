const express = require('express');
const mongoose = require('mongoose');

// load environment variables in process.env object
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// express app
const app = express();

// middleware for parsing json data from request
app.use(express.json());

// global middleware that writes to file
app.use((req, res, next) => {
  console.log(`Request: ${req.method} | Path: ${req.url}`);
  next();
});

// routes
app.use('/api/workouts', require('./routes/WorkoutRoutes'));

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
